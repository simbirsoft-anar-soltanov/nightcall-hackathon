import { DocumentData } from 'firebase/firestore';
import { tSearchFilters } from 'core/components/Search/SearchBox.internals';
import { Dispatch, SetStateAction } from 'react';

export const getEventsBySearchForRespond = (
  filters: tSearchFilters,
  events: DocumentData[],
  setEvents: Dispatch<SetStateAction<DocumentData[]>>,
) => {
  const { search, city, startDate, category } = filters;

  const eventsBySearch = events.filter((event) => {
    const isQuerySearch = search !== '' && event.info.indexOf(search);

    const isCity = city === event.city;

    const isCategoryFilter = category === event.category;

    const isStartDate = startDate === event.time_start;

    return isQuerySearch || isCity || isCategoryFilter || isStartDate;
  });

  setEvents(eventsBySearch);
};
