import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const asyncHandler = (execution: AsyncFunction): AsyncHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    execution(req, res, next).catch(next);
  };
};

export default asyncHandler;