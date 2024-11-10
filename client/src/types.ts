export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface Update {
  id: number;
  updates?: Contact;
}

export interface Action {
  type: "ADD_CONTACT" | "UPDATE_CONTACT" | "DELETE_CONTACT" | "SET_CONTACTS";
  payload: Contact | Update | Contact[];
}

export type ContactFormProps = {
  newContact: Omit<Contact, "id">;
  setNewContact: React.Dispatch<React.SetStateAction<Omit<Contact, "id">>>;
  handleAddContact: () => void;
};
