import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ContactFormProps } from "../types";

const AddContactForm: React.FC<ContactFormProps> = ({
  newContact,
  setNewContact,
  handleAddContact,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    handleAddContact();
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add New Contact
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="First Name"
              value={newContact.firstName}
              onChange={(e) =>
                setNewContact({ ...newContact, firstName: e.target.value })
              }
            />
            <TextField
              label="Last Name"
              value={newContact.lastName}
              onChange={(e) =>
                setNewContact({ ...newContact, lastName: e.target.value })
              }
            />
            <TextField
              label="Phone Number"
              value={newContact.phoneNumber}
              onChange={(e) =>
                setNewContact({ ...newContact, phoneNumber: e.target.value })
              }
            />
            <TextField
              label="Email"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>
            Add Contact
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddContactForm;
