import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

export const uploadFileToCloudinary = (fileUri, fileName) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload(fileUri, {
                invalidate: true,
                resource_type: "auto",
                filename_override: fileName,
                folder: process.env.FOLDER_NAME, // specify your desired folder here
                use_filename: true,
            })
            .then((result) => {
                resolve({ success: true, result });
            })
            .catch((error) => {
                console.error("Error uploading to Cloudinary:", error);
                reject({ success: false, error });
            });
    });
};
