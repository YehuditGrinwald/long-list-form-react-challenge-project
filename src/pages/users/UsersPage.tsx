import React, { useState, useCallback, useEffect } from 'react';
import UsersList from './usersList/UsersList';
import { User, useUsersContext } from '../../context/usersContext';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';

function UsersPage() {
  const { users, isLoading, setUsers } = useUsersContext();
  const [localUsers, setLocalUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setLocalUsers(users || []);
    }
  }, [users, isLoading]);

  console.log('localUsers ', localUsers);

  const [validationState, setValidationState] = useState({
    hasErrors: false,
    emptyFields: 0,
    invalidFields: 0,
  });

  const handleValidationChange = useCallback(
    (hasErrors: boolean, emptyFields: number, invalidFields: number) => {
      setValidationState({ hasErrors, emptyFields, invalidFields });
    },
    []
  );

  const handleSaveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
  };

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!localUsers || validationState.hasErrors) return;
    handleSaveUsers(localUsers);
  };
  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList users={users} onValidationChange={handleValidationChange} />
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
