import Interview from "@/models/interviewModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const interviewId = reqBody.id;
        if (!interviewId) {
            return NextResponse.json({
                success: false,
                message: "Interview Id is required"
            }, { status: 400 })
        }

        const quesandans = await Interview.find({ _id: interviewId });
        if (!quesandans) {
            return NextResponse.json({
                success: false,
                message: "Interview not found"
            }, { status: 404 })
        }
        return NextResponse.json({
            success: true,
            message: "Interview found",
            data: quesandans
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error to find question and answer"
        }, { status: 500 })
    }
}