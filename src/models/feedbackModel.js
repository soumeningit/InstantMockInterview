import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    interview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    message: {
        type: String,
    }
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export default Feedback;