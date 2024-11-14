import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import AddContactForm from "./AddContactForm";
import { NavbarProps } from "../types";

// Navbar component for managing header actions and adding contacts
const Navbar: React.FC<
  NavbarProps & {
    fetchContacts: () => void;
  }
> = ({ newContact, setNewContact, handleAddContact, fetchContacts }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleOpenForm = () => {
    // Resetting form fields
    setNewContact({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    });
    // Open the form
    setShowAddForm(true);
  };

  const handleShowAllContacts = () => {
    fetchContacts();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "lightgrey" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Contacts
        </Typography>

        <Button
          variant="contained"
          style={{
            backgroundColor: "green",
            color: "white",
          }}
          onClick={handleOpenForm}
        >
          Add New Contact
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleShowAllContacts}
          sx={{ marginLeft: 2 }}
        >
          Show All Contacts
        </Button>

        <Dialog open={showAddForm} onClose={() => setShowAddForm(false)}>
          <DialogContent>
            <AddContactForm
              newContact={newContact}
              setNewContact={setNewContact}
              handleAddContact={handleAddContact}
              onClose={() => setShowAddForm(false)}
            />
          </DialogContent>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
