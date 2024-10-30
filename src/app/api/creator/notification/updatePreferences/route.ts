// src/app/api/notification/updatePreferences.ts
'use server';

import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import { dbConnect } from '@/lib/dbConnect';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, preferences } = body; // Changed mobileno to userId

    if (!userId || !preferences) {
      return NextResponse.json({ success: false, message: 'Missing userId or preferences' }, { status: 400 });
    }

    await dbConnect(); // Ensure MongoDB connection is established
    const user = await User.findById(userId); // Find user by userId

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Update the user's preferences
    user.preferences = { ...user.preferences, ...preferences };
    await user.save();

    return NextResponse.json({ success: true, message: 'Preferences updated', preferences: user.preferences }, { status: 200 });
  } catch (error) {
    console.error('Error updating preferences:', error);
    return NextResponse.json({ success: false, message: 'Error updating preferences', error }, { status: 500 });
  }
}
