import { Dispatch } from 'react';

export type User = {
  id: string;
  name: string;
  surname: string;
  dateCreated: number;
  docId: string;
  emailAddress: string;
  avatar: string;
  role: string;
  city: string;
  numberPhone: string;
  status: string;
  organizationName?: string;
  statusReadyJoinToEvent?: string;
  joinEvents?: any[];
};

export type UseUserType = {
  user: User;
  setActiveUser: Dispatch<User>;
};
