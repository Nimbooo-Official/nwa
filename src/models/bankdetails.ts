// models/KYC.js
import { Schema, model, models } from 'mongoose';

// Define the interface for bank details
interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  branchName: string;
}

// Define the interface for withdrawal preferences
interface WithdrawalPreference {
  preference: string;
  datePreference: string;
  amount: string;
}

// Define the interface for the complete form data
interface FormData {
  documentType: string;
  documentId: string;
  imageUrl: string;
  bankDetails: BankDetails;
  withdrawalPreference: WithdrawalPreference;
}

// Define the shape of the KYC schema
interface KYC {
  userId: string; // To associate with a specific user
  formData: FormData;
}

// Define the KYC schema
const KYCSchema = new Schema<KYC>({
  userId: { type: String, required: true }, // To store the user ID
  formData: {
    documentType: { type: String, required: true },
    documentId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    bankDetails: {
      accountHolderName: { type: String, required: true },
      accountNumber: { type: String, required: true },
      ifsc: { type: String, required: true },
      branchName: { type: String, required: true },
    },
    withdrawalPreference: {
      preference: { type: String, required: true },
      datePreference: { type: String },
      amount: { type: String },
    },
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create and export the KYC model
const KYC = models.KYC || model<KYC>('KYC', KYCSchema);

export default KYC;
