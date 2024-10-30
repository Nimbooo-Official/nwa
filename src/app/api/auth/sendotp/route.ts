'use server'

import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
// import axios from 'axios'; // For sending SMS via API

// Function to generate a 6-digit OTP
function generateOTP(length = 6) {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

// Function to send OTP via SMS
async function sendOtpViaSms(mobileno: string, otp: string) {
  const userId = process.env.SMS_API_USER_ID;
  const password = process.env.SMS_API_PASSWORD;
  const senderId = process.env.SMS_API_SENDER_ID;
  const entityId = process.env.SMS_API_ENTITY_ID;
  const templateId = process.env.SMS_API_TEMPLATE_ID;

  if (!userId || !password || !senderId || !entityId || !templateId) {
    throw new Error('Missing SMS API credentials in environment variables');
  }

  // Manually encoding only the message, ensuring no double encoding
  const message = `${otp} OTP for your exciting journey of earning Rewards for Reviews of Products and Services you use regularly - RewardWale`;
  const encodedMessage = encodeURIComponent(message);

  // Directly concatenate URL with the encoded message to prevent double encoding
  const url = `http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=${userId}&Password=${password}&SenderID=${senderId}&Phno=${mobileno}&Msg=${encodedMessage}&EntityID=${entityId}&TemplateID=${templateId}`;

  console.log(url);  // This should show correctly encoded spaces as `%20`, not `%2520`

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to send OTP via SMS API');
    }
    return await response.text();
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
}

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    const { mobileNo } = await req.json();

    if (!mobileNo) {
      return NextResponse.json({ success: false, message: 'Mobile number is required' }, { status: 400 });
    }

    let otp;

    // Use a static OTP for testing purposes with specific mobile number
    if (mobileNo !== '919987731933') {
      otp = generateOTP();
      try {
        await sendOtpViaSms(mobileNo, otp);
      } catch (smsError) {
        console.error("Error sending OTP:", smsError);
        return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 });
      }
    } else {
      otp = '123456'; // Static OTP for testing
    }

    console.log('mobileno', mobileNo);

    // Check if the user exists
    console.log('mobileno and otp for the froget password',mobileNo,otp)
    const user =await User.findOne({ mobileNo});
    console.log("user" ,user)
    if (!user) {
      return NextResponse.json({ success: false, message: "User doesn't exist. Please sign up first." }, { status: 400 });
    }

    // Update the user with the new OTP and expiration time
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    await user.save();

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ success: false, message: 'Failed to send OTP' }, { status: 500 });
  }
}
