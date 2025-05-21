import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

const StyledTextField = styled(TextField)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
});

interface InputFieldProps {
  name?: string;
  value?: string;
  onChangeHandler?: (name: string, value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autofocus?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name = 'text_field_name',
  value = '',
  onChangeHandler = () => {},
  onBlur = () => {},
  error = false,
  disabled = false,
  placeholder = '',
  autofocus = false,
}) => {
  return (
    <StyledTextField
      name={name}
      value={value}
      onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
      onBlur={onBlur}
      error={error}
      disabled={disabled}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      fullWidth
      autoComplete="off"
      inputProps={{
        autoComplete: 'off',
      }}
      autoFocus={autofocus}
    />
  );
};

export default InputField;
