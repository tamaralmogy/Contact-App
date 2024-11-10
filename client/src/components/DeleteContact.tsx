import React from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { deleteContactById, getContacts } from "../api";
import { Contact } from "../types";

type DeleteContactProps = {
  contactId: number;
  onContactsUpdate: (contacts: Contact[]) => void;
  onCancel: () => void;
};

const DeleteContact: React.FC<DeleteContactProps> = ({
  contactId,
  onContactsUpdate,
  onCancel,
}) => {
  const handleDelete = async () => {
    try {
      console.log("Deleting contact with ID:", contactId);
      await deleteContactById(contactId);
      console.log("Contact deleted successfully");

      // Refresh the contact list
      const updatedContacts = await getContacts();
      onContactsUpdate(updatedContacts.data);
      onCancel();
    } catch (error) {
      console.error("Failed to delete contact");
    }
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Delete Contact</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this contact?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteContact;
