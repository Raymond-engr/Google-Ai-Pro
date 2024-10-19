import type { ISearch } from '../models/searchModel';

declare global {
  namespace Express {
    interface Request {
      search?: ISearch | null;
    }
  }
}

export {};