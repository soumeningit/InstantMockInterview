import { dbConnect } from "@/dbConfing/dbConfig";
import OTP from "@/models/otpModel";
import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";

dbConnect();

export async function POST(req, res) {
    console.log("INSIDE OTP SENDER")
    try {
        const requestBody = await req.json();
        console.log("requestBody : " + requestBody);
        console.log("requestBody : " + JSON.stringify(requestBody));
        const { name, email } = requestBody;
        console.log("name : " + name + " email : " + email);
        if (!name || !email) {
            return NextResponse.json({
                success: false,
                message: "Name email can't be empty!"
            })
        }
        const otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("generated OTP : " + otp);
        if (!otp) {
            return NextResponse.json({
                success: "false",
                message: "Creation of otp failed"
            }, { status: 500 })
        };

        const otpPayload = {
            email,
            otp
        }
        console.log("otpPayload : " + otpPayload);

        const otpResponse = await OTP.create(otpPayload);
        const data = {
            name: name,
            email: email,
            password: requestBody?.password
        }
        console.log("otpResponse : " + otpResponse);
        return NextResponse.json({
            success: true,
            message: "OTP cretaed successfully",
            // data
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "OTP Generation failed!"
        }, { status: 500 })
    }
}