import { Dispatch } from 'react';
import Firebase from 'firebase/compat/app';

export type User = {
  id: string;
  name: string;
  surname: string;
  dateCreated: number;
  docId: string;
  email: string;
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

export type tEventSnaphot = Firebase.firestore.DocumentSnapshot<tEvent>;

export type tEvent = {
  organization_id: string;
  category: string;
  info: string;
  must: string;
  people_count: number;
  status: string;
  time: string;
  time_start: string;
};
