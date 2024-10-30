'use server';

import User from "@/models/User";
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import { dbConnect } from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  console.log("Hello, this is the signup page");

  // Connect to MongoDB
  await dbConnect();

  // Extract data from request body
  const { mobileNo, otp } = await req.json();
  if (!mobileNo || !otp) {
    return NextResponse.json({ success: false, message: "Mobile number and OTP are required" }, { status: 400 });
  }

  // Check if the user exists
  const existingUser = await User.findOne({ mobileNo });
  if (!existingUser) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  // Check if the OTP matches
  if (existingUser.otp !== otp) {
    return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 401 });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: existingUser._id, mobileNo: existingUser.mobileNo },
    process.env.JWT_SECRET as string
  );

  // Set the token in a cookie (HTTP-only for security)
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day expiration
  });

  console.log("Existing User:", existingUser);

  // Return success response with user role and username
  return NextResponse.json({
    success: true,
    message: "Login successful",
    role: existingUser.role,
    username: existingUser.username
  });
}
