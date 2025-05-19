import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import styles from '../users.module.css';
import { User } from '../../../context/usersContext';
// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';

interface FieldState {
  value: string;
  error: boolean;
  touched: boolean;
}

const UserRow = ({ user }: { user: User }) => {
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

  const handleFieldChange = (name: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: {
        value,
        error: !validateField(name, value),
        touched: true,
      },
    }));
  };

  const handleFieldBlur = (name: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
      },
    }));
  };

  return (
    <Grid container className={styles.userRow} spacing={2}>
      <Grid item className={styles.userRowInput}>
        <InputField
          name="name"
          value={fields.name.value}
          placeholder="Name"
          onChangehandler={handleFieldChange}
          error={fields.name.touched && fields.name.error}
          onBlur={() => handleFieldBlur('name')}
        />
      </Grid>
      <Grid item className={styles.userRowInput}>
        {/* TODO: Replace with AutocompleteField for country */}
        <InputField
          name="country"
          value={fields.country.value}
          placeholder="Country"
          onChangehandler={handleFieldChange}
          error={fields.country.touched && fields.country.error}
          onBlur={() => handleFieldBlur('country')}
        />
      </Grid>
      <Grid item className={styles.userRowInput}>
        <InputField
          name="email"
          value={fields.email.value}
          placeholder="Email"
          onChangehandler={handleFieldChange}
          error={fields.email.touched && fields.email.error}
          onBlur={() => handleFieldBlur('email')}
        />
      </Grid>
      <Grid item className={styles.userRowInput}>
        <InputField
          name="phone"
          value={fields.phone.value}
          placeholder="Phone"
          onChangehandler={handleFieldChange}
          error={fields.phone.touched && fields.phone.error}
          onBlur={() => handleFieldBlur('phone')}
        />
      </Grid>
      <Grid item>
        <TrashIconButton />
      </Grid>
    </Grid>
  );
};

export default UserRow;
