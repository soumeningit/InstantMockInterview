import { dbConnect } from "@/dbConfing/dbConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import dotenv from "dotenv";
import OTP from "@/models/otpModel";
dotenv.config();

export async function POST(NextRequest) {
    try {
        console.log("INSIDE SIGN UP....")
        const reqBody = await NextRequest.json();
        console.log("reqBody : " + reqBody);
        const { name, email, password, otp } = reqBody;
        if (!name || !email || !password || !otp) {
            return NextResponse.json({
                success: false,
                message: "Please fill all fields",
            })
        }
        const user = await User.findOne({ email: email });
        // console.log("User : " + user);
        if (user) {
            return NextResponse.json({
                success: false,
                message: "User already exists",
            })
        }
        // fetch most recent otp from db
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("In server Recent Otp Object : ", recentOtp[0].otp);
        console.log("In server Recent Otp  :Value ", recentOtp[0].otp);

        // check otp is matched or not with otp which is send from frontend
        if (recentOtp.length === 0) {
            return res.status(403).json({
                success: false,
                message: "Internal error! Please try after some time."
            })
        }

        console.log("email in db ", recentOtp.email, " email in req ", email, "otp in db ", recentOtp.otp, " otp coming from req ", otp)

        if (recentOtp[0].otp !== otp) {
            return res.status(403).json({
                success: false,
                message: "OTP mismatched, check and fill the correct otp!"
            })
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // console.log("hashedPassword : " + hashedPassword);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            isVerified: true
        });
        const updatedUser = await newUser.save();
        updatedUser.password = null;
        console.log("updatedUser : " + updatedUser);
        return NextResponse.json({
            success: true,
            message: "User created successfully",
            updatedUser
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Sign up failed! Internal error",
        })
    }
}


dbConnect();