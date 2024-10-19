import mongoose from 'mongoose';
import logger from '../utils/logger';

let cachedConnection: typeof mongoose | null = null;

const connectDB = async (): Promise<typeof mongoose> => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 5000,
    });
    
    cachedConnection = connection;
    logger.info(`MongoDB Connected: ${connection.connection.host}`);
    return connection;
  } catch (error: any) {
    logger.error(`MongoDB connection failed. Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;