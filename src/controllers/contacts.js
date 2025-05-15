import { getContacts, getContactById, addContact, updateContactById, deleteContactById } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactSortFields } from '../db/models/Contact.js';
import { parseFilterParams } from '../utils/filters/parseFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactSortFields);
  const filters = parseFilterParams(req.query);

  const { contacts, ...pagination } = await getContacts({
    ...paginationParams,
    ...sortParams,
    filters,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,  
      ...pagination    
    }
  });
};

  export const getContactsByIdController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const contact = await getContactById(contactId, userId);
  
    if (!contact) {
      throw createHttpError(404, "Contact not found");
    }
  
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  };

  export const addContactController = async(req,res) =>{
    const { _id: userId } = req.user;
    let photoUrl = null;

    if (req.file) {
      photoUrl = await saveFileToCloudinary(req.file);  
    }

    const data = await addContact({ ...req.body, userId, photo: photoUrl });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data,
    });
  };

  export const updateContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const updateData = {...req.body};

    if (req.file) {
      updateData.photo = await saveFileToCloudinary(req.file);  
    }
  
    const updatedContact = await updateContactById(contactId, updateData, userId);
  
    if (!updatedContact) {
      throw createHttpError(404, "Contact not found");
    }
  
    res.json({
      status: 200,
      message: "Successfully patched a contact!",
      data: updatedContact,
    });
  };

  export const deleteContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
  
    const deletedContact = await deleteContactById(contactId, userId);
  
    if (!deletedContact) {
      throw createHttpError(404, "Contact not found");
    }
  
    res.status(204).send();
  };