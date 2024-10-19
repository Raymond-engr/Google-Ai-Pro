import app from './app';
import { AddressInfo } from 'net';
import logger from './utils/logger';
import validateEnv from './utils/validateEnv';

validateEnv();

const PORT: number = parseInt(process.env.PORT || '3000', 10);

const startServer = () => {
  const server = app.listen(PORT, () => {
    const { port } = server.address() as AddressInfo;
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
  });
};

startServer();