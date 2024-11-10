import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

// Middleware setup
app.use(cors());
app.use(express.json());

// In-memory store to hold contact data
let contacts: Array<{
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}> = [];
// let id = 1;

// Fetch all contacts
app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

// Create a new contact
app.post("/api/contacts", (req, res) => {
  const newContact = req.body;
  const contactWithId = {
    id: Math.floor(Math.random() * 1000000),
    ...newContact,
  };

  //   id += 1;
  contacts.push(contactWithId);
  res.status(201).json(contactWithId);
});

// Get a single contact by ID
app.get("/api/contacts/:id", (req, res) => {
  const contactId = parseInt(req.params.id);
  const contact = contacts.find((c) => c.id === contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send("Contact not found");
  }
});

// Update a contact by ID
app.put("/api/contacts/:id", (req, res) => {
  const contactId = parseInt(req.params.id);
  const contactIndex = contacts.findIndex((c) => c.id === contactId);
  if (contactIndex !== -1) {
    contacts[contactIndex] = { ...contacts[contactIndex], ...req.body };
    res.json(contacts[contactIndex]);
  } else {
    res.status(404).send("Contact not found");
  }
});

// Delete a contact by ID
app.delete("/api/contacts/:id", (req, res) => {
  const contactId = parseInt(req.params.id);
  const contactIndex = contacts.findIndex((c) => c.id === contactId);
  if (contactIndex !== -1) {
    const deletedContact = contacts.splice(contactIndex, 1);
    res.json(deletedContact);
  } else {
    res.status(404).send("Contact not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
