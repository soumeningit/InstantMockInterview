import { NextResponse } from "next/server";
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "@/models/userModel";
import mailSender from "@/helpers/mailSender";
import { paymentSuccessEmail } from "@/mailtemplates/paymentSuccessEmail";
import Payment from "@/models/paymentModel";
dotenv.config();

const sha256 = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

export async function GET(req, { params }) {
    try {
        const { id } = params;
        console.log("id : " + id);

        console.log("req : " + JSON.stringify(req));
        const sha256Data = sha256(`/pg/v1/status/${process.env.MERCHANT_ID}/${id}${process.env.PHONE_PAY_SALT_KEY}`)
        const encodedData = sha256Data + "###" + process.env.PHONE_PE_SALT_INDEX
        console.log("encodedData : " + encodedData);
        console.log("PHONE_PAY_STATUS_URL : " + process.env.PHONE_PAY_STATUS_URL);

        const options = {
            method: "GET",
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.MERCHANT_ID}/${id}`,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                "X-VERIFY": encodedData,
                "X-MERCHANT-ID": id,
            },
        };

        // CHECK PAYMENT STATUS
        const response = await axios.request(options);
        console.log("response.data : " + response.data);
        console.log("response.data : " + JSON.stringify(response.data));

        const user = await User.findOne({ merchantTransactionId: id });
        if (!user) {
            return new NextResponse.json({
                success: false,
                message: "User not found",
            }), { status: 404 };
        }

        user.paymentStaus = response.data.state;
        user.payment.push({
            merchantTransactionId: response.data.merchantTransactionId,
            transactionId: response.data.transactionId
        })
        user.member = true
        const updatedUser = await user.save();
        console.log("updatedUser : " + updatedUser);

        console.log("amount : " + response.data.data.amount);
        const finalAmount = response.data.data.amount / 100;
        console.log("finalAmount : " + finalAmount);
        const paymentData = new Payment({
            userId: user._id,
            amount: finalAmount,
            paymentMethod: response.data.data.paymentInstrument,
            transactionId: response.data.data.transactionId,
            merchantId: response.data.data.merchantId,
            merchantTransactionId: response.data.data.merchantTransactionId,
            state: response.data.data.state,
            responseCode: response.data.data.responseCode,
            time: new Date()
        });

        console.log("paymentData : " + paymentData);

        const paymentResponse = await paymentData.save();
        console.log("paymentResponse : " + paymentResponse);
        if (!paymentResponse) {
            return NextResponse.json({
                success: false,
                message: "Payment store in db failed",
            }, { status: 500 });
        }
        const date = new Date().toDateString() || "";
        // transactionId, amount, date, supportEmail
        const suportEmail = "happycoding@example.com"

        // send mail to user after successfull payment
        const email = user.email;
        const name = user.name;
        const transactionId = response.data.data.transactionId;

        const mailResponse = await mailSender(email, "Successfull Payment", paymentSuccessEmail({
            userName: name,
            transactionId: transactionId,
            amount: finalAmount,
            date: date,
            supportEmail: suportEmail
        }));
        console.log("mailResponse : " + mailResponse);

        return NextResponse.redirect(`https://instant-mock-interview.vercel.app/success/${transactionId}`, {
            status: 302,
        });

    } catch (error) {
        console.log(error);
        console.log("error.response.data : " + JSON.stringify(error.response.data));
        return NextResponse.json({
            success: false,
            message: "Payment Failed"
        }, { status: 500 })
    }
}