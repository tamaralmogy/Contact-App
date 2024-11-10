import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import ContactList from "./ContactList";
import { getContactById } from "../api";
import { Contact } from "../types";

type SearchContactProps = {
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
};

const SearchContact: React.FC<SearchContactProps> = ({ onEdit, onDelete }) => {
  const [searchId, setSearchId] = useState<string>("");
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const response = await getContactById(parseInt(searchId));
      setContact(response.data);
      setError(null);
    } catch (error) {
      setContact(null);
      setError("User does not exist");
    }
  };

  // Handle single contact update
  const handleSingleContactUpdate = (updatedContact: Contact) => {
    if (contact && contact.id === updatedContact.id) {
      setContact(updatedContact);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: 4,
        marginBottom: 4,
      }}
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
        <ContactList
          contacts={[contact]}
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={() => setContact(null)} // Add a close button for the searched contact
        />
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
