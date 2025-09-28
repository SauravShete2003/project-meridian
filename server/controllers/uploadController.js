import Assignment from "../models/Assignment.js";
import Agent from "../models/Agent.js";
import { distributeItems } from "../utils/distribute.js";
import multer from "multer";
import csv from "csv-parser";
import xlsx from "xlsx";
import fs from "fs";

const upload = multer({ dest: "uploads/" });
export const uploadMiddleware = upload.single("file");

export const uploadFile = async (req, res) => {
  const file = req.file;
  const agents = await Agent.find();
  if (agents.length < 1) return res.status(400).json({ msg: "No agents found" });

  let items = [];

  if (file.mimetype.includes("csv")) {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", data => items.push(data))
      .on("end", async () => {
        fs.unlinkSync(file.path);
        await saveAssignments(items, agents, res);
      });
  } else {
    const wb = xlsx.readFile(file.path);
    const ws = wb.Sheets[wb.SheetNames[0]];
    items = xlsx.utils.sheet_to_json(ws);
    fs.unlinkSync(file.path);
    await saveAssignments(items, agents, res);
  }
};

const saveAssignments = async (items, agents, res) => {
  const dist = distributeItems(items, agents);

  let results = [];
  for (let agentId in dist) {
    const ass = await Assignment.create({ agentId, items: dist[agentId] });
    results.push(ass);
  }
  res.json(results);
};