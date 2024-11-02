import { dbConnect } from "@/dbConfing/dbConfig";
import Feedback from "@/models/feedbackModel";
import Interview from "@/models/interviewModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

dbConnect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        console.log("reqBody : " + JSON.stringify(reqBody));
        const { userId, interviewId, message, rating } = reqBody;
        console.log(userId, interviewId, message, rating);
        if (!userId || !interviewId || !rating) {
            return NextResponse.json({
                success: false,
                message: "Please provide userId and interviewId,rating"
            }, { status: 400, })
        }
        const user = await User.findById({ _id: userId });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }
        console.log("user : " + user);
        const interview = await Interview.findById({ _id: interviewId });
        if (!interview) {
            return NextResponse.json({
                success: false,
                message: "Interview not found"
            }, { status: 404 })
        }
        console.log("interview : " + interview);

        const isUserExsistInFeedBack = await Feedback.findOne({ user: userId });
        console.log("isUserExsistInFeedBack : " + isUserExsistInFeedBack);
        console.log("isUserExsistInFeedBack?.interview : " + isUserExsistInFeedBack?.interview);
        if (isUserExsistInFeedBack && isUserExsistInFeedBack.interview.equals(new mongoose.Types.ObjectId(interviewId))) {
            console.log("Inside condition....");
            const updatedFeedbackResponse = await Feedback.findByIdAndUpdate({ _id: isUserExsistInFeedBack._id }, { rating: rating, message: message }, { new: true });
            console.log("updatedFeedbackResponse : " + updatedFeedbackResponse);
            return NextResponse.json({
                success: true,
                message: "Feedback updated successfully",
            }, { status: 200 });
        }
        const feedback = new Feedback({
            user: userId,
            interview: interviewId,
            message: message,
            rating: rating
        });
        const savedFeedback = await feedback.save();
        console.log("savedFeedback : " + savedFeedback);
        if (!savedFeedback) {
            return NextResponse.json({
                success: false,
                message: "Failed to save feedback"
            }, { status: 500 })
        }
        return NextResponse.json({
            success: true,
            message: "Feedback saved successfully",
        }, { status: 200 });

    } catch (error) {
        console.log("Feedback : " + error);
        NextResponse.json({
            success: false,
            message: "Error Occured",
        }, { status: 401 });
    }
}