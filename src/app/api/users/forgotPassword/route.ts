import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

export async function POST(request: NextRequest) {
        
    const reqBody = await request.json();
    const { email ,newPassword , confirmPassword} = reqBody;

    if (!confirmPassword || !newPassword || !email) {
        return NextResponse.json({ message: 'Please Provide all the credentials', status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: 'User not found' , status: 404 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({ message: 'Password changed successfully', status: 200 });
}