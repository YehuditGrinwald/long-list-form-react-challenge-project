import { User, UserAction } from '../../types/usersTypes';

export function usersReducer(state: User[], action: UserAction): User[] {
  switch (action.type) {
    case 'ADD_USER':
      return [action.payload.user as User, ...state];

    case 'DELETE_USER':
      return state.filter((user) => user.id !== action.payload.userId);

    case 'UPDATE_USER':
      return state.map((user) =>
        user.id === action.payload.userId ? { ...user, ...action.payload.user } : user
      );

    case 'INIT_USERS':
      return action.payload.users || [];

    default:
      return state;
  }
}

// Action creators
export const userActions = {
  addUser: (user: User): UserAction => ({
    type: 'ADD_USER',
    payload: { user },
  }),

  deleteUser: (userId: string): UserAction => ({
    type: 'DELETE_USER',
    payload: { userId },
  }),

  updateUser: (userId: string, user: Partial<User>): UserAction => ({
    type: 'UPDATE_USER',
    payload: { userId, user },
  }),

  initUsers: (users: User[]): UserAction => ({
    type: 'INIT_USERS',
    payload: { users },
  }),
};
