// /app/api/logout/route.js (for Next.js 13+)

// Import necessary modules
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  
  // Delete the token
  cookieStore.delete('token');
  
  // Return a response to indicate success
  return NextResponse.json({ message: 'Logged out successfully' });
}
