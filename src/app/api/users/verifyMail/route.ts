import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";


export async function POST(request: NextRequest){
    await connect();
    const reqBody = await request.json()
    console.log("Request Body:", reqBody);
    const {userId} = reqBody;
    const user = await User.findById(userId).select("-password");
    if(!user){
        return NextResponse.json({error: "User not found"}, {status: 404});
    }

    //send verification email
    const response = await sendEmail({email : user.email, emailType: "RESET", userId: user._id});
    return response;

}