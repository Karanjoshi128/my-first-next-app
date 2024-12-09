
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { sendEmail } from '@/helpers/mailer';


export async function POST(request: NextRequest) {
        
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
        return NextResponse.json({ message: 'Please Provide all the credentials', status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: 'User not found' , status: 404 });
    }

    const response = await sendEmail({email : user.email, emailType: "RESET", userId: user._id});
    return response;

    }