import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    queandans: [{
        question: { type: String, required: true },
        answer: { type: String, required: true }
    }],
    role: {
        type: String,
    },
    experience: {
        type: Number,
    },
    techStack: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    answer: [{
        question: { type: String, required: true },
        originalAnswer: { type: String, required: true },
        userAnswer: { type: String, required: true },
    }],
    analysedAnswer: {
        overallRating: { type: Number, default: 0 },
        message: { type: String },
        suggestion: { type: String },
        answers: [{ type: Object }]
    }
});

const Interview = mongoose.models.Interview || mongoose.model("Interview", interviewSchema);

export default Interview;