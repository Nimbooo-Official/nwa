// lib/dbConnect.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

interface MongooseConnection {
  isConnected?: number;
}

const mongooseConnection: MongooseConnection = {};

export const dbConnect = async () => {
  if (mongooseConnection.isConnected) {
    return;
  }

  const db = await mongoose.connect(MONGO_URI,);
  // {
  //   useNewUrlParser: true as boolean,
  //   useUnifiedTopology: true as ,
  // }

  mongooseConnection.isConnected = db.connections[0].readyState;
  console.log('MongoDB connected:', db.connection.host);
};
