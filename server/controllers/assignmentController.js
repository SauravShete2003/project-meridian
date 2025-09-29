import Assignment from "../models/Assignment.js";
import Agent from "../models/Agent.js";

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate('agentId', 'name email phone');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
