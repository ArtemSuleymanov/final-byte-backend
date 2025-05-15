import { Contact } from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { sortList } from '../constants/index.js';

export const getContacts = async ({ page = 1, perPage = 10, sortBy = "_id", sortOrder = sortList[0], filters = {}, userId }) => {
  const skip = (page - 1) * perPage;

  const query = { ...filters, userId };

  const contacts = await Contact.find(query).skip(skip).limit(perPage).sort({ [sortBy]: sortOrder });
  const totalItems = await Contact.countDocuments(query);

  const paginationData = calculatePaginationData({ page, perPage, totalItems });

  return {
    contacts,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const addContact = async (payload) => {
  return await Contact.create(payload); 
};

export const updateContactById = async (id, payload, userId) => {
  return await Contact.findOneAndUpdate(
    { _id: id, userId },
    payload,
    { new: true }
  );
};

export const deleteContactById = async (id, userId) => {
  return await Contact.findOneAndDelete({ _id: id, userId });
};