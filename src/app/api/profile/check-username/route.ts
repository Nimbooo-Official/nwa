'use server';
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User'; // Assuming this connects to your MongoDB

export async function POST(req: NextRequest) {
  try {

    console.log("is this api is called or note")
    // Parse the request body
    const { username } = await req.json();

    // Connect to the database
    await dbConnect();

    // Check if the user exists in the database
    const userExists = await User.findOne({ username });
    console.log(userExists)

    if (userExists) {
      // If user exists, return a 400 error with a message
      return NextResponse.json({ message: 'Username is already taken' }, { status: 400 });
    }

    // If user doesn't exist, return a success response
    return NextResponse.json({ message: 'Username is available' }, { status: 200 });

  } catch (error) {
    // Catch any errors and return a 500 error response
    console.error('Error checking username:', error);
    return NextResponse.json({ message: 'Error checking username' }, { status: 500 });
  }
}
