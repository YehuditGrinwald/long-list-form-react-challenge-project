import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { UsersContext } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
// import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';

function UsersList() {
  const context = useContext(UsersContext);
  if (!context) throw new Error('UsersList must be used within a UsersProvider');
  const { users } = context?.state;

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List</Typography>
        {/* <AddButton /> */}
      </div>
      <div className={styles.usersListContent}>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UsersList;
