import app from './app';
import connectDB from './db/database';
import { AddressInfo } from 'net';
import logger from './utils/logger';
import validateEnv from './utils/validateEnv';

validateEnv();

const PORT: number = parseInt(process.env.PORT || '3000', 10);

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      const { port } = server.address() as AddressInfo;
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();