// Імпорт бібліотек
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
// Імпорт стилів
import {
  StyledForm,
  StyledTextField,
  AlertContainer,
} from './contactformstyles';
import Alert from '@mui/material/Alert';
// Основний клас застосунку
class ContactForm extends Component {
  state = {
    showAlert: false,
  };

  handleAddContact = e => {
    e.preventDefault();
    const { name, number, addContact } = this.props;

    if (name.trim() === '' || number.trim() === '') {
      this.setState({ showAlert: true });
      return;
    }

    addContact({
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    });
    this.setState({ showAlert: false });
  };

  handleCloseAlert = () => {
    this.setState({ showAlert: false });
  };
  // Рендер
  render() {
    const { name, setName, number, setNumber } = this.props;
    const { showAlert } = this.state;

    return (
      <StyledForm onSubmit={this.handleAddContact}>
        <StyledTextField
          label="Name"
          variant="outlined"
          sx={{ width: '350px', marginBottom: '10px' }}
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <StyledTextField
          label="Number"
          variant="outlined"
          type="tel"
          sx={{ width: '350px', marginBottom: '10px' }}
          value={number}
          onChange={e => setNumber(e.target.value)}
          required
        />
        {showAlert && (
          <AlertContainer>
            <Alert severity="error" onClose={this.handleCloseAlert}>
              Please fill in both name and number.
            </Alert>
          </AlertContainer>
        )}
      </StyledForm>
    );
  }
}
// Експорт
export default ContactForm;
