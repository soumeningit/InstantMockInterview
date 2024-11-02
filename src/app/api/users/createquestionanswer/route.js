import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import User from "@/models/userModel";
import Interview from "@/models/interviewModel";
import sanitizeAndParseJSON from "../utils/sanitizeAndParseJSON";

dotenv.config();
export async function POST(NextRequest) {
    try {
        const reqBody = await NextRequest.json();
        console.log("reqBody : " + JSON.stringify(reqBody));
        const { role, position, experience, userId } = reqBody;
        console.log("userId : " + userId);
        if (!role || !position || !experience || !userId) {
            return NextResponse.json({
                success: false,
                message: "Please fill all fields"
            }, { status: 400 })
        }

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_SECRET_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const noOfQuestions = 4;

        const prompt = `Job position : ${role}, Job Description : ${position}, Years 
        of experience : ${experience} years , Depends on this information give me
        ${noOfQuestions} interview question with answer in json format. 
        Give question answer as field in json. Each pair should include a 'question' and an 'answer' property. 
        Ensure the output is structured as follows: [{\"question\": \"<your question here>\", \"answer\": \"<your answer here>\"}, 
        {\"question\": \"<next question here>\", \"answer\": \"<next answer here>\"}]"`
        // Please format the response in plain JSON 
        // and wrap up inside an array,without any code block delimiters, backticks, 
        // comments, or special characters.
        // Provide the JSON output in a simplified structure, containing only basic text 
        // strings for keys and values, and without any surrounding code delimiters.
        const result = await model.generateContent(prompt);
        console.log("result : ", result);
        const responseFromAI = result.response.text();
        console.log("responseFromAI : " + responseFromAI);
        if (!responseFromAI) {
            return NextResponse.json({
                success: false,
                message: "Failed to generate interview questions"
            }, { status: 400 })
        }

        const sanitizedData = sanitizeAndParseJSON(responseFromAI);
        console.log("sanitizedData : ", sanitizedData);
        let response = null;
        if (sanitizedData) {
            const questionandanswer = new Interview({
                userId: userId,
                queandans: sanitizedData,
                role: role,
                experience: experience,
                techStack: position,
                interviewDate: new Date(),
            });
            console.log("questionandanswer : " + questionandanswer);
            response = await questionandanswer.save();
            console.log("response : " + response);
            if (!response) {
                return NextResponse.json({
                    success: false,
                    message: "Failed to save interview questions"
                }, { status: 400 })
            }
            user.interViewIds.push(response?._id);
            const updatedUser = await user.save();
            console.log("updatedUser : ", updatedUser);
        }
        return NextResponse.json({
            success: true,
            message: "Questions and Answers",
            data: response,
        }, { status: 200 });

    } catch (error) {
        console.log("Error generating question answer : " + error);
        return NextResponse.json({
            success: false,
            "message": "Error generating question answer"
        }, { status: 400 })
    }
}