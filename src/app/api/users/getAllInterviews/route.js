import { dbConnect } from "@/dbConfing/dbConfig";
import Interview from "@/models/interviewModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

dbConnect();

export async function POST(NextRequest) {
    try {
        const reqBody = await NextRequest.json();
        const { userId } = reqBody;
        const user = await User.findById({ _id: userId });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        const allInterviews = await Interview.find({ userId: userId });

        return NextResponse.json({
            success: true,
            message: "Interviews found",
            data: allInterviews
        }, { status: 200 })

    } catch (error) {
        console.log("error in getting all interview : " + error);
        return NextResponse.json({
            status: false,
            message: "Error in getting all interview"
        }, { status: 400 })
    }
}