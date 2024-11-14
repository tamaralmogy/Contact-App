export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface Update {
  id: number; // Ensures we know which contact we want to update
  // Optional for flexibility and ease of use, allows handling partial updates & operations that require only the id
  updates?: Contact;
}

// Each Action type has a specific payload type
export type Action =
  | { type: "ADD_CONTACT"; payload: Contact }
  | { type: "UPDATE_CONTACT"; payload: Update }
  | { type: "DELETE_CONTACT"; payload: Contact }
  | { type: "SET_CONTACTS"; payload: Contact[] };

// Common props for managing a new contact
export type NewContactProps = {
  newContact: Omit<Contact, "id">; // An object representing the contact being created (without the ID)
  setNewContact: React.Dispatch<React.SetStateAction<Omit<Contact, "id">>>; // Function to update specific fields in the newContact state
  handleAddContact: () => Promise<boolean>; // Function to handle adding a new contact, returns a success indicator for async operations
};

// Props for the Contact Form component
export type ContactFormProps = NewContactProps & {
  onClose: () => void; // Function to close the Add Contact form dialog
};

// Props for the Navbar component
export type NavbarProps = NewContactProps & {
  // setShowContacts: (show: boolean) => void; // Function to manage contact visibility
  // dispatch: React.Dispatch<any>; // Dispatch function to update the contact list
};
