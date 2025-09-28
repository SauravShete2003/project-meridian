import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    agentId : { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
    items : [
        {
            firstName: String,
            phone : String,
            notes : String,
        }
    ]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;