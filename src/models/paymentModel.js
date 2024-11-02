// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     amount: {
//         type: Number,
//         required: true,
//     },
//     paymentMethod: {
//         type: Object,
//         required: true,
//     },
//     cardType: {
//         type: String,
//     },
//     transactionId: {
//         type: String,
//         required: true,
//     },
//     merchantId: {
//         type: String,
//         required: true,
//     },
//     merchantTransactionId: {
//         type: String,
//         required: true,
//     },
//     state: {
//         type: String,
//         required: true
//     },
//     responseCode: {
//         type: String,
//         required: true,
//     },
//     time: {
//         type: Date,
//         required: true,
//     }
// })

// const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

// export default Payment;


import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: Object,
        required: true,
    },
    cardType: {
        type: String,
    },
    transactionId: {
        type: String,
        required: true,
    },
    merchantId: {
        type: String,
        required: true,
    },
    merchantTransactionId: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    responseCode: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    }
});

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
