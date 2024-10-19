import axios from 'axios';
import logger from '../utils/logger';
import { GeminiAPIError } from '../utils/customErrors';

export function handleGeminiError(error: any): never {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        logger.error('Gemini API rate limit reached');
        throw new GeminiAPIError('Gemini API Rate Limit Exceeded', 429, { retryAfter });
      }
      logger.error('Gemini API error:', error.response.data);
      throw new GeminiAPIError(`Gemini API Error ${error.response.status}`, error.response.status, error.response.data);
    } else if (error.request) {
      logger.error('Gemini API Request Error', 0, error.request);
      throw new GeminiAPIError('Gemini API Request Error', 0, error.request);
    } else {
      logger.error('Gemini API Error', 0, error.message);
      throw new GeminiAPIError('Gemini API Error', 0, error.message);
    }
  }
  logger.error('Unexpected error: Failed to generate response', error);
  throw new GeminiAPIError('Error in Gemini API call', 500, error);
}