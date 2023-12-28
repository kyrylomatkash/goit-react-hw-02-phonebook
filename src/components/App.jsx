import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './phonebook-component/contact-form/ContactForm';
import ContactList from './phonebook-component/contact-list/ContactList';
import EditContact from './phonebook-component/edit-contact/Edit';
import DeleteConfirmationModal from './phonebook-component/delete-contact/Delete';
import {
  AppContainer,
  Heading,
  ErrorText,
  SearchInput,
  AddButton,
} from './appstyles';
import {
  Typography,
  Snackbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Alert from '@mui/material/Alert';

class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
    error: '',
    snackbarOpen: false,
    snackbarMessage: '',
    editContact: null,
    isContactExistsModalOpen: false,
    isDeleteConfirmationModalOpen: false,
    contactToDelete: null,
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  addContact = () => {
    const { contacts, name, number } = this.state;

    if (name.trim() === '' || number.trim() === '') {
      // Show alert if either name or number is empty
      this.setState({
        error: 'Please fill in both name and number.',
      });
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      this.setState({ isContactExistsModalOpen: true });
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
      error: '',
      snackbarMessage: 'Contact added successfully',
      snackbarOpen: true,
    }));
  };

  deleteContact = contactId => {
    this.setState({
      isDeleteConfirmationModalOpen: true,
      contactToDelete: contactId,
    });
  };

  handleDeleteConfirmation = () => {
    const { contactToDelete } = this.state;
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== contactToDelete
      ),
      isDeleteConfirmationModalOpen: false,
      snackbarMessage: 'Contact deleted successfully',
      snackbarOpen: true,
    }));
  };

  handleCloseDeleteConfirmationModal = () => {
    this.setState({
      isDeleteConfirmationModalOpen: false,
      contactToDelete: null,
    });
  };

  handleEditClick = contact => {
    this.setState({ editContact: contact });
  };

  handleSaveEdit = editedContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.map(contact =>
        contact.id === editedContact.id ? editedContact : contact
      ),
      editContact: null,
      snackbarMessage: 'Contact edited successfully',
      snackbarOpen: true,
    }));
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  handleContactExistsModalClose = () => {
    this.setState({ isContactExistsModalOpen: false });
  };

  render() {
    const {
      contacts,
      name,
      number,
      filter,
      error,
      snackbarOpen,
      snackbarMessage,
      editContact,
      isContactExistsModalOpen,
      isDeleteConfirmationModalOpen,
    } = this.state;

    return (
      <AppContainer>
        <Heading variant="h1">Phonebook</Heading>
        {error && <ErrorText>{error}</ErrorText>}
        <ContactForm
          name={name}
          setName={newName => this.handleChange('name', newName)}
          number={number}
          setNumber={newNumber => this.handleChange('number', newNumber)}
          addContact={this.addContact}
        />
        <Typography variant="h2">Contacts</Typography>
        <SearchInput
          type="text"
          name="filter"
          value={filter}
          onChange={e => this.handleChange('filter', e.target.value)}
          placeholder="Search contacts..."
        />
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={this.deleteContact}
          handleEditClick={this.handleEditClick}
        />
        <AddButton
          variant="contained"
          onClick={this.addContact}
          disabled={name.trim() === '' || number.trim() === ''}
        >
          Add Contact
        </AddButton>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {editContact && (
          <EditContact
            contact={editContact}
            handleSaveEdit={this.handleSaveEdit}
            handleClose={() => this.setState({ editContact: null })}
          />
        )}

        <DeleteConfirmationModal
          open={isDeleteConfirmationModalOpen}
          handleClose={this.handleCloseDeleteConfirmationModal}
          handleConfirmation={this.handleDeleteConfirmation}
        />

        <Dialog
          open={isContactExistsModalOpen}
          onClose={this.handleContactExistsModalClose}
        >
          <DialogTitle>Contact Exists</DialogTitle>
          <DialogContent>
            <DialogContentText>
              A contact with the name <strong>{name}</strong> already exists.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleContactExistsModalClose}
              color="primary"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </AppContainer>
    );
  }
}

export default App;
