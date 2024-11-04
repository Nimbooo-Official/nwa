// /api/getVirtualAccountById.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const virtualAccountId = searchParams.get('virtualAccountId');

  if (!virtualAccountId) {
    return NextResponse.json({ error: 'virtualAccountId is required' }, { status: 400 });
  }

  const key = process.env.WIRE_API_KEY!;
  const salt = process.env.WIRE_API_SALT!;
  const hashString = `${key}|${virtualAccountId}|${salt}`;
  const authorization = crypto.createHash('sha512').update(hashString).digest('hex');

  try {
    // Make the request to Easebuzz API
    const response = await fetch(`https://wire.easebuzz.in/api/v1/insta-collect/virtual_accounts/${virtualAccountId}?key=${key}`, {
      method: 'GET',
      headers: {
        Authorization: authorization,
        'WIRE-API-KEY': key,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Error retrieving virtual account details' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Virtual account retrieved successfully', data: data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
