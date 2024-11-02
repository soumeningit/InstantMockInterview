import Contact from "@/models/contactusModel";
import { NextResponse } from "next/server";
import mailSender from "@/helpers/mailSender";
import { contactUsEmailTemplate } from "@/mailtemplates/contactUsEmailTemplate";
import { dbConnect } from "@/dbConfing/dbConfig";

dbConnect();
export async function POST(req) {
    try {
        const reqBody = await req.json();
        // console.log("reqBody : " + JSON.stringify(reqBody));
        const { name, email, message, phone, country } = reqBody.formData;
        // console.log(name, email, message, phone, country);
        if (!name || !email || !message) {
            return NextResponse.json({
                success: false,
                message: "Name,Email,Message can not be empty",
            }, { status: 400 });
        }
        const data = new Contact({
            name: name,
            email: email,
            phone: phone,
            country: country,
            message: message,
            date: new Date()
        })
        // console.log("data : " + data);
        const response = await data.save();
        // console.log("response : " + response);
        if (!response) {
            return NextResponse.json({
                success: false,
                message: "Failed to save data",
            }, { status: 500 })
        }
        const mailResponse = await mailSender(email, "Thanks for your feedback", contactUsEmailTemplate(name, email, message));
        if (!mailResponse) {
            return NextResponse.json({
                success: false,
                message: "Failed to send mail",
            }, { status: 400 });
        }
        return NextResponse.json({
            success: true,
            message: "Message sent successfully",
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Failed to save data",
        }, { status: 400 })
    }
}