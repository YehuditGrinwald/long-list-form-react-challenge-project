import React from 'react';
import UsersList from './usersList/UsersList';
import styles from './users.module.css';
import PrimaryButton from '../../components/PrimaryButton';

function UsersPage() {
  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <div className={styles.rightButtonContainer}>
          <PrimaryButton
            disabled={false}
            handleClick={() => {
              // TODO: Implement save logic here
              console.log('Save button clicked');
            }}
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
