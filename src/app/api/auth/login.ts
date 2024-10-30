'use server';

import User from "@/models/User";
// import mongoose from "mongoose";
import  jwt from "jsonwebtoken"
import { cookies } from 'next/headers';
import { dbConnect } from "@/lib/dbConnect";

export async function loginAccount(formData: FormData) {
  // Connect to MongoDB
   dbConnect()

  // Extract data from formData
  const { mobileno, password } = Object.fromEntries(formData) as { mobileno: string; password: string };

  if (!mobileno || !password) {
    return { success: false, message: "Mobile number and password are required" };
  }

  // Check if the user exists
  const existingUser = await User.findOne({ MobileNo:mobileno });
  if (!existingUser) {
    return { success: false, message: "User not found" };
  }

  // Check if the password matches (direct comparison since no encryption is being used)
  if (existingUser.SetPin !== password) {
    return { success: false, message: "Invalid credentials" };
  }

  // Generate JWT using user's ID and mobile number without an expiration
  // If OTP matches, generate JWT token
  const token = jwt.sign(
    { id: existingUser._id, mobileno: existingUser.mobileno },
    process.env.JWT_SECRET as string // secret key from environment variable // Token expiration time
  );

  // Set the token in a cookie (HTTP-only for security)
  cookies().set('token', token, {
    httpOnly: true, // Ensures the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
    path: '/', // Make the cookie available to all pages
    maxAge: 60 * 60 * 24, // 1 day expiration
  });

   console.log(existingUser)

  // Return success response with cookie set
  return{ 
      success: true,
      message: "Login successful",
      role:existingUser.role
    
  }
}
