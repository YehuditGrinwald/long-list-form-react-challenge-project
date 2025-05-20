import React, { useContext, useState, useCallback } from 'react';
import UsersList from './usersList/UsersList';
import { User, UsersContext } from '../../context/usersContext';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';

function UsersPage() {
  const context = useContext(UsersContext);
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
  //yehudit
  const handleSave = useCallback(
    (updatedUsers: User[]) => {
      if (!context) return;
      context.dispatch({ type: 'EDIT_USER', payload: updatedUsers });
    },
    [context]
  );
  //TODO: fix it
  const handleSaveClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!context?.state.users || validationState.hasErrors) return;
      handleSave(context.state.users);
    },
    [context?.state.users, validationState.hasErrors, handleSave]
  );

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList
          users={context?.state.users || []}
          onValidationChange={handleValidationChange}
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
