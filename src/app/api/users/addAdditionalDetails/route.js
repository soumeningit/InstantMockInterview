import AdditionalDetails from "@/models/additionalDetails";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

const { dbConnect } = require("@/dbConfing/dbConfig");

dbConnect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        console.log("reqBody : " + JSON.stringify(reqBody));
        const {
            phone,
            gender,
            dob,
            address,
            phoneno,
            userId } = reqBody;
        if (!userId || !phone) {
            return NextResponse.json({
                success: false,
                message: "Please provide userId and phone number"
            }, { status: 404 });
        }
        const user = await User.findOne({ _id: userId });
        console.log("user : " + user);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }
        const additionalDetails = new AdditionalDetails({
            userId: userId,
            phoneNo: phoneno,
            address: address,
            dob: dob,
            gender: gender,
        });
        const isUserPresent = await AdditionalDetails.findOne({ userId: userId });
        const id = isUserPresent?._id;
        console.log("id : " + id);
        console.log("isUserPresent : " + isUserPresent);
        if (isUserPresent) {
            const updatedUser = await AdditionalDetails.findByIdAndUpdate(id, {
                phoneNo: phoneno,
                address: address,
                dob: dob,
                gender: gender,
            }, { new: true });
            console.log("updatedUser : " + updatedUser);
            return NextResponse.json({
                success: true,
                message: "Additional details updated successfully",
                updatedUser
            }, { status: 200 });
        }
        const newAdditionalDetails = await additionalDetails.save();
        console.log("newAdditionalDetails : " + newAdditionalDetails);
        user.additionalDetails = newAdditionalDetails._id;
        await user.save();
        return NextResponse.json({
            success: true,
            message: "Additional details addeded successfully",
            newAdditionalDetails
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Can't submit additional details"
        }, { status: 400 })
    }
}