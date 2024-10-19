import { Router } from 'express';
import { getSearch } from '../controllers/getSearch';
import validateSearchQuery from '../middleware/searchValidator';

const router = Router();

router.route('/')
  .get(validateSearchQuery, getSearch);

export default router;