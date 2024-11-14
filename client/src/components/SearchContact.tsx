import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
// import ContactList from "./ContactList";
import { getContactById } from "../api";
import { Contact } from "../types";

type SearchContactProps = {
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  searchedContact: Contact | null;
  setSearchedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
};

const SearchContact: React.FC<SearchContactProps> = ({
  onEdit,
  onDelete,
  searchedContact,
  setSearchedContact,
}) => {
  const [searchId, setSearchId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const handleSearch = async () => {
    try {
      const response = await getContactById(parseInt(searchId));
      setSearchedContact(response.data);
      setError(null);
    } catch (error) {
      setSearchedContact(null);
      setError("User does not exist");
    }
  };

  const handleClose = () => {
    setSearchedContact(null);
    setError(null);
    setSearchId("");
  };

  // // Handle single contact update
  // const handleSingleContactUpdate = (updatedContact: Contact) => {
  //   if (contact && contact.id === updatedContact.id) {
  //     setContact(updatedContact);
  //   }
  // };

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
      {searchedContact && (
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
                <TableRow key={searchedContact.id}>
                  <TableCell>{searchedContact.id}</TableCell>
                  <TableCell>{searchedContact.firstName}</TableCell>
                  <TableCell>{searchedContact.lastName}</TableCell>
                  <TableCell>{searchedContact.phoneNumber}</TableCell>
                  <TableCell>{searchedContact.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onEdit(searchedContact)}
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => onDelete(searchedContact)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            Close
          </Button>
        </Box>
      )}
      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default SearchContact;
