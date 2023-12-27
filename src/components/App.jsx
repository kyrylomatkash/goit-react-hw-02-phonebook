// Імпорт
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './phonebook-component/ContactForm';
import ContactList from './phonebook-component/ContactList';
import EditContact from './phonebook-component/Edit';
import styled from 'styled-components';
import {
  Container,
  Typography,
  Snackbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Input,
} from '@mui/material';
import Alert from '@mui/material/Alert';
// Стилізація контейнеру і елементів додаку
const AppContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled(Typography)`
  font-size: 28px;
  margin-bottom: 20px;
`;

const ErrorText = styled(Typography)`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const SearchInput = styled(Input)`
  && {
    margin-bottom: 15px;
    width: 200px;
  }
`;

const AddButton = styled(Button)`
  && {
    margin-top: 15px;
    background-color: #4caf50;
    color: white;
    &:hover {
      background-color: #45a049;
    }
  }
`;
// Основна функція застосунку
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [editContact, setEditContact] = useState(null);
  const [isContactExistsModalOpen, setContactExistsModalOpen] = useState(false);
  // Додавання контакту
  const addContact = () => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      setContactExistsModalOpen(true);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    if (name.trim() !== '' && number.trim() !== '') {
      setContacts(prevContacts => [...prevContacts, newContact]);
      setName('');
      setNumber('');
      setError('');
      setSnackbarMessage('Contact added successfully');
      setSnackbarOpen(true);
    }
  };
  // Видалення контакту
  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
    setSnackbarMessage('Contact deleted successfully');
    setSnackbarOpen(true);
  };
  // Логіка редагування контакту
  const handleEditClick = contact => {
    setEditContact(contact);
  };

  const handleSaveEdit = editedContact => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === editedContact.id ? editedContact : contact
      )
    );
    setEditContact(null);
    setSnackbarMessage('Contact edited successfully');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleContactExistsModalClose = () => {
    setContactExistsModalOpen(false);
  };

  return (
    <AppContainer>
      <Heading variant="h1">Phonebook</Heading>
      {error && <ErrorText>{error}</ErrorText>}
      <ContactForm
        name={name}
        setName={setName}
        number={number}
        setNumber={setNumber}
        addContact={addContact}
      />
      <Typography variant="h2">Contacts</Typography>
      <SearchInput
        type="text"
        name="filter"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Search contacts..."
      />
      <ContactList
        contacts={contacts}
        filter={filter}
        deleteContact={deleteContact}
        handleEditClick={handleEditClick}
      />
      <AddButton
        variant="contained"
        onClick={addContact}
        disabled={name.trim() === '' || number.trim() === ''}
      >
        Add Contact
      </AddButton>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {editContact && (
        <EditContact
          contact={editContact}
          handleSaveEdit={handleSaveEdit}
          handleClose={() => setEditContact(null)}
        />
      )}

      <Dialog
        open={isContactExistsModalOpen}
        onClose={handleContactExistsModalClose}
      >
        <DialogTitle>Contact Exists</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A contact with the name <strong>{name}</strong> already exists.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContactExistsModalClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </AppContainer>
  );
};
// Експорт
export default App;
