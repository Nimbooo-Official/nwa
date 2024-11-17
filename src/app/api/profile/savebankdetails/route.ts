'use server'
import { dbConnect } from '@/lib/dbConnect';
import KYC from '@/models/bankdetails'; // Adjust the path to your KYC model
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Ensure your secret key is stored securely

export async function POST(req: NextRequest) {
    await dbConnect();
  
    const { token, personalDetails, bankDetails, withdrawalPreference } = await req.json();
  
    console.log("Received Payload:", { token, personalDetails, bankDetails, withdrawalPreference });
  
    // Verify the token
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
      const userId = decoded.id;
  
      const { documentType, documentId, imageUrl } = personalDetails;
  
      // Validate required fields
      if (!documentType || !documentId || !imageUrl || !bankDetails || !withdrawalPreference) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
      }

      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ message: 'user dosent exist' }, { status: 400 });
      }
  
      const newKYC = new KYC({
        userId,
        formData: {
          documentType,
          documentId,
          imageUrl,
          bankDetails,
          withdrawalPreference,
        },
      });
  
      console.log("New KYC Document:", newKYC);
  
      await newKYC.save();
  
      return NextResponse.json({
        message: 'KYC record created successfully',
        
        
      }, { status: 201 });
    } catch (error) {
      console.error('Error in KYC processing:', error);
      return NextResponse.json({ message: 'Invalid token or error processing request' }, { status: 401 });
    }
  }
  

