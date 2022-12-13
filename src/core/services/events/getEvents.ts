import { firebase } from 'core/lib/firebase';
import { tEvent } from 'core/helpers/types';

export const getEvents = async (): Promise<tEvent[]> => {
  const result = await firebase.firestore().collection('events').get();

  const eventsOrg = result.docs.map((item) => {
    return {
      ...item.data(),
      docId: item.id,
    };
  }) as tEvent[];

  return eventsOrg;
};
