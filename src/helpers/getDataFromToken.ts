import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const getDataFromToken = (request: NextRequest) => {
    try {
        console.log(process.env.TOKEN_SECRET);
        
        const token = request.cookies.get("token")?.value || '';
        console.log(token);
        console.log("token");
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log(decodedToken.id);
        // const decodedToken = "6752f680e28f46ea333f5790";
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }

}