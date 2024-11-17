'use server'
// pages/api/createVirtualAccount.ts

import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Extract the Authorization header
    const authorizationHeader = req.headers.get('Authorization');
    if (!authorizationHeader) {
      return NextResponse.json({ error: "Authorization token is missing" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Invalid token format" }, { status: 401 });
    }

    // Verify the JWT token
    let userId;
    try {
      const decodedToken = jwt.verify(token, SECRET_KEY) as { id: string };
      userId = decodedToken.id;
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found. Please log in again." }, { status: 401 });
    }

    // Prepare the required fields
    const { firstName, lastName, mobile } = user;
    const label = `${firstName} ${lastName}`;
    const uniqueRequestNumber = user._id.toString();

    const { virtualPaymentAddress } = await req.json(); // Parse the required field from the request body

    // Construct the SHA-512 hash for authorization
    const key = process.env.Merchant_Key;
    const salt = process.env.Merchant_Salt;
    const hashString = `${key}|${label}|${salt}`;
    const authorization = crypto.createHash('sha512').update(hashString).digest('hex');

    // Make the request to Easebuzz API
    const response = await fetch('https://wire.easebuzz.in/api/v1/insta-collect/virtual_accounts/', {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'WIRE-API-KEY': key!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        unique_request_number: uniqueRequestNumber,
        key,
        label,
        virtual_payment_address: virtualPaymentAddress,
        mobile,
      }),
    });

    const data = await response.json();

    // Check for a successful response from the Easebuzz API
    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Error creating virtual account' }, { status: response.status });
    }

    console.log("Data from Easebuzz API:", data);

    // Retrieve and store only the virtualAccountId
    const { id: virtualAccountId } = data.data.virtual_account;

    user.virtualAccountId = virtualAccountId; // Assuming the User model has a `virtualAccountId` field
    await user.save();

    // Return a success response
    return NextResponse.json({ message: "Virtual account created successfully", virtualAccountId }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
