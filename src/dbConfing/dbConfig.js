import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function dbConnect() {
    // console.log("Database Url : " + process.env.DATABASE_URL)
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log("Database Connected Successfully"))
        .catch((e) => {
            console.log("Database Connection Failed!")
            console.log(e);
            process.exit(1);
        })

}