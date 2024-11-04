///api/updateVirtualAccountStatus.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { virtualAccountId, isActive } = await req.json();

  const key = process.env.Merchant_Key!;
  const salt = process.env.Merchant_Salt!;
  const hashString = `${key}|${virtualAccountId}|${salt}`;
  const authorization = crypto.createHash('sha512').update(hashString).digest('hex');

  try {
    // Make the request to Easebuzz API
    const response = await fetch(`https://wire.easebuzz.in/api/v1/insta-collect/virtual_accounts/${virtualAccountId}/update_status/`, {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'WIRE-API-KEY': key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        is_active: isActive,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Error updating virtual account status' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Virtual account status updated successfully', data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
