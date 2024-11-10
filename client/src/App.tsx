import React, { useEffect, useState, useReducer } from "react";
import { addContact } from "./api";
import ContactList from "./components/ContactList";
import SearchContact from "./components/SearchContact";
import EditContact from "./components/EditContact";
import DeleteContact from "./components/DeleteContact";
import Navbar from "./components/Navbar";
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
  const [showContacts, setShowContacts] = useState(false); // Moved the control to Navbar
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContactId, setDeletingContactId] = useState<number | null>(
    null
  );

  const handleAddContact = async () => {
    try {
      const response = await addContact(newContact);
      dispatch({ type: "ADD_CONTACT", payload: response.data });
      return true; // Indicate success & form is cleared
    } catch (error) {
      console.error("Failed to add contact:", error);
      return false; // Indicate failure
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = (id: number) => {
    setDeletingContactId(id);
  };

  const handleContactsUpdate = (updatedContacts: Contact[]) => {
    dispatch({ type: "SET_CONTACTS", payload: updatedContacts });
  };

  const resetEdit = () => {
    setEditingContact(null);
  };

  const resetDelete = () => {
    setDeletingContactId(null);
  };

  return (
    <>
      <Navbar
        newContact={newContact}
        setNewContact={setNewContact}
        handleAddContact={handleAddContact}
        setShowContacts={setShowContacts} // Pass setShowContacts to Navbar
        dispatch={dispatch} // Pass dispatch to Navbar
      />
      <Container>
        <SearchContact
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />
        {showContacts && (
          <ContactList
            contacts={contacts}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
            onClose={() => setShowContacts(false)}
          />
        )}
        {editingContact && (
          <EditContact
            contact={editingContact}
            onContactsUpdate={handleContactsUpdate}
            onCancel={resetEdit}
          />
        )}
        {deletingContactId !== null && (
          <DeleteContact
            contactId={deletingContactId}
            onContactsUpdate={handleContactsUpdate}
            onCancel={resetDelete}
          />
        )}
      </Container>
    </>
  );
};

export default App;
