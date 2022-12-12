import { firebase } from 'core/lib/firebase';

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
