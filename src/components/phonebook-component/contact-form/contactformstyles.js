import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';

export const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 15px;

  &:hover {
    background-color: #f0f0f0; // Light background on hover
  }

  &:focus {
    border-color: #2196f3; // Highlight border on focus
  }
`;

export const AlertContainer = styled('div')`
  margin: 10px 0;
  background-color: #ffcccc;
`;
