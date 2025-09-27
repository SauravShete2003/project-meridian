import mongoose from "mongoose"

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['admin', 'agent'], default: 'agent' },
    password: { type: String, required: true },

}, { timestamps: true });

export default mongoose.model("Agent", agentSchema);