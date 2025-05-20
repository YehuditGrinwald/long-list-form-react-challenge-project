import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useContext,
} from 'react';
import data from '../data/initialUsersData.json';

export interface User {
  id: string;
  name: string;
  country: string;
  email: string;
  phone: string;
}

interface UsersContextType {
  users: User[];
  isLoading: boolean;
  setUsers: (users: User[]) => void;
}

const UsersContext = createContext<UsersContextType | undefined>({
  users: [],
  isLoading: true,
  setUsers: () => {},
});

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setUsers(data);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  const contextValue = useMemo(
    () => ({ users, setUsers, isLoading }),
    [users, isLoading]
  );

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};
// consumer
export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsersContext must be used within a UsersProvider');
  }
  return context;
};

export default UsersContext;
