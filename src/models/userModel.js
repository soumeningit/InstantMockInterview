import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a user name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date,
    },
    verifyPasswordToken: {
        type: String,
    },
    verifyPasswordExpiry: {
        type: Date,
    },
    interview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview',
    },
    interViewIds: [String],
    member: {
        type: Boolean,
        default: false
    },
    merchantTransactionId: {
        type: String
    },
    paymentStaus: {
        type: String,
    },
    payment: [{
        merchantTransactionId: String,
        transactionId: String
    }],
    image: {
        type: String,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdditionalDetails'
    }
}, { timestamps: true });

// Method to set a 5-minute expiration for forgotPasswordExpiry
userSchema.methods.setForgotPasswordExpiry = function () {
    this.forgotPasswordExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
};

// Method to set a 5-minute expiration for verifyPasswordExpiry
userSchema.methods.setVerifyPasswordExpiry = function () {
    this.verifyPasswordExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;