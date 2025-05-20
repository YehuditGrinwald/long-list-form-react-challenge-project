import { useContext } from 'react';
import styles from './statistics.module.css';
import { useUsersContext } from '../../context/usersContext';

function StatisticsPage() {
  const { users, isLoading } = useUsersContext();

  const countryStats = users.reduce((acc: { [key: string]: number }, user) => {
    acc[user.country] = (acc[user.country] || 0) + 1;
    return acc;
  }, {});

  if (isLoading) {
    return <div className={styles.pageRoot}>Loading...</div>;
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.statsContainer}>
        <h2>Users by Country</h2>
        <ul className={styles.statsList}>
          {Object.entries(countryStats)
            .sort()
            .map(([country, count]) => (
              <li key={country} className={styles.statsListItem}>
                <span>{country}</span>
                <span>
                  {count} user{count !== 1 ? 's' : ''}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default StatisticsPage;
