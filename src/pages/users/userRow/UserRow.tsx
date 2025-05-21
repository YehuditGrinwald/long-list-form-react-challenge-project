import { Grid } from '@mui/material';
import { memo, useState } from 'react';
import styles from '../users.module.css';
// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import { User } from '../../../types/usersTypes';
interface FieldState {
  value: string;
  error: boolean;
  touched: boolean;
}

interface UserRowProps {
  user: User;
  onStateChange: (
    userId: string,
    fields: Record<string, FieldState>,
    isValid: boolean
  ) => void;
  onDeleteUser: (userId: string) => void;
  isFirstRow: boolean;
}
const UserRow = memo(function UserRow({
  user,
  onStateChange,
  onDeleteUser,
  isFirstRow,
}: UserRowProps) {
  const [fields, setFields] = useState<Record<string, FieldState>>({
    name: { value: user.name, error: false, touched: false },
    country: { value: user.country, error: false, touched: false },
    email: { value: user.email, error: false, touched: false },
    phone: { value: user.phone, error: false, touched: false },
  });

  const validateField = (name: string, value: string): boolean => {
    if (!value) return false;

    switch (name) {
      case 'name':
        return /^[a-zA-Z\s]+$/.test(value);
      case 'country':
        return countryOptions.includes(value);
      case 'email':
        return (value.match(/@/g) || []).length === 1;
      case 'phone':
        return value.startsWith('+') && (value.match(/\+/g) || []).length === 1;
      default:
        return true;
    }
  };

  const isRowValid = (): boolean => {
    return Object.values(fields).every((field) => !field.error && field.value !== '');
  };

  const handleFieldChange = (name: string, value: string) => {
    const newFields = {
      ...fields,
      [name]: {
        value,
        error: !validateField(name, value),
        touched: true,
      },
    };

    setFields(newFields);
    // Notify parent directly after state update
    onStateChange(user.id, newFields, isRowValid());
  };

  const handleFieldBlur = (name: string) => {
    const newFields = {
      ...fields,
      [name]: {
        ...fields[name],
        touched: true,
      },
    };

    setFields(newFields);
    // Notify parent directly after state update
    onStateChange(user.id, newFields, isRowValid());
  };

  return (
    <Grid container className={styles.userRow} spacing={2}>
      <Grid item className={styles.userRowInput}>
        <InputField
          name="name"
          value={fields.name.value}
          placeholder="Name"
          onChangeHandler={handleFieldChange}
          error={fields.name.touched && fields.name.error}
          onBlur={() => handleFieldBlur('name')}
          autofocus={isFirstRow}
        />
      </Grid>
      <Grid item className={styles.userRowInput}>
        {/* TODO: Replace with AutocompleteField for country */}
        <InputField
          name="country"
          value={fields.country.value}
          placeholder="Country"
          onChangeHandler={handleFieldChange}
          error={fields.country.touched && fields.country.error}
          onBlur={() => handleFieldBlur('country')}
        />
      </Grid>
      <Grid item className={styles.userRowInput}>
        <InputField
          name="email"
          value={fields.email.value}
          placeholder="Email"
          onChangeHandler={handleFieldChange}
          error={fields.email.touched && fields.email.error}
          onBlur={() => handleFieldBlur('email')}
        />
      </Grid>
      <Grid item className={styles.userRowInput}>
        <InputField
          name="phone"
          value={fields.phone.value}
          placeholder="Phone"
          onChangeHandler={handleFieldChange}
          error={fields.phone.touched && fields.phone.error}
          onBlur={() => handleFieldBlur('phone')}
        />
      </Grid>
      <Grid item>
        <TrashIconButton
          handleClick={() => {
            onDeleteUser(user.id);
          }}
        />
      </Grid>
    </Grid>
  );
});

export default UserRow;
