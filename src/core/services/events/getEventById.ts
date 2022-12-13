import { FieldPath, firebase } from 'core/lib/firebase';
import { tEvent } from 'core/helpers/types';

export const getEventById = async (eventId: string): Promise<tEvent[]> => {
  const result = await firebase
    .firestore()
    .collection('events')
    .where(FieldPath.documentId(), 'in', [eventId])
    .get();

  const eventsById = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  })) as tEvent[];

  return eventsById;
};
