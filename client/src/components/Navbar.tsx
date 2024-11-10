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
import { getContacts } from "../api"; // Import getContacts for fetching contacts

// Navbar component for managing header actions and adding contacts
const Navbar: React.FC<
  NavbarProps & {
    setShowContacts: (show: boolean) => void;
    dispatch: React.Dispatch<any>;
  }
> = ({
  newContact,
  setNewContact,
  handleAddContact,
  setShowContacts,
  dispatch,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showContacts, setLocalShowContacts] = useState(false); // Manage local visibility of contacts

  const handleOpenForm = () => {
    setNewContact({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    }); // Resetting form fields
    setShowAddForm(true);
  };

  const handleShowAllContacts = () => {
    setLocalShowContacts(true);
    setShowContacts(true); // Let App know to show the contact list
  };

  // useEffect to fetch contacts when "Show All Contacts" is clicked
  useEffect(() => {
    if (showContacts) {
      getContacts().then((response) => {
        dispatch({ type: "SET_CONTACTS", payload: response.data });
      });
    }
  }, [showContacts, dispatch]);

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
