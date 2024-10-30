// pages/api/signup.ts
import { NextRequest, NextResponse } from 'next/server';
import {dbConnect} from '@/lib/dbConnect';  // Ensure this is the default export
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import  jwt from "jsonwebtoken"
import { cookies } from 'next/headers';

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

        const eUser = await User.findOne({  mobileNo  });
        const token = jwt.sign(
            { id: eUser._id, mobileNo:mobileNo },
            process.env.JWT_SECRET as string // secret key from environment variable // Token expiration time
          );
        
          // Set the token in a cookie (HTTP-only for security)
          cookies().set('token', token, {
            httpOnly: true, // Ensures the cookie is not accessible via JavaScript
            secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
            path: '/', // Make the cookie available to all pages
            maxAge: 60 * 60 * 24, // 1 day expiration
          });
        

        return NextResponse.json({ success: true, message: 'User registered successfully',token:token }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
