// Імпорт
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';
// Стилізація
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 15px;

  &:hover {
    background-color: #f0f0f0; // Light background on hover
  }

  &:focus {
    border-color: #2196f3; // Highlight border on focus
  }
`;
// Функція контактної форми для даних контакту
const ContactForm = ({ name, setName, number, setNumber, addContact }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleAddContact = e => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      setShowAlert(true);
      return;
    }

    addContact();
    setShowAlert(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <StyledForm onSubmit={handleAddContact}>
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
        <Alert
          severity="error"
          onClose={handleCloseAlert}
          sx={{ margin: '10px 0', backgroundColor: '#ffcccc' }}
        >
          Please fill in both name and number.
        </Alert>
      )}
    </StyledForm>
  );
};
// Експорт
export default ContactForm;
