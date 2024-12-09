import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

export async function POST(request: NextRequest) {
        
    const reqBody = await request.json();
    const { email , currentPassword, newPassword } = reqBody;

    if (!currentPassword || !newPassword || !email) {
        return NextResponse.json({ message: 'Please Provide all the credentials', status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: 'User not found' , status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Current password is incorrect' , status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({ message: 'Password changed successfully', status: 200 });
}