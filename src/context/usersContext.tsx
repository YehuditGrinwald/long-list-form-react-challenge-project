import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import data from '../data/initialUsersData.json';

export interface User {
  id: string;
  name: string;
  country: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  isLoading: boolean;
}

type UsersAction =
  | { type: 'LOAD_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'EDIT_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string } // user id
  | { type: 'SET_LOADING'; payload: boolean };

function usersReducer(state: UsersState, action: UsersAction): UsersState {
  switch (action.type) {
    case 'LOAD_USERS':
      return { ...state, users: action.payload, isLoading: false };
    case 'ADD_USER':
      return { ...state, users: [action.payload, ...state.users] };
    case 'EDIT_USER':
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.payload.id ? action.payload : u)),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

interface UsersContextType {
  state: UsersState;
  dispatch: React.Dispatch<UsersAction>;
}

export const UsersContext = createContext<UsersContextType | undefined>(undefined);

const initialState: UsersState = {
  users: [],
  isLoading: true,
};

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const t = setTimeout(() => {
      dispatch({ type: 'LOAD_USERS', payload: data });
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>{children}</UsersContext.Provider>
  );
};
