'use server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '@/models/User';
import { dbConnect } from '@/lib/dbConnect';

export async function saveProfile(formData: FormData, token: string) {
  console.log("Checking the form data");

  const { coverurl, avtarurl, username, dob, bio, instagramUrl, youtubeUrl, twitterUrl } = Object.fromEntries(formData);

  console.log("Form data:", { username, dob, bio });
  
  // Ensure mongoose is connected
  await dbConnect();

  console.log("Token from serverside:", token);
  console.log("Secret code:", process.env.JWT_SECRET);

  let decoded: string | JwtPayload;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("Decoded token:", decoded);
  } catch (error) {
    console.error("Invalid token", error);
    return false;  // Token is invalid
  }

  let userId: string;
  if (typeof decoded === 'object' && decoded.id) {
    userId = decoded.id as string;
    console.log("User ID:", userId);
  } else {
    console.error("No user ID in token payload");
    return false;  // No user ID in the token
  }

  try {
    // Find the user by ID and update the profile information
    const profileInfoDoc = await User.findById(userId);
    if (profileInfoDoc) {
      profileInfoDoc.set({
        role: 'creator',
        coverurl,
        avtarurl,
        username,
        dob,
        bio,
        instagramUrl,
        youtubeUrl,
        twitterUrl,
      });
      await profileInfoDoc.save();
      console.log("Profile updated successfully");
      return true;
    } else {
      console.error("No user found with the provided ID");
      return false;  // No user found with the provided ID
    }
  } catch (error) {
    console.error("Error updating profile", error);
    return false;
  }
}



