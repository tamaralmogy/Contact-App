import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Contact } from "../types";
// import { updateContactById } from "../api";

type EditContactProps = {
  contact: Contact;
  submitEdit: (updatedContact: Contact) => void;
  onCancel: () => void;
};

const EditContact: React.FC<EditContactProps> = ({
  contact,
  submitEdit,
  onCancel,
}) => {
  const [editContact, setEditContact] = useState<Partial<Contact>>(contact);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    // Validate that all fields are filled
    if (
      !editContact.firstName ||
      !editContact.lastName ||
      !editContact.phoneNumber ||
      !editContact.email
    ) {
      setError("All fields must be filled");
      return;
    }

    try {
      await submitEdit(editContact as Contact);
      setError(null);
      onCancel(); // Close the edit form after a successful update
    } catch (error) {
      console.error("Failed to update contact");
      setError("Failed to update contact");
    }
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="First Name"
            value={editContact.firstName || ""}
            onChange={(e) =>
              setEditContact({ ...editContact, firstName: e.target.value })
            }
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            value={editContact.lastName || ""}
            onChange={(e) =>
              setEditContact({ ...editContact, lastName: e.target.value })
            }
            fullWidth
            required
          />
          <TextField
            label="Phone Number"
            value={editContact.phoneNumber || ""}
            onChange={(e) =>
              setEditContact({ ...editContact, phoneNumber: e.target.value })
            }
            fullWidth
            required
          />
          <TextField
            label="Email"
            value={editContact.email || ""}
            onChange={(e) =>
              setEditContact({ ...editContact, email: e.target.value })
            }
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleUpdate}>
          Update Contact
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
      {/* Error message can be conditionally rendered */}
      {error && (
        <Typography variant="body1" color="error" sx={{ padding: 2 }}>
          {error}
        </Typography>
      )}
    </Dialog>
  );
};

export default EditContact;
