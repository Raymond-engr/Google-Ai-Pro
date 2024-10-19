import axios from 'axios';
import logger from '../utils/logger';
import { AppError } from '../utils/customErrors';
import { handleGeminiError } from '../helpers/handleGeminiErrors';
import { generatePrompt } from '../helpers/generatePrompt';
import validateEnv from '../utils/validateEnv';

validateEnv();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
  }>;
}

export async function generateResponse(query: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    logger.error('GEMINI_API_KEY is not set');
    throw new AppError('GEMINI_API_KEY is not set', 500);
  }

  try {
    const response = await axios.post<GeminiResponse>(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: generatePrompt(query)
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000
      }
    );

    const { data } = response;
    logger.info('API Response:', data);

    if (data.candidates[0].finishReason === 'SAFETY') {
      throw new AppError('The query was flagged for safety reasons', 400);
    }

    if (data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      logger.error('Unexpected response structure from Gemini API:', response.data);
      throw new AppError('Unexpected response structure from Gemini API', 500);
    }
  } catch (error: any) {
    handleGeminiError(error);
  }
}