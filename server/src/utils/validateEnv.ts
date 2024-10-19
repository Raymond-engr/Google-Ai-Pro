import dotenv from 'dotenv';
import { cleanEnv, str, port, url } from 'envalid';
dotenv.config();

const validateEnv = (): void => {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
    PORT: port(),
    MONGODB_URI: url(),
    GEMINI_API_KEY: str(),
    FRONTEND_URL: url(),
    LOG_LEVEL: str({ choices: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'] }),
  });
};

export default validateEnv;