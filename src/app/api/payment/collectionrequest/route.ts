import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { virtualAccountId, email, phone, amount } = await req.json();
    console.log('Step 1: Received request data:', { virtualAccountId, email, phone, amount });

    // Validate required parameters
    if (!virtualAccountId || !email || !phone || !amount) {
      console.error('Step 2: Missing required parameters:', { virtualAccountId, email, phone, amount });
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Generate Authorization Header
    const key = process.env.Merchant_Key; // WIRE-API-KEY provided by Easebuzz
    const salt = process.env.Merchant_Salt; // Merchant_Salt provided by Easebuzz

    if (!key || !salt) {
      console.error('Step 3: Missing environment variables (Merchant_Key or Merchant_Salt)');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const hashString = `${key}|${virtualAccountId}|${salt}`;
    console.log('Step 3: Hash string:', hashString);

    const authorization = crypto.createHash('sha512').update(hashString).digest('hex');
    console.log('Step 3: Generated authorization hash:', authorization);

    // Prepare API request
    const requestBody = {
      key, // Add "key" field in the body as per the documentation
      email,
      phone,
      collect_request_type: ['account_details', 'upi_handle'],
      amount,
      purpose: "to collect", // Fixed purpose
    };

    console.log('Step 4: Sending request to Easebuzz API...');
    const response = await fetch(`https://wire.easebuzz.in/api/v1/insta-collect/virtual_accounts/${virtualAccountId}/collect_request/`, {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'WIRE-API-KEY': key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Handle API response
    console.log('Step 5: Received response from Easebuzz API');
    const data = await response.json();
    console.log('Step 5: Response data:', data);

    if (!response.ok) {
      console.error('Step 5: Error response from API:', { status: response.status, data });
      return NextResponse.json({ error: data.message || 'Error creating collect request' }, { status: response.status });
    }

    console.log('Step 5: Successfully created collect request:', data);
    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    // Catch and log unexpected errors
    console.error('Step 6: Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
