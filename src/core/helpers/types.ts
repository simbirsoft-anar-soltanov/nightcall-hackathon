import { Dispatch } from 'react';

export type User = {
  userId: string;
  name: string;
  surname: string;
  dateCreated: number;
  docId: string;
  emailAddress: string;
  avatar: string;
  role: string;
};

export type UseUserType = {
  user: User;
  setActiveUser: Dispatch<User>;
};
