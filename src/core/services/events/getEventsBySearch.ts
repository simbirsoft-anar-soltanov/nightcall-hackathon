import { firebase } from 'core/lib/firebase';
import { tSearchFilters } from 'core/components/Search/SearchBox.internals';
import { tEvent } from 'core/helpers/types';

export const getEventsBySearch = async (
  search: tSearchFilters,
  statuses: string[],
): Promise<tEvent[]> => {
  const { city, startDate, category } = search;

  let initQuery = firebase
    .firestore()
    .collection('events')
    .where('status', 'in', statuses);

  if (city !== '') {
    initQuery = initQuery.where('city', '==', city.toLowerCase());
  }

  if (startDate !== '') {
    initQuery = initQuery.where('time_start', '==', startDate.toLowerCase());
  }

  if (category !== '') {
    console.log(category.toLowerCase());
    initQuery = initQuery.where('category', '==', category.toLowerCase());
  }

  const result = await initQuery.get();

  const eventsBySearch = result.docs.map((item) => ({
    ...item.data(),
  })) as tEvent[];

  return eventsBySearch;
};
