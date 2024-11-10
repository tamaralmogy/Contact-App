import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

type HeaderProps = {
  onAddContactClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onAddContactClick }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Contacts
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={onAddContactClick}
        >
          Add New Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
