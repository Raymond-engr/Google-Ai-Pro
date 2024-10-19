import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { generateResponse } from '../services/geminiService';
import { saveToMongoDB } from '../helpers/saveToMongoDB';
import logger from '../utils/logger';
import { GeminiAPIError, RateLimitError } from '../utils/customErrors';
import Search from '../models/searchModel';

export interface ISearchData {
  title: string;
  content: string;
  score: number;
  createdAt: Date;
}

export const getSearch = asyncHandler(async (req: Request, res: Response) => {
  const { q } = (req as Request & { validatedQuery: { q: string } }).validatedQuery;
  
  logger.info(`Received search query: ${q}`);

  const query = q as string;

  const existingSearch = await Search.findOne({ title: query });
  if (existingSearch) {
    logger.info(`Cache hit for query: ${query}`);
    return res.status(200).json({ success: true, data: [existingSearch], cached: true });
  }

  try {
    logger.info(`Making request to Gemini API for query: ${query}`);
    const aiResponse = await generateResponse(query);
    
    const dataToSave: ISearchData = {
      title: query,
      content: aiResponse,
      score: 1,
      createdAt: new Date()
    };
  
    logger.info(`Saving search result to database for query: ${query}`);
    const savedSearch = await saveToMongoDB(dataToSave);
    
    res.status(200).json({ success: true, data: [savedSearch], cached: false });
  } catch (error: any) {
    if (error instanceof GeminiAPIError && error.statusCode === 429) {
      logger.error(`Rate limit exceeded for query: ${query}`);
      if (error.details?.retryAfter) {
        throw new RateLimitError('Gemini API rate limit exceeded', error.details.retryAfter);
      } else {
        throw new RateLimitError('Gemini API rate limit exceeded');
      }
    } else if (error instanceof GeminiAPIError) {
      logger.error(`Gemini API Error for query: ${query} - Status: ${error.statusCode}`);
      throw new GeminiAPIError('Gemini API Error', error.statusCode, error.details);
    } else {
      logger.error(`Failed to process search query: ${error.message}`);
      throw new Error(`Failed to process search query: ${error.message}`);
    }
  }
});