import React, { useEffect, useState, useReducer } from "react";
import {
  addContact,
  getContacts,
  updateContactById,
  deleteContactById,
} from "./api";
import ContactList from "./components/ContactList";
import SearchContact from "./components/SearchContact";
import EditContact from "./components/EditContact";
import DeleteContact from "./components/DeleteContact";
import Navbar from "./components/Navbar";
import { Contact } from "./types";
import { contactReducer } from "./reducers/contactReducer";
import { Container, Typography } from "@mui/material";

const App: React.FC = () => {
  // The contacts state is managed by userReducer with the contactReducer function
  // Initial state is empty array
  // Will hold all contacts
  const [contacts, dispatch] = useReducer(contactReducer, []);

  // Store the details of the new contact without the ID that will be generated later
  const [newContact, setNewContact] = useState<Omit<Contact, "id">>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const [showContacts, setShowContacts] = useState(false); // Moved the control to Navbar
  // Keep track of the contact that is currently edited
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);
  const [searchedContact, setSearchedContact] = useState<Contact | null>(null);

  const handleAddContact = async () => {
    const response = await safelyAddContact(newContact);
    if (response) {
      addContactsState(response.data);
      return true;
    }
    return false;
  };

  const safelyAddContact = async (contact: Omit<Contact, "id">) => {
    try {
      return await addContact(contact);
    } catch (error) {
      console.error("Falied to add contact:", error);
      return null;
    }
  };

  const addContactsState = (contactData: Contact) => {
    dispatch({ type: "ADD_CONTACT", payload: contactData });
  };

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      dispatch({ type: "SET_CONTACTS", payload: response.data });
      setShowContacts(true); // Control Contact List visibility
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  const updateContactInState = (updatedContact: Contact) => {
    dispatch({
      type: "UPDATE_CONTACT",
      payload: { id: updatedContact.id, updates: updatedContact },
    });
  };

  const submitEdit = async (updatedContact: Contact) => {
    try {
      const response = await updateContactById(
        updatedContact.id,
        updatedContact
      );
      updateContactInState(response.data);
      // Update the searched contact if it matches the updated contact
      if (searchedContact && searchedContact.id === response.data.id) {
        setSearchedContact(response.data);
      }
      resetEdit();
    } catch (error) {
      console.error("Failed to update contact");
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = (contact: Contact) => {
    setDeletingContact(contact);
  };

  const removeContactFromState = async (contact: Contact) => {
    try {
      await deleteContactById(contact.id);
      dispatch({ type: "DELETE_CONTACT", payload: contact });

      // Clear the searched contact if it matches the deleted contact
      if (searchedContact && searchedContact.id === contact.id) {
        setSearchedContact(null);
      }
      setDeletingContact(null);
    } catch (error) {
      console.error("Failed to delete contact");
    }
  };

  // const handleContactsUpdate = (updatedContacts: Contact[]) => {
  //   dispatch({ type: "SET_CONTACTS", payload: updatedContacts });
  // };

  const resetEdit = () => {
    setEditingContact(null);
  };

  const resetDelete = () => {
    setDeletingContact(null);
  };

  return (
    <>
      <Navbar
        // Adding New Contacts functionality
        newContact={newContact}
        setNewContact={setNewContact}
        handleAddContact={handleAddContact}
        // Showing Contacts List functionality
        fetchContacts={fetchContacts}
      />
      <Container>
        <SearchContact
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          searchedContact={searchedContact}
          setSearchedContact={setSearchedContact}
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
            submitEdit={submitEdit}
            onCancel={resetEdit}
          />
        )}
        {deletingContact !== null && (
          <DeleteContact
            contact={deletingContact}
            removeContactFromState={removeContactFromState}
            onCancel={resetDelete}
          />
        )}
      </Container>
    </>
  );
};

export default App;
