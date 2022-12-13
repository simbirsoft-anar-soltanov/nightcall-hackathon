import { firebase } from 'core/lib/firebase';
import { tEvent } from 'core/helpers/types';

export const getEventsByStatus = async (
  statuses: string[],
): Promise<tEvent[]> => {
  const result = await firebase
    .firestore()
    .collection('events')
    .where('status', 'in', statuses)
    .get();

  const eventsByStatus = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  })) as tEvent[];

  return eventsByStatus;
};
