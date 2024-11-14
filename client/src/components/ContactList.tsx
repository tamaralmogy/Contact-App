import React from "react";
import { Contact } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";

// Receives an array of contacts to display
// A function to trigger editing of a selected contact
// A function to delete a contact
// A function to close the contact list
type ContactListProps = {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onClose: () => void;
};

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onEdit,
  onDelete,
  onClose,
}) => {
  return (
    <Box sx={{ marginBottom: 4 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                First Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Last Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Phone Number
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.id}</TableCell>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(contact)}
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(contact)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="secondary"
        onClick={onClose}
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        Close
      </Button>
    </Box>
  );
};

export default ContactList;
