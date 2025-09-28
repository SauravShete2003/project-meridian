import User from "../models/User.js";
import jwt from "jsonwebtoken";

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const register = async (req, res) => {
  try {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({ email, password });

  res.status(201).json({
    _id: user._id,
    email: user.email,
    token: genToken(user._id),
  });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      token: genToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

export const seedAdmin = async (req, res) => {
  const exists = await User.findOne({ email: "admin@admin.com" });
  if (exists) return res.status(400).json({ message: "Admin already exists" });

  const user = await User.create({
    email: "admin@admin.com",
    password: "password",
  });
  res.json(user);
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
 
