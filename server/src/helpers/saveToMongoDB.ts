import Search from '../models/searchModel';
import { ISearchData } from '../controllers/getSearch';
import logger from '../utils/logger';

export const saveToMongoDB = async (data: ISearchData): Promise<ISearchData> => {
  try {
    const mongoResult = await Search.create(data);
    logger.info('Saved to MongoDB:', mongoResult);
    return mongoResult;
  } catch (error) {
    logger.error('Error saving to MongoDB:', error);
    throw new Error('Failed to save data to MongoDB');
  }
};