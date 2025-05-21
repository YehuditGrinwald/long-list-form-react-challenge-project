export interface User {
  id: string;
  name: string;
  country: string;
  email: string;
  phone: string;
}
export type UserActionType = 'ADD_USER' | 'DELETE_USER' | 'UPDATE_USER' | 'INIT_USERS';

export interface UserAction {
  type: UserActionType;
  payload: {
    userId?: string;
    user?: Partial<User>;
    users?: User[];
  };
}
