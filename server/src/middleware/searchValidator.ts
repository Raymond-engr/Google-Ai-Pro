import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import logger from '../utils/logger';
import { BadRequestError } from '../utils/customErrors';

export interface SearchQuery {
  q: string;
}

const searchSchema = Joi.object({
  q: Joi.string().min(1).max(100).required(),
});

const validateSearchQuery = (req: Request, res: Response, next: NextFunction): void => {
  const { error, value } = searchSchema.validate(req.query);
  
  if (error) {
    logger.warn(`Invalid search query: ${error.details[0].message}`);
    return next(new BadRequestError(error.details[0].message));
  }
  
  (req as Request & { validatedQuery: SearchQuery }).validatedQuery = value;
  next();
};

export default validateSearchQuery;