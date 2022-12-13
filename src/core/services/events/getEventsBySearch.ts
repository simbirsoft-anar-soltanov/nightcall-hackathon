import { firebase } from 'core/lib/firebase';
import { tSearchFilters } from 'core/components/Search/SearchBox.internals';
import { tEvent } from 'core/helpers/types';

export const getEventsBySearch = async (
  filters: tSearchFilters,
  statuses: string[],
): Promise<tEvent[]> => {
  const { search, city, startDate, category } = filters;

  let initQuery = firebase
    .firestore()
    .collection('events')
    .where('status', 'in', statuses);

  if (search !== '') {
    initQuery = initQuery.where('info', '>=', search);
  }

  if (city !== '') {
    initQuery = initQuery.where('city', '==', city);
  }

  if (startDate !== '') {
    initQuery = initQuery.where('time_start', '==', startDate.toLowerCase());
  }

  if (category !== '') {
    console.log(category.toLowerCase());
    initQuery = initQuery.where('category', '==', category);
  }

  const result = await initQuery.get();

  const eventsBySearch = result.docs.map((item) => ({
    ...item.data(),
  })) as tEvent[];

  return eventsBySearch;
};
