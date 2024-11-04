  // models/CollectRequest.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface ICollectRequest extends Document {
  virtualAccountId: string;
  name:string;
  purpose: string;
  email: string;
  phone: string;
  collectRequestType: string[];
  amount: number;
  message:string
}

const CollectRequestSchema = new Schema({
  virtualAccountId: { type: String, required: true },
  name: { type: String, required: true },
  purpose: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  collectRequestType: [{ type: String, required: true }],
  amount: { type: Number, required: true },
 message: { type: String, required: false },
});

export default mongoose.models.CollectRequest || mongoose.model<ICollectRequest>('CollectRequest', CollectRequestSchema);
