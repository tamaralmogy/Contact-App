import React, { FC } from "react";
import {
  Button,
  TextField,
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ContactFormProps } from "../types";

// Functional component for adding a new contact
const AddContactForm: FC<ContactFormProps> = ({
  newContact,
  setNewContact,
  handleAddContact,
  onClose,
}) => {
  // A function for handling the addition of a new contact
  // Should be an async function since handles API requests
  const handleAdd = async () => {
    // Validation: Ensure all fields are filled
    if (
      !newContact.firstName ||
      !newContact.lastName ||
      !newContact.phoneNumber ||
      !newContact.email
    ) {
      alert("Please fill out all fields before submitting");
      return;
    }
    //  Sends the new contact back to App to handle API request
    const isSuccess = await handleAddContact(); // Wait for successful submission
    if (isSuccess) {
      onClose(); // Close the form if adding the contact was successful
    }
  };

  return (
    <>
      <DialogTitle>Add New Contact</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="First Name"
            fullWidth
            required
            margin="normal"
            value={newContact.firstName}
            onChange={(e) =>
              setNewContact({ ...newContact, firstName: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            fullWidth
            required
            margin="normal"
            value={newContact.lastName}
            onChange={(e) =>
              setNewContact({ ...newContact, lastName: e.target.value })
            }
          />
          <TextField
            label="Phone Number"
            fullWidth
            required
            margin="normal"
            value={newContact.phoneNumber}
            onChange={(e) =>
              setNewContact({ ...newContact, phoneNumber: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            required
            margin="normal"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd} color="primary" variant="contained">
          Add Contact
        </Button>
        <Button
          onClick={onClose}
          color="secondary"
          variant="contained"
          style={{
            backgroundColor: "green",
            color: "white",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export default AddContactForm;
