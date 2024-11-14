import React from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { deleteContactById } from "../api";
import { Contact } from "../types";

type DeleteContactProps = {
  contact: Contact;
  removeContactFromState: (contact: Contact) => void;
  onCancel: () => void;
};

const DeleteContact: React.FC<DeleteContactProps> = ({
  contact,
  removeContactFromState,
  onCancel,
}) => {
  const handleDelete = async () => {
    try {
      await deleteContactById(contact.id);
      removeContactFromState(contact);
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
