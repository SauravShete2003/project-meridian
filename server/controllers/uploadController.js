import Assignment from "../models/Assignment.js";
import Agent from "../models/Agent.js";
import { distributeItems } from "../utils/distribute.js";
import multer from "multer";
import csv from "csv-parser";
import xlsx from "xlsx";
import fs from "fs";
import path from "path";

const upload = multer({
  dest: "server/uploads/",
  fileFilter: (req, file, cb) => {
    const allowedTypes = /csv|xlsx|xls/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only .csv, .xlsx, and .xls files are allowed"));
    }
  }
});
export const uploadMiddleware = upload.single("file");

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const agents = await Agent.find();
    if (agents.length !== 5) {
      fs.unlinkSync(file.path); // Clean up file
      return res.status(400).json({ message: "Exactly 5 agents are required for distribution" });
    }

    let items = [];

    if (file.mimetype.includes("csv")) {
      fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", data => items.push(data))
        .on("end", async () => {
          fs.unlinkSync(file.path);
          console.log('Parsed CSV items length:', items.length);
          if (items.length > 0) {
            console.log('Sample item keys:', Object.keys(items[0]));
            console.log('Sample item:', items[0]);
          }
          const validationError = validateItems(items);
          if (validationError) {
            console.log('Validation error:', validationError);
            return res.status(400).json({ message: validationError });
          }
          await saveAssignments(items, agents, res);
        })
        .on("error", (err) => {
          console.error('CSV parsing error:', err);
          fs.unlinkSync(file.path);
          res.status(400).json({ message: "Error parsing CSV file" });
        });
    } else {
      // Handle xlsx or xls
      try {
        const wb = xlsx.readFile(file.path);
        const ws = wb.Sheets[wb.SheetNames[0]];
        items = xlsx.utils.sheet_to_json(ws);
        fs.unlinkSync(file.path);
        console.log('Parsed XLSX items length:', items.length);
        if (items.length > 0) {
          console.log('Sample item keys:', Object.keys(items[0]));
          console.log('Sample item:', items[0]);
        }
        const validationError = validateItems(items);
        if (validationError) {
          console.log('Validation error:', validationError);
          return res.status(400).json({ message: validationError });
        }
        await saveAssignments(items, agents, res);
      } catch (err) {
        console.error('XLSX parsing error:', err);
        fs.unlinkSync(file.path);
        res.status(400).json({ message: "Error parsing XLSX/XLS file" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error during upload" });
  }
};

const validateItems = (items) => {
  if (items.length === 0) {
    return "File is empty or has no valid data";
  }
  for (let item of items) {
    if (!item.FirstName || !item.Phone || !item.Notes) {
      return "File must contain columns: FirstName, Phone, Notes";
    }
  }
  return null;
};

const saveAssignments = async (items, agents, res) => {
  try {
    const dist = distributeItems(items, agents);

    let results = [];
    for (let agentId in dist) {
      const ass = await Assignment.create({ agentId, items: dist[agentId] });
      results.push(ass);
    }
    // Populate agent details (exclude password)
    const populatedResults = await Assignment.find({ _id: { $in: results.map(r => r._id) } })
      .populate('agentId', 'name email phone');
    res.json({ message: "File uploaded and distributed successfully", assignments: populatedResults });
  } catch (error) {
    res.status(500).json({ message: "Error saving assignments" });
  }
};
