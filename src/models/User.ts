// import { Schema, model, Document } from 'mongoose';
import { model, models, Schema, Document } from 'mongoose';


interface Preferences {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
  push: boolean;
}

const PreferencesSchema = new Schema<Preferences>({
  email: { type: Boolean, default: true },
  sms: { type: Boolean, default: false },
  whatsapp: { type: Boolean, default: false },
  push: { type: Boolean, default: true },
});

interface IUser extends Document {
  firstName: string;
  lastName: string;
  dateOfBerth:Date
  email: string;
  mobileNo: string;
  pincode: string;
  password: string;
  creatorCategory:string;
  otp?: string;
  role: 'admin' | 'creator' | 'user';
  username: string;
  bio:string;
  avtarurl:string;
  coverurl:string;
  instagramLink:string
  twiterurl:string
  facebookLink:string
  youtubeurl:string
  isVerified: boolean;
  posts: Schema.Types.ObjectId[];
  donations: Schema.Types.ObjectId[];
  preferences: Preferences;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String},
  lastName: { type: String},
  mobileNo:{ type: String , required: true,unique: true },
  email: { type: String },
  password: { type: String , required: true },
  dateOfBerth: { type: Date},
  pincode: { type: String },
  creatorCategory: { type: String },
  otp: { type: String,},
  role: { type: String, enum: ['admin', 'creator', 'user'], default: 'user' },
  username: { type: String,},
  bio:{ type: String,},
  avtarurl:{ type: String,},
  coverurl:{ type: String,},
  instagramLink:{ type: String,},
  twiterurl:{ type: String },
  facebookLink:{ type: String },
  youtubeurl:{ type: String },
  isVerified: { type: Boolean, default: false },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  donations: [{ type: Schema.Types.ObjectId, ref: 'Donation' }],
  preferences: { type: PreferencesSchema, default: () => ({}) },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = models?.IUser || model<IUser>('IUser', UserSchema);

export default User;

