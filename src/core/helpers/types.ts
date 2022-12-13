import { Dispatch } from 'react';
import Firebase from 'firebase/compat/app';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

export type tUser = {
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
  user: tUser;
  setActiveUser: Dispatch<tUser>;
};

export type tEventSnaphot = Firebase.firestore.DocumentSnapshot<tEvent>;

export type tDocumentEvent = DocumentData &
  Pick<DocumentSnapshot<tEvent>, 'id'>;

export type tEvent = {
  id: string;
  docId: string;
  organization_id: string;
  category: string;
  city: string;
  foto: string[];
  info: string;
  must: string;
  organizationName: string;
  people_count: number;
  peoples: {
    userName: string;
    avatarUrl: string;
  }[];
  status: string;
  time: string;
  time_start: string;
};
