// Filter.js
import React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const StyledFilter = styled(TextField)`
  margin-bottom: 16px;
`;

const Filter = ({ value, onChangeFilter }) => {
  return (
    <StyledFilter
      label="Filter contacts by name"
      type="text"
      value={value}
      onChange={e => onChangeFilter(e.target.value)}
      variant="outlined"
    />
  );
};

export default Filter;
