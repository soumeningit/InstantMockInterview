import { dbConnect } from "@/dbConfing/dbConfig";
import { dataFromCookies } from "@/helpers/dataFromCookies";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(request) {
    try {
        console.log("request : " + JSON.stringify(request));
        const userFromCookie = await dataFromCookies(request);
        console.log("userFromCookie : " + JSON.stringify(userFromCookie));
        const userId = userFromCookie?.id;
        console.log("userId : " + userId);
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Cookies not found"
            }, { status: 401 });
        }
        const user = await User.findById({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user,
            message: "User get successfully",
            "token": userFromCookie
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error in get user details"
        }, { status: 500 });
    }
}