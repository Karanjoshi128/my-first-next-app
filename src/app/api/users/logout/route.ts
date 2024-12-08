import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import "dotenv/config";



export async function POST() {
    try {
        await connect();
        const response = NextResponse.json({message : "Logged out successfully",success : true});
        response.cookies.set("token","",{httpOnly : true , expires : new Date(0)});
        return response;
        
    } catch (error: any) {
        return NextResponse.json({error : error.message},{status: 500});

        
    }
}