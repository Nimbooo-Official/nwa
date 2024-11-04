// /api/updateVirtualAccount.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function PUT(req: NextRequest) {
  const {
    virtualAccountId,
    label,
    description,
    virtualAccountNumber,
    virtualPaymentAddress,
    autoDeactivateAt,
    authorizedRemitters,
    transactionAmountLimit,
  } = await req.json();

  const key = process.env.Merchant_Key!;
  const salt = process.env.Merchant_Salt!;
  
  // Generate the SHA-512 hash for the authorization header
  const hashString = `${key}|${virtualAccountId}|${label}|${salt}`;
  const authorization = crypto.createHash('sha512').update(hashString).digest('hex');

  try {
    // Make the PUT request to Easebuzz API
    const response = await fetch(`https://wire.easebuzz.in/api/v1/insta-collect/virtual_accounts/${virtualAccountId}/`, {
      method: 'PUT',
      headers: {
        Authorization: authorization,
        'WIRE-API-KEY': key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Error updating virtual account' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Virtual account updated successfully', data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
