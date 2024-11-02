import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import mailSender from "@/helpers/mailSender"
import { passwordResetEmailTemplate } from "@/mailtemplates/passwordResetEmailTemplate";
import { dbConnect } from "@/dbConfing/dbConfig";
import dotenv from "dotenv";
dotenv.config();

dbConnect();

export async function POST(NextRequest) {
    try {
        console.log("INSIDE CREATE RESET PASSWORD TOKEN ....")
        const reqBody = await NextRequest.json();
        console.log("reqBody : " + JSON.stringify(reqBody));
        const { email } = reqBody;
        console.log("email : " + email);
        if (!email) {
            return NextResponse.json({
                success: false,
                message: "Email is required"
            }, { status: 400 });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }
        const key = crypto.scryptSync('email', 'salt', 16);
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        let encryptedToken = cipher.update('abc', 'utf8', 'hex');
        encryptedToken += cipher.final('hex');
        console.log(encryptedToken);

        const currentTime = Date.now()
        console.log("currentTime : " + currentTime);
        user.forgotPasswordToken = encryptedToken;
        user.forgotPasswordExpiry = currentTime + 5 * 60 * 1000;
        const updatedUser = await user.save();
        console.log("updatedUser : " + updatedUser);

        const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${encryptedToken}`;
        const resetURLResponse = await mailSender(email, "Forget Password", passwordResetEmailTemplate(resetUrl));
        console.log("resetURLResponse : " + resetURLResponse);
        const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;

        return NextResponse.json({
            success: true,
            message: "Check Your Email",
            redirectUrl: redirectUrl
        }, { status: 200 })
    } catch (error) {
        console.log("error : " + error);
        return NextResponse.json({
            success: false,
            message: "Error Occurred in reset password"
        }, { status: 500 })
    }
}
