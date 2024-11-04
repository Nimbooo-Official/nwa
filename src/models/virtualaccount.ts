// models/VirtualAccount.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define an interface for the schema to enforce TypeScript types
export interface IVirtualAccount extends Document {
  uniqueRequestNumber: string;
  label: string;
  description?: string;
  virtualAccountNumber?: string;
  virtualPaymentAddress?: string;
  autoDeactivateAt?: string;
  authorizedRemitters?: {
    accountNumber: string;
    accountIfsc: string;
  }[];
  transactionAmountLimit?: {
    imps?: number;
    neft?: number;
    rtgs?: number;
  };
}

// Define the schema
const VirtualAccountSchema: Schema<IVirtualAccount> = new mongoose.Schema({
  uniqueRequestNumber: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String },
  virtualAccountNumber: { type: String },
  virtualPaymentAddress: { type: String },
  autoDeactivateAt: { type: String },
  authorizedRemitters: [
    {
      accountNumber: { type: String },
      accountIfsc: { type: String },
    },
  ],
  transactionAmountLimit: {
    imps: { type: Number },
    neft: { type: Number },
    rtgs: { type: Number },
  },
});

// Export the model with TypeScript support
const VirtualAccount: Model<IVirtualAccount> =
  mongoose.models.VirtualAccount || mongoose.model<IVirtualAccount>('VirtualAccount', VirtualAccountSchema);

export default VirtualAccount;
