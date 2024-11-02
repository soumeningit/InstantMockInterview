import { dbConnect } from "@/dbConfing/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "@/models/userModel";
import AdditionalDetails from "@/models/additionalDetails";
import dotenv from "dotenv";
dotenv.config();

dbConnect();

export async function POST(NextRequest) {
    try {
        const reqBody = await NextRequest.json();
        // console.log("reqBody : " + JSON.stringify(reqBody));
        const { email, password } = reqBody;
        // console.log("email : " + email, " password : " + password);
        // validate data
        if (email.length === 0 || password.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Email and password are required"
            }, { status: 400 });
        }
        // find user is exsist or not
        const user = await User.findOne(
            { email: email },
            {
                name: 1, email: 1, password: 1, image: 1
            }
        ).populate({
            path: 'additionalDetails',
        });
        console.log("user : " + user);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log("isMatch : " + isMatch);
        if (!isMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            }, { status: 401 });
        }

        // token data
        const payload = {
            id: user._id,
            email: user.email,
            name: user.name
        }
        // create token
        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d"
        });

        user.password = null;
        user.email = null;
        user.additionalDetails = null;
        // user.isVerified = null;
        // user.interViewIds = null;
        // user.member = null;
        // user.payment = null;


        // create response
        const response = await NextResponse.json({
            success: true,
            message: "Login Success",
            token: token,
            user: user
        })
        // set it to cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        // return response
        return response;

    } catch (error) {
        console.log(error);
        NextResponse.json({
            success: false,
            message: "Log in failed!"
        }, { status: 500 })
    }
}
