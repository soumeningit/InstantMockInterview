import mailSender from "@/helpers/mailSender";
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60
    }
}, { timestamps: true });

const sendVerificationMail = async (email, otp) => {
    try {
        const mailSenderResponse = await mailSender(email, "OTP For Verification", otp);
        console.log("mailSenderResponse : " + mailSenderResponse);
    } catch (error) {
        console.log("Verification mail send failed")
        console.log(error);
    }
}

otpSchema.pre("save", async function (next) {

    console.log("New document saved to database");

    console.log("this.isNew : " + this?.isNew);
    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationMail(this.email, this.otp);
    }
    next();
})


const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);

export default OTP;

