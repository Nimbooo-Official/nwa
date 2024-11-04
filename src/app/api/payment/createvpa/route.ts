// pages/api/createVirtualAccount.ts

import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from "@/lib/dbConnect"; // A utility to connect to MongoDB
import VirtualAccount from "@/models/virtualaccount";
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const {
      uniqueRequestNumber,
      label,
      description,
      virtualAccountNumber,
      virtualPaymentAddress,
      autoDeactivateAt,
      authorizedRemitters,
      transactionAmountLimit,
    } = await req.json(); // Parse JSON from request body

    // Construct the SHA-512 hash
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
        description,
        virtual_account_number: virtualAccountNumber,
        virtual_payment_address: virtualPaymentAddress,
        auto_deactivate_at: autoDeactivateAt,
        authorized_remitters: authorizedRemitters,
        transaction_amount_limit: transactionAmountLimit,
      }),
    });

    const data = await response.json();

    // Check for a successful response from the API
    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Error creating virtual account' }, { status: response.status });
    }

    // Save the data to MongoDB
    const virtualAccount = new VirtualAccount({
      uniqueRequestNumber,
      label,
      description,
      virtualAccountNumber,
      virtualPaymentAddress,
      autoDeactivateAt,
      authorizedRemitters,
      transactionAmountLimit,
    });

    await virtualAccount.save();

    // Return a success response
    return NextResponse.json({ message: "Virtual account created successfully", data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
