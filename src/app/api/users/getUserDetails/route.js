import { dbConnect } from "@/dbConfing/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

dbConnect();
export async function POST(req) {
    try {
        const reqBody = await req.json();
        console.log("reqBody : " + reqBody);
        const { userId } = reqBody;
        console.log("userId : " + userId);
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User id is required"
            }, { status: 400 })
        }
        const user = await User.findById({ _id: userId })
            .populate({
                path: 'additionalDetails',
            })
        console.log("user : " + user);
        user.password = null;
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }
        return NextResponse.json({
            success: true,
            message: "User found",
            user: user
        }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "User details not found error"
        }, { status: 500 })
    }
}