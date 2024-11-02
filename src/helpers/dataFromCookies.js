import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function dataFromCookies(request) {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decodedToken;

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid token",
            success: false
        }, { status: 401 })
    }
}