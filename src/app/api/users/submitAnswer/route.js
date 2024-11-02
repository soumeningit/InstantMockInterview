import Interview from "@/models/interviewModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const { dbConnect } = require("@/dbConfing/dbConfig");

dbConnect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        // console.log("reqBody : " + reqBody);
        const { userId, interviewId, answers } = reqBody;
        console.log("userId,interviewId,answers : " + userId, interviewId, answers);
        if (!userId || !interviewId || answers.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Data is missed"
            })
        }
        const user = await User.findById({ _id: userId });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 })
        }
        // console.log("user : " + user);
        const interview = await Interview.findById({ _id: interviewId });
        if (!interview) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 400 })
        }
        // console.log("interview : " + interview);

        let n = answers?.length;
        // console.log("interview.queandans : " + interview?.queandans);
        console.log("n : " + n);
        let submittedArray = new Array(n).fill({ question: "", originalAnswer: "", userAnswer: "" });
        // Ensure interview.queandans is an array
        if (Array.isArray(interview?.queandans)) {
            submittedArray = interview.queandans.map((item, index) => ({
                question: item.question || "",
                originalAnswer: item.answer || "",
                userAnswer: answers[index] || ""
            }));

            // console.log("submittedArray:", JSON.stringify(submittedArray));
        } else {
            console.error("interview.queandans is not an array");
        }


        // console.log("submittedArray : " + JSON.stringify(submittedArray));

        const updatedInterview = await Interview.findByIdAndUpdate({ _id: interviewId }, { answer: submittedArray }, { new: true });
        console.log("updatedInterview : " + updatedInterview);
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_SECRET_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Evaluate ${updatedInterview?.answer} each userAnswer by comparing it with the corresponding originalAnswer for each question. 
        Assess the answers for relevance, completeness, and accuracy of meaning and context (not word-for-word similarity). 
        Use JSON format without any special characters and organize the response as follows:
        overallRating: a score out of 10 reflecting the user's performance across all answers.
        message: an overall summary of the user’s responses.
        suggestion: any general advice for improvement across all answers.
        answers: an array where each entry corresponds to a question and contains:
        question: the question text.
        message: specific feedback on how well the user’s answer meets the question’s requirements.
        marks: a score out of 10 based on the quality of the user’s answer in relevance, completeness, and accuracy. 
        Make sure Please format your response in simple JSON without any special characters. `
        const result = await model.generateContent(prompt);
        console.log("result : ", result);
        const responseFromAI = result.response.text();
        // let response = responseFromAI.replace(/[\\\n\r\t\v\f!@#$%^&*()\-_=+{}[\]|:";\'<>,.?~`]/g, '');

        // // If you want to remove all whitespace as well, you can use the following:
        // response = response.replace(/\s+/g, '');

        // // Parse the cleaned JSON string
        let answer = JSON.parse(responseFromAI);
        console.log("answer : " + answer);
        console.log("responseFromAI : " + responseFromAI);
        let newResponse = {};
        newResponse.overallRating = answer.overallRating
        newResponse.message = answer.message
        newResponse.suggestion = answer.suggestion
        newResponse.answers = answer.answers

        console.log("newResponse : " + JSON.stringify(newResponse));

        if (responseFromAI) {
            const updatedInterview = await Interview.findByIdAndUpdate({ _id: interviewId }, {
                $set: {
                    analysedAnswer: newResponse
                }
            }, { new: true });
            console.log("updatedInterview : " + updatedInterview);

        }
        return NextResponse.json({
            success: true,
            message: "Submitted",
            data: responseFromAI
        }, { status: 200 })
    } catch (error) {
        console.log("Error in answer submission : " + error);
        return NextResponse.json({
            success: false,
            message: "Answer submission failed"
        }, { status: 500 })
    }
}