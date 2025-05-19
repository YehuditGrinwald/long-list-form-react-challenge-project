import React from 'react';
import UsersList from './usersList/UsersList';
// import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';

function UsersPage() {
  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <div className={styles.rightButtonContainer}>
          {/* <PrimaryButton
            disabled={false}
            // TODO: Implement onClick handler
          >
            Save
          </PrimaryButton> */}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
