// pages/api/signup.ts
import { NextRequest, NextResponse } from 'next/server';
import {dbConnect} from '@/lib/dbConnect';  // Ensure this is the default export
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    console.log("hello this is signup page");
    
    // Parse JSON request body
    const { firstName, lastName, mobileNo, email, password } = await req.json();

    // Validate input
    if (!firstName || !lastName || !mobileNo || !email || !password) {
        return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    try {
        await dbConnect();

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { mobileNo }] });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            mobileNo,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
