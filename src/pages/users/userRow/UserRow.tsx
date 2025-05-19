import { Grid } from '@mui/material';
import styles from '../users.module.css';
import { User } from '../../../context/usersContext';
// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';

const UserRow = ({ user }: { user: User }) => {
  return (
    <Grid container className={styles.userRow} spacing={2}>
      <Grid item className={styles.userRowInput}>
        <InputField name="name" value={user.name} placeholder="Name" />
      </Grid>
      <Grid item className={styles.userRowInput}>
        {/* TODO: Replace with AutocompleteField for country */}
        <InputField name="country" value={user.country} placeholder="Country" />
      </Grid>
      <Grid item className={styles.userRowInput}>
        <InputField name="email" value={user.email} placeholder="Email" />
      </Grid>
      <Grid item className={styles.userRowInput}>
        <InputField name="phone" value={user.phone} placeholder="Phone" />
      </Grid>
      <Grid item>
        <TrashIconButton />
      </Grid>
    </Grid>
  );
};

export default UserRow;
