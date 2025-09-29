import Agent from '../models/Agent.js';

export const addAgent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent with this email already exists" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const agent = await Agent.create({ name, email, phone, password });
    res.status(201).json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      role: agent.role
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export const getAgents = async (req, res)=> {
  try {
    const agents = await Agent.find().select("-password");
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
