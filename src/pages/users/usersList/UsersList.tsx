import React, { useState, useCallback, useMemo, useEffect, memo } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import UserRow from '../userRow/UserRow';
import styles from '../users.module.css';
import AddButton from '../../../components/AddButton';
import { User } from '../../../types/usersTypes';

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
  isLoading: boolean;
}
const LIST_DIMENSIONS = {
  HEIGHT: 400,
  ITEM_SIZE: 70,
  OVERSCAN_COUNT: 5,
} as const;

const VirtualRow = ({ data, index, style }: ListChildComponentProps) => {
  const { users, handleRowStateChange, handleDeleteUser } = data;
  const user = users[index];

  return (
    <div style={style}>
      <UserRow
        key={user.id}
        user={user}
        onStateChange={handleRowStateChange}
        onDeleteUser={handleDeleteUser}
        isFirstRow={index === 0}
      />
    </div>
  );
};

const UsersList = memo(function UsersList({
  users,
  onValidationChange,
  onDeleteUser,
  onUpdateUser,
  onAddUser,
  isLoading,
}: UserListProps) {
  const [rowStates, setRowStates] = useState<Record<string, RowState>>({});

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

  const handleDeleteUser = useCallback(
    (userId: string) => {
      setRowStates((prev) => {
        const { [userId]: removed, ...newState } = prev;
        return newState;
      });
      onDeleteUser(userId);
    },
    [onDeleteUser]
  );

  // Memoize error calculations
  const errorCounts = useMemo(() => {
    let emptyFieldsCount = 0;
    let invalidFieldsCount = 0;

    for (const [, rowState] of Object.entries(rowStates)) {
      const fields = rowState.fields;

      for (const field of Object.values(fields)) {
        if (!field.touched) continue;

        if (field.value === '') {
          emptyFieldsCount++;
        } else if (field.error) {
          invalidFieldsCount++;
        }
      }
    }

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

  const itemData = useMemo(
    () => ({
      users,
      handleRowStateChange,
      handleDeleteUser,
    }),
    [users, handleRowStateChange, handleDeleteUser]
  );

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List ({users.length})</Typography>
        <AddButton handleClick={onAddUser} />
      </div>
      <div className={styles.usersListContent}>
        {isLoading || users.length === 0 ? (
          <div className={styles.contentLoading}>
            <CircularProgress />
          </div>
        ) : (
          <FixedSizeList
            height={LIST_DIMENSIONS.HEIGHT}
            width="100%"
            itemSize={LIST_DIMENSIONS.ITEM_SIZE}
            itemCount={users.length}
            itemData={itemData}
            overscanCount={LIST_DIMENSIONS.OVERSCAN_COUNT}
          >
            {VirtualRow}
          </FixedSizeList>
        )}
      </div>
    </div>
  );
});

export default UsersList;
