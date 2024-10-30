// src/app/api/notification/getPreferences.ts
'use server';

import { NextResponse } from 'next/server';
import User from '@/models/User';
import { dbConnect } from '@/lib/dbConnect';

export async function GET(request: Request) {
  try {
    // Ensure MongoDB connection is established
    await dbConnect();

    // Extract userId from query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
    }

    // Fetch user by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Return the user's preferences
    return NextResponse.json({ success: true, preferences: user.preferences }, { status: 200 });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    return NextResponse.json({ success: false, message: 'Error fetching preferences', error }, { status: 500 });
  }
}
