import {Router} from 'express';
import {getContactsController, getContactsByIdController, addContactController, updateContactByIdController, deleteContactByIdController} from "..//controllers/contacts.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";
import { validateBody } from '../utils/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { contactAddSchema, contactUpdateSchema } from '../validation/contacts.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId',
  isValidId("contactId"),
  ctrlWrapper(getContactsByIdController)
);

contactsRouter.post('/',
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController)
);

contactsRouter.patch('/:contactId',
  isValidId("contactId"),
  upload.single('photo'),
  validateBody(contactUpdateSchema),
  ctrlWrapper(updateContactByIdController)
);

contactsRouter.delete('/:contactId',
  isValidId("contactId"),
  ctrlWrapper(deleteContactByIdController)
);

export default contactsRouter;