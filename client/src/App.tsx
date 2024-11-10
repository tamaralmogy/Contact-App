import React, { useEffect, useState, useReducer } from "react";
import {
  getContacts,
  addContact,
  deleteContactById,
  updateContactById,
} from "./api";
import ContactList from "./components/ContactList";
import AddContactForm from "./components/AddContactForm";
import SearchContact from "./components/SearchContact";
import { Contact } from "./types";
import { contactReducer } from "./reducers/contactReducer";
import { Container, Typography } from "@mui/material";

const App: React.FC = () => {
  const [contacts, dispatch] = useReducer(contactReducer, []);
  const [newContact, setNewContact] = useState<Omit<Contact, "id">>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    getContacts().then((response) => {
      response.data.forEach((contact: Contact) => {
        dispatch({ type: "ADD_CONTACT", payload: contact });
      });
    });
  }, []);

  const handleAddContact = () => {
    addContact(newContact).then((response) => {
      dispatch({ type: "ADD_CONTACT", payload: response.data });
      setNewContact({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
      });
    });
  };

  const handleContactsUpdate = (updatedContacts: Contact[]) => {
    dispatch({ type: "SET_CONTACTS", payload: updatedContacts });
  };
  const handleEditContact = (contact: Contact) => {
    // Logic to populate the form fields for editing
    setNewContact({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    });

    // Optionally, you could scroll or trigger the AddContactForm to be shown for editing
  };

  const handleDeleteContact = (id: number) => {
    deleteContactById(id).then(() => {
      // Refresh the contact list
      getContacts().then((response) => {
        handleContactsUpdate(response.data);
      });
    });
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Contact List
      </Typography>
      <SearchContact onContactsUpdate={handleContactsUpdate} />
      <ContactList
        contacts={contacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
      <Typography variant="h5" gutterBottom>
        Add New Contact
      </Typography>
      <AddContactForm
        newContact={newContact}
        setNewContact={setNewContact}
        handleAddContact={handleAddContact}
      />
    </Container>
  );
};

export default App;
