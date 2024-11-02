import { dbConnect } from "@/dbConfing/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

dbConnect();

export async function POST(NextRequest) {
    try {
        console.log("RESET PASSWORD");
        const reqBody = await NextRequest.json();
        console.log("reqBody : " + JSON.stringify(reqBody));
        const { password, resetToken } = reqBody;
        if (!password || !resetToken) {
            return NextResponse.json({
                status: false,
                message: "Password and reset token are required"
            }, { status: 404 });
        }
        const user = await User.findOne({ forgotPasswordToken: resetToken });
        if (!user) {
            return NextResponse.json({
                status: false,
                message: "User not found!"
            }, { status: 404 });
        }
        console.log("user : " + user);
        const currentTime = Date.now();
        const expireTime = user.forgotPasswordExpiry; // 5 minutes
        if (currentTime > expireTime) {
            return NextResponse.json({
                status: false,
                message: "Token expired!"
            })
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        user.password = hashedPassword;
        const updatedUser = await user.save();
        console.log("updatedUser : " + updatedUser);
        return NextResponse.json({
            success: true,
            message: "Password reset successfully",
        }, { status: 200 })
    } catch (error) {
        console.log("Reset Password Error : " + error);
        return NextResponse.json({
            status: false,
            message: "Error resetting password"
        }, { status: 500 })
    }
}