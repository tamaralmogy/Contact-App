import axios from "axios";
import { Contact } from "./types";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Fetch all contacts
export const getContacts = () => api.get("/contacts");
// Add a new contact
export const addContact = (contact: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}) => api.post("/contacts", contact);
// Get a contact by his ID
export const getContactById = (id: number) => api.get(`/contacts/${id}`);
// Update contact by his ID
export const updateContactById = (id: number, updates: Partial<Contact>) =>
  api.put(`/contacts/${id}`, updates);
// Delete a contact by his ID
export const deleteContactById = (id: number) => api.delete(`/contacts/${id}`);
