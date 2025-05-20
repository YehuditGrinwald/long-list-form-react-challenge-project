import React, { useState, useCallback, useMemo, useEffect, memo } from 'react';
import { Typography } from '@mui/material';
import { User } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
// import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import AddButton from '../../../components/AddButton';

interface FieldState {
  value: string;
  error: boolean;
  touched: boolean;
}

interface RowState {
  fields: Record<string, FieldState>;
  isValid: boolean;
}

interface UserListProps {
  users: User[];
  onValidationChange: (
    hasErrors: boolean,
    emptyFields: number,
    invalidFields: number
  ) => void;
  onDeleteUser: (userId: string) => void;
  onUpdateUser: (userId: string, userData: Partial<User>) => void;
  onAddUser: () => void;
}
const UsersList = memo(function UsersList({
  users,
  onValidationChange,
  onDeleteUser,
  onUpdateUser,
  onAddUser,
}: UserListProps) {
  const [rowStates, setRowStates] = useState<Record<string, RowState>>({});
  console.log('rowStates ', rowStates);

  const handleRowStateChange = useCallback(
    (userId: string, fields: Record<string, FieldState>, isValid: boolean) => {
      setRowStates((prev) => ({
        ...prev,
        [userId]: { fields, isValid },
      }));

      const userData: Partial<User> = {
        name: fields.name?.value,
        email: fields.email?.value,
        phone: fields.phone?.value,
        country: fields.country?.value,
      };

      onUpdateUser(userId, userData);
    },
    [onUpdateUser]
  );

  // Memoize error calculations
  const errorCounts = useMemo(() => {
    let emptyFieldsCount = 0;
    let invalidFieldsCount = 0;

    Object.values(rowStates).forEach((rowState) => {
      Object.values(rowState.fields).forEach((field: FieldState) => {
        if (field.touched) {
          if (field.value === '') {
            emptyFieldsCount++;
          } else if (field.error) {
            invalidFieldsCount++;
          }
        }
      });
    });

    return {
      emptyFieldsCount,
      invalidFieldsCount,
      hasErrors: emptyFieldsCount > 0 || invalidFieldsCount > 0,
    };
  }, [rowStates]);

  // Only notify parent when error counts actually change
  useEffect(() => {
    onValidationChange(
      errorCounts.hasErrors,
      errorCounts.emptyFieldsCount,
      errorCounts.invalidFieldsCount
    );
  }, [errorCounts, onValidationChange]);

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List ({users.length})</Typography>
        <AddButton handleClick={onAddUser} />
      </div>
      <div className={styles.usersListContent}>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onStateChange={handleRowStateChange}
            onDeleteUser={onDeleteUser}
          />
        ))}
      </div>
    </div>
  );
});

export default UsersList;
