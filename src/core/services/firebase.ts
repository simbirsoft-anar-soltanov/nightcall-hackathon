import { doc, updateDoc } from 'firebase/firestore';
import { db, FieldValue } from 'core/lib/firebase';
import { firebase } from '../lib/firebase';
import { User } from '../helpers/types';
import { tCardProps } from 'components/controls/Card/Card';

export const doesOrganizationNameExist = async (
  organizationName: string,
): Promise<boolean> => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('organizationName', '==', organizationName.toLowerCase())
    .get();

  return result.docs.length > 0;
};

export const doesEmailExist = async (email: string): Promise<boolean> => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('email', '==', email.toLowerCase())
    .get();

  return result.docs.length > 0;
};

export const getUserByUsername = async (username: string): Promise<User[]> => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('name', '==', username.toLowerCase())
    .where('organizationName', '==', username.toLowerCase())
    .get();

  return result.docs.map((item: any) => ({
    ...item.data(),
    docId: item.id,
  }));
};

export const getUserByUserId = async (userId: string): Promise<any[]> => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('id', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};

export const changeStatusRequest = async (
  { docId }: tCardProps['request'],
  changeStatus: string,
  nameCollection?: string,
): Promise<void> => {
  if (!nameCollection) return;

  const taskDocRef = doc(db, nameCollection, docId);
  await updateDoc(taskDocRef, { status: changeStatus });
};

export const joinToEvent = async (
  docId: string,
  event: any,
  isUnFollow?: boolean,
): Promise<void> => {
  const userDocRef = doc(db, 'users', docId);

  await updateDoc(userDocRef, {
    joinEvents: isUnFollow
      ? FieldValue.arrayRemove(event)
      : FieldValue.arrayUnion(event),
  });
};

type event = {
  time: string | null;
  info: string;
  organization_id: number;
  foto: string[] | null;
  date: string;
  category: string;
  must: string | null;
  people_count: number | null;
  time_start: string;
};

export const getEvents = async (): Promise<event[]> => {
  const result = await firebase.firestore().collection('events').get();
  const eventsOrg: any = result.docs.map((item) => ({
    ...item.data(),
  }));

  return eventsOrg;
};

export const addEvent = async (event: any) => {
  try {
    await firebase
      .firestore()
      .collection('events')
      .add({ ...event, organization_id: Math.random() });
  } catch (err) {
    console.log(err);
  }
};

export const changeEmployeeStatus = async (
  userId: string,
  statusReadyJoinToEvent: string,
): Promise<void> => {
  const taskDocRef = doc(db, 'users', userId);
  await updateDoc(taskDocRef, { statusReadyJoinToEvent });
};
