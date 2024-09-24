import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connect = async () => {

  const DB_URI = process.env.MONGO_URI;
  
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
  }
}