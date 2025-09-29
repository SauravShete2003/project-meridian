import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const phoneRegex = /^\+\d{1,3}[\s\-]?\d{1,15}$/;

const agentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return phoneRegex.test(v);
            },
            message: 'Phone must include country code, e.g., +1 1234567890'
        }
    },
    role: { type: String, enum: ['admin', 'agent'], default: 'agent' },
    password: { type: String, required: true, minlength: 6 },

}, { timestamps: true });

// Hash password before saving
agentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to match password
agentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Agent", agentSchema);
