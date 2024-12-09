import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";



export async function GET(request:NextRequest){

    try {
        await connect();
        const userId = getDataFromToken(request);
        console.log("userid is : " , userId);
        const user = await User.findOne({_id: userId}).select("-password");
        console.log("user is : " , user);
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}