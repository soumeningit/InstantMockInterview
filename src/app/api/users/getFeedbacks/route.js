import { dbConnect } from "@/dbConfing/dbConfig";
import Feedback from "@/models/feedbackModel";
import { NextResponse } from "next/server";

dbConnect();

export async function GET() {
    try {
        const feedbacks = await Feedback.find({}).populate({
            path: "user",
            select: "name email"
        });
        if (!feedbacks) {
            return NextResponse.json({
                success: false,
                message: "Feedbacks are not created till",
            }, { status: 400 });
        }
        console.log("feedbacks : " + feedbacks);
        return NextResponse.json({
            success: true,
            message: "Feedbacks fetched successfully",
            data: feedbacks,
        }, { status: 200 });

    } catch (error) {
        console.log("Error to get feedbacks : " + error);
        return NextResponse.json({
            success: false,
            message: "Error to get feedbacks"
        }, { status: 500 });
    }
}