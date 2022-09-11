import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'core/lib/firebase';
import { firebase } from '../lib/firebase';
import { User } from '../helpers/types';

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
  requestId: string,
  status: string,
): Promise<void> => {
  const taskDocRef = doc(db, 'request', requestId);
  await updateDoc(taskDocRef, { status });
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
