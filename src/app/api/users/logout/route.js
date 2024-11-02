import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Log Out Successfully!",
            success: true
        })
        response.cookies.set("token", "", {
            httpOnly: true, expires: new Date(0)
        })
        return response;
    } catch (error) {
        console.log(error);
        NextResponse.json({
            success: false,
            message: "Error in log out"
        }, { status: 500 })
    }
}