# My Contacts Application

This is a simple contact management application built with React, Express, and Node.js. The app allows you to add, edit, delete, and search for contacts using a RESTful API. Below is a detailed description of the project structure and its components.

## Project Structure

The project is divided into two main parts: the **client** (frontend) and the **server** (backend).

### 1. Client (Frontend)

The client side is built using **React** and **Material UI** for the user interface. Here is the directory structure for the client:

```
client/
|-- public/
|-- src/
    |-- components/
        |-- AddContactForm.tsx
        |-- ContactList.tsx
        |-- DeleteContact.tsx
        |-- EditContact.tsx
        |-- Navbar.tsx
        |-- SearchContact.tsx
    |-- reducers/
        |-- contactReducer.ts
    |-- App.tsx
    |-- api.ts
    |-- types.ts
    |-- index.tsx
```

#### Components

- **AddContactForm.tsx**: Component for adding a new contact. The form pops up in a dialog and allows the user to input contact details.
- **ContactList.tsx**: Displays the list of contacts in a table format, with options to edit or delete each contact.
- **DeleteContact.tsx**: A component that prompts the user to confirm the deletion of a contact.
- **EditContact.tsx**: Component for editing an existing contact. Displays the contact details in a dialog for easy editing.
- **Navbar.tsx**: Contains the navigation bar, including the "Add New Contact" and "Show All Contacts" buttons.
- **SearchContact.tsx**: Allows the user to search for a specific contact by ID and displays the result in table format.

#### Other Files

- **contactReducer.ts**: Reducer that manages the state of the contacts. Handles actions like adding, updating, deleting, and setting contacts.
- **api.ts**: Contains the API functions for interacting with the server, including fetching, adding, updating, and deleting contacts.
- **types/index.ts**: Type definitions for contacts and other components.
- **App.tsx**: The main application component. Manages state and renders other components like the Navbar, ContactList, and forms.
- **index.tsx**: The entry point of the React application.

### 2. Server (Backend)

The server side is built with **Express** and **Node.js**. It serves as the API for the frontend, handling CRUD operations for contacts.

```
server/
|-- index.ts
```

#### Server Structure

- **index.ts**: The main server file. It sets up an Express server with RESTful API endpoints:
  - **GET /api/contacts**: Fetch all contacts.
  - **POST /api/contacts**: Create a new contact.
  - **GET /api/contacts/:id**: Fetch a contact by its ID.
  - **PUT /api/contacts/:id**: Update a contact by its ID.
  - **DELETE /api/contacts/:id**: Delete a contact by its ID.

The server uses an in-memory store to manage the contact data for simplicity.

### How to Run the Application

#### Prerequisites

- **Node.js** and **npm** should be installed on your machine.

#### Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the application:

   ```bash
   npm start
   ```

   The server will be running on [http://localhost:5000](http://localhost:5000).

   The client will be running on [http://localhost:3000](http://localhost:3000).

### Technologies Used

- **Frontend**: React, Material UI
- **Backend**: Express, Node.js
- **State Management**: React `useReducer`

### Features

- **Add Contact**: Add a new contact with first name, last name, phone number, and email.
- **Edit Contact**: Edit an existing contact's details.
- **Delete Contact**: Delete a contact from the list.
- **Search Contact**: Search for a contact by ID.
- **View All Contacts**: Display all contacts in a table format.

### Future Improvements

- Add persistent storage using a database like PostgreSQL.
- Add validation for input fields (e.g., phone number should be numbers only, email should contain `@`).
- Improve UI/UX design for a more polished look.
