import { Contact, Action, Update } from "../types";

export const contactReducer = (state: Contact[], action: Action): Contact[] => {
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload as Contact];
    case "SET_CONTACTS":
      return action.payload as Contact[];
    case "UPDATE_CONTACT":
      return state.map((contact) =>
        contact.id === (action.payload as Update).id
          ? { ...contact, ...(action.payload as Update).updates }
          : contact
      );
    case "DELETE_CONTACT":
      return state.filter(
        (contact) => contact.id !== (action.payload as Contact).id
      );

    default:
      return state;
  }
};
