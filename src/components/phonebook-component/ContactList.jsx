// Імпорт
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';

const ContactListContainer = styled.div`
  margin-top: 20px;
`;
// Функція листу контактів
const ContactList = ({ contacts, filter, deleteContact, handleEditClick }) => {
  const [editContact, setEditContact] = useState(null);

  const handleDeleteConfirmationClose = () => {
    setEditContact(null);
  };
  // Видалення контакту
  const handleDeleteContact = contact => {
    deleteContact(contact.id);
    handleDeleteConfirmationClose();
  };
  // Пошук контакту
  const filteredContacts = contacts
    .filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ContactListContainer>
      {filteredContacts.length > 0 ? (
        <List>
          {filteredContacts.map(contact => (
            <ListItem key={contact.id}>
              {contact.name} - {contact.number}
              <Button
                onClick={() => handleEditClick(contact)}
                sx={{ marginRight: '8px' }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteContact(contact)}
                sx={{ backgroundColor: '#ff6666' }}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>There are no contacts.</p>
      )}

      {editContact && (
        <Dialog
          open={true}
          onClose={handleDeleteConfirmationClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Contact</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the details of {editContact.name}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteConfirmationClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </ContactListContainer>
  );
};
// Експорт
export default ContactList;
