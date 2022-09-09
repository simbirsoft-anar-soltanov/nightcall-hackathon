import { firebase } from '../lib/firebase';
import { User } from '../helpers/types';

export const doesUsernameExist = async (username: string): Promise<boolean> => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();

  return result.docs.length > 0;
};

export const getUserByUsername = async (username: string): Promise<User[]> => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
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
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
};
