import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import ctrlWrapper from '../middlewares/ctrlWrapper.js';
import { getUserController } from '../controllers/users.js';


const UsersRouter = Router();

UsersRouter.get('/user', authenticate, ctrlWrapper(getUserController));
export default UsersRouter;