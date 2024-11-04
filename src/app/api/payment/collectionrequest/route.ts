// pages/api/createCollectRequest.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import CollectRequest from '@/models/collectrequest';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  await dbConnect();

  const {
    virtualAccountId,
    name,
    purpose,
    email,
    phone,
    collectRequestType,
    amount,
    message,
  } = await req.json();

  const key = process.env.WIRE_API_KEY!;
  const salt = process.env.WIRE_API_SALT!;
  const hashString = `${key}|${virtualAccountId}|${salt}`;
  const authorization = crypto.createHash('sha512').update(hashString).digest('hex');

  try {
    // Make the collect request to Easebuzz API
    const response = await fetch(`https://wire.easebuzz.in/api/v1/insta-collect/virtual_accounts/${virtualAccountId}/collect_request/`, {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'WIRE-API-KEY': key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        purpose,
        email,
        phone,
        collect_request_type: collectRequestType,
        amount,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Error creating collect request' }, { status: response.status });
    }

    // Save the collect request to MongoDB
    const collectRequest = new CollectRequest({
      virtualAccountId,
      name,
      purpose,
      email,
      phone,
      collectRequestType,
      amount,
      message
    });

    await collectRequest.save();

    return NextResponse.json({ message: 'Collect request created successfully', data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
