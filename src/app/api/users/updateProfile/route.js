import { NextResponse } from "next/server";
import { uploadFileToCloudinary } from "@/helpers/fileUploader";
import { dbConnect } from "@/dbConfing/dbConfig";
import { cloudinaryConnect } from "@/helpers/cloudinaryConnect";
import User from "@/models/userModel";

dbConnect();
cloudinaryConnect();

export async function POST(req) {
    console.log("INSIDE UPDATE PROFILE ....");
    try {
        const reqBody = await req.formData();

        // Extract the image file from FormData
        const img = reqBody.get("displayimage");
        const email = reqBody.get("email");
        const userId = reqBody.get("userId");

        console.log("email userId : " + email, userId);

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User ID is required"
            }, { status: 400 })
        }

        const user = await User.findById({ _id: userId });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }
        console.log("user : " + user);

        if (user && email) {
            user.email = email;
            const updatedUser = await user.save();
            if (!updatedUser) {
                return NextResponse.json({
                    success: false,
                    message: "Failed to update user"
                }, { status: 500 })
            }
        }
        if (user && img && img.size > 0) {
            // Convert file to base64 URI format for Cloudinary upload
            const fileBuffer = await img.arrayBuffer();
            const base64Data = Buffer.from(fileBuffer).toString("base64");
            const fileUri = `data:${img.type};base64,${base64Data}`;

            // Upload to Cloudinary
            const response = await uploadFileToCloudinary(fileUri, img.name);

            if (!response) {
                return NextResponse.json({
                    success: false,
                    message: "Failed to upload image to Cloudinary"
                }, { status: 500 })
            }

            console.log("Upload response:", response);

            const imageURL = response?.result?.secure_url;
            user.image = imageURL;
            const updatedUser = await user.save();
            console.log("updatedUser : " + updatedUser);
        }

        // if (!img) {
        //     return NextResponse.json(
        //         { success: false, message: "Image not found" },
        //         { status: 401 }
        //     );
        // }

        // Log file details
        // console.log("File details:");
        // console.log(" - name:", img.name);
        // console.log(" - size:", img.size);
        // console.log(" - type:", img.type);

        return NextResponse.json(
            { success: true, message: "Image uploaded successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { success: false, message: "Update profile failed", error: error.message },
            { status: 400 }
        );
    }
}
