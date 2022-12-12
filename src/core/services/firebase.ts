import { doc, updateDoc } from 'firebase/firestore';
import { db, FieldValue } from 'core/lib/firebase';
import { firebase } from '../lib/firebase';
import { User } from '../helpers/types';
import { tCardProps } from 'components/controls/Card/Card';
import { v4 as uuidv4 } from 'uuid';
import { tSearch } from 'core/components/Search/SearchBox.internals';

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

export const getEventsByStatus = async (
  statuses: string[],
): Promise<event[]> => {
  const result = await firebase
    .firestore()
    .collection('events')
    .where('status', 'in', statuses)
    .get();

  const eventsByStatus: any = result.docs.map((item) => ({
    ...item.data(),
  }));

  return eventsByStatus;
};

export const addEvent = async (event: any, userId: string) => {
  try {
    await firebase
      .firestore()
      .collection('events')
      .add({ ...event, organization_id: userId, status: 'active' });
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const sendOrderForChangeStatusOrg = async (data: any, dataOrg: any) => {
  try {
    await firebase
      .firestore()
      .collection('request')
      .add({
        ...data,
        city: dataOrg.city,
        email: dataOrg.email,
        logo: dataOrg.avatar,
        organization_id: uuidv4(),
        phoneNumber: dataOrg.numberPhone,
        previewPhoto: dataOrg.avatar,
        requestId: uuidv4(),
        status: 'active',
      });
    return true;
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

export const getEventsBySearch = async (
  search: tSearch,
  statuses: string[],
): Promise<event[]> => {
  const { organizationName, startDate, category } = search;

  let initQuery = firebase
    .firestore()
    .collection('events')
    .where('status', 'in', statuses);

  if (category !== '') {
    initQuery = initQuery.where('category', '==', category);
  }
  if (organizationName !== '') {
    initQuery = initQuery.where('organizationName', '==', organizationName);
  }
  if (startDate !== '') {
    initQuery = initQuery.where('time_start', '==', startDate);
  }

  const result = await initQuery.get();

  const eventsBySearch: any = result.docs.map((item) => ({
    ...item.data(),
  }));

  return eventsBySearch;
};
