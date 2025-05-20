import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usersReducer, userActions } from './usersReducer';
import UsersList from './usersList/UsersList';
import { User, useUsersContext } from '../../context/usersContext';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';

function UsersPage() {
  const { users, isLoading, setUsers } = useUsersContext();
  const [localUsers, dispatch] = useReducer(usersReducer, []);

  const [validationState, setValidationState] = useState({
    hasErrors: false,
    emptyFields: 0,
    invalidFields: 0,
  });

  useEffect(() => {
    if (!isLoading) {
      dispatch(userActions.initUsers(users || []));
    }
  }, [users, isLoading]);

  const handleValidationChange = useCallback(
    (hasErrors: boolean, emptyFields: number, invalidFields: number) => {
      setValidationState({ hasErrors, emptyFields, invalidFields });
    },
    []
  );

  const handleAddUser = useCallback(() => {
    const newUser: User = {
      id: uuidv4(),
      name: '',
      email: '',
      phone: '',
      country: '',
    };
    dispatch(userActions.addUser(newUser));
  }, []);

  const handleDeleteUser = useCallback((userId: string) => {
    dispatch(userActions.deleteUser(userId));
  }, []);

  const handleUpdateUser = useCallback((userId: string, userData: Partial<User>) => {
    dispatch(userActions.updateUser(userId, userData));
  }, []);

  const handleSaveClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!localUsers || validationState.hasErrors) return;
      setUsers(localUsers);
    },
    [localUsers, validationState.hasErrors, setUsers]
  );

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList
          users={localUsers}
          onValidationChange={handleValidationChange}
          onDeleteUser={handleDeleteUser}
          onUpdateUser={handleUpdateUser}
          onAddUser={handleAddUser}
        />
        {(validationState.emptyFields > 0 || validationState.invalidFields > 0) && (
          <div className={styles.errorSummary}>
            Errors: Empty Fields - {validationState.emptyFields}, Invalid Fields -{' '}
            {validationState.invalidFields}
          </div>
        )}
        <div className={styles.rightButtonContainer}>
          <PrimaryButton
            disabled={validationState.hasErrors}
            handleClick={handleSaveClick}
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
