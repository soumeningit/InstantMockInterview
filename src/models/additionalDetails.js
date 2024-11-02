import mongoose from "mongoose";

const AdditionalDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phoneNo: {
        type: String,
    },
    address: {
        type: String,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
    },
});
const AdditionalDetails = mongoose.models.AdditionalDetails || mongoose.model("AdditionalDetails", AdditionalDetailsSchema);
export default AdditionalDetails;