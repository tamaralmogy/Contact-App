import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import {
  getContactById,
  updateContactById,
  getContacts,
  deleteContactById,
} from "../api";
import { Contact } from "../types";

const SearchContact: React.FC<{
  onContactsUpdate: (contacts: Contact[]) => void;
}> = ({ onContactsUpdate }) => {
  const [searchId, setSearchId] = useState<string>("");
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editContact, setEditContact] = useState<Partial<Contact>>({});

  const handleSearch = async () => {
    try {
      console.log("Searching for contact with ID:", searchId);
      const response = await getContactById(parseInt(searchId));
      console.log("Contact found:", response.data);
      setContact(response.data);
      setEditContact(response.data);
      setError(null);
    } catch (error) {
      console.error("Contact not found");
      setContact(null);
      setError("User does not exist");
    }
  };

  const handleUpdate = async () => {
    if (contact) {
      try {
        console.log("Updating contact with ID:", contact.id);
        console.log("Updated contact details:", editContact);
        const response = await updateContactById(contact.id, editContact);
        console.log("Contact updated successfully:", response.data);
        setContact(response.data);
        setError(null);

        // Refresh the contact list
        const updatedContacts = await getContacts();
        onContactsUpdate(updatedContacts.data);
      } catch (error) {
        console.error("Failed to update contact");
        setError("Failed to update contact");
      }
    } else {
      console.warn("No contact selected for update");
    }
  };

  const handleDelete = async () => {
    if (contact) {
      try {
        console.log("Deleting contact with ID:", contact.id);
        await deleteContactById(contact.id);
        console.log("Contact deleted successfully");
        setContact(null);
        setError(null);

        // Refresh the contact list
        const updatedContacts = await getContacts();
        onContactsUpdate(updatedContacts.data);
      } catch (error) {
        console.error("Failed to delete contact");
        setError("Failed to delete contact");
      }
    } else {
      console.warn("No contact selected for deletion");
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 4 }}
    >
      <TextField
        label="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {contact && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body1">
            ID: {contact.id}, Name: {contact.firstName} {contact.lastName},
            Phone: {contact.phoneNumber}, Email: {contact.email}
          </Typography>
          <TextField
            label="First Name"
            value={editContact.firstName || ""}
            onChange={(e) =>
              setEditContact({ ...editContact, firstName: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            value={editContact.lastName || ""}
            onChange={(e) =>
              setEditContact({ ...editContact, lastName: e.target.value })
            }
          />
          <TextField
            label="Phone Number"
            value={editContact.phoneNumber || ""}
            onChange={(e) =>
              setEditContact({ ...editContact, phoneNumber: e.target.value })
            }
          />
          <TextField
            label="Email"
            value={editContact.email || ""}
            onChange={(e) =>
              setEditContact({ ...editContact, email: e.target.value })
            }
          />
          <Button variant="contained" onClick={handleUpdate}>
            Update Contact
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete Contact
          </Button>
        </Box>
      )}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SearchContact;
