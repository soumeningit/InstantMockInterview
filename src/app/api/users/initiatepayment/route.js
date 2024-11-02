import User from "@/models/userModel";
import { NextResponse } from "next/server";
import crypto from "crypto";
// import sha256 from "crypto"
import dotenv from "dotenv";
import axios from "axios";
import { dbConnect } from "@/dbConfing/dbConfig";
dotenv.config();

dbConnect();

const sha256 = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

export async function POST(NextRequest) {
    try {
        console.log("INSIDE PAYMENT SERVER SIDE....");
        const reqBody = await NextRequest.json();
        console.log("reqBody : " + reqBody);
        const { userId } = reqBody;
        const user = await User.findById({ _id: userId });
        const amnt = 100; // it should came from frontend i will update it later
        if (!user) {
            return new NextResponse.json({
                success: false,
                message: 'User not found'
            }, { status: 404 });
        }

        console.log("user : " + user);

        const email = user.email;
        console.log("email : " + email);

        const key = crypto.scryptSync('email', 'salt', 16);
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        let encryptedToken = cipher.update('abc', 'utf8', 'hex');
        encryptedToken += cipher.final('hex');
        console.log(encryptedToken);

        console.log("process.env.MERCHANT_ID " + process.env.MERCHANT_ID)
        const paymentPayload = {
            "merchantId": process.env.MERCHANT_ID,
            "merchantTransactionId": encryptedToken,
            "merchantUserId": user?._id,
            "amount": amnt * 100,
            "redirectUrl": process.env.BASE_URL + `/api/users/payment/${encryptedToken}`,
            "redirectMode": "REDIRECT",
            "callbackUrl": process.env.BASE_URL + `/api/users/payment/${encryptedToken}`,
            "mobileNumber": "9999999999",
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }
        const jsonPaymentPayload = JSON.stringify(paymentPayload);
        console.log("jsonPaymentPayload : " + jsonPaymentPayload);
        const base_64_encoded_payload = Buffer.from(jsonPaymentPayload).toString("base64");
        console.log("base_64_encoded_payload : " + base_64_encoded_payload);

        const fullSHA256EncodedData = base_64_encoded_payload + "/pg/v1/pay" + process.env.PHONE_PAY_SALT_KEY
        const sha256EncodedData = sha256(fullSHA256EncodedData);
        const checkSum = sha256EncodedData + "###" + process.env.PHONE_PE_SALT_INDEX
        console.log("checkSum : " + checkSum);

        console.log("process.env.PHONE_PAY_API_URL " + process.env.PHONE_PAY_API_URL)
        const response = await axios.post(
            process.env.PHONE_PAY_API_URL,
            {
                request: base_64_encoded_payload,
            },
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VERIFY": checkSum,
                },
            }
        );
        // console.log("response : " + response);
        // console.log("response : " + response.data);
        console.log("response : " + JSON.stringify(response.data));
        // console.log("response : " + JSON.stringify(response));

        // update user after successfull payment initiation
        user.merchantTransactionId = encryptedToken;
        user.paymentStaus = response.code;
        const updatedUserDetails = await user.save();
        console.log("updatedUserDetails : " + updatedUserDetails);

        const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;

        return NextResponse.json({
            success: true,
            message: "Payment Initiated",
            redirectUrl
        }, { status: 200 });

    } catch (error) {
        // console.log("Error in Payment Initiation : " + error);
        if (error.response) {
            // console.log("Error response:", error.response);
            console.log("Error Data:", error.response.data);
            console.log("Error Status:", error.response.status);
            console.log("Error Headers:", error.response.headers);
        } else {
            console.log("Error Message:", error.message);
        }
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 });
    }
}