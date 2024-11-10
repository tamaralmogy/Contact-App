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

type ContactListProps = {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
  onClose: () => void; // New prop for closing the contact list
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
                    onClick={() => onDelete(contact.id)}
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
