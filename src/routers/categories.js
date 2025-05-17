import { Router } from 'express';
import { getCategories } from '../controllers/categories.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);

export default categoriesRouter;