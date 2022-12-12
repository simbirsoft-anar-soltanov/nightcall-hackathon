import { FC, useState, useEffect } from 'react';
import { Typography, Box, Grid, Stack, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  getUserByUserId,
  getEventsByStatus,
  joinToEvent,
  getEventsBySearch,
} from 'services/firebase';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import EventBoxItem from '../EventBoxItem/EventBoxItem';
import SearchBox from 'core/components/Search/SearchBox';
import { DocumentData } from 'firebase/firestore';
import { statusEvents, sxEventGridItems } from './EventBoxList.internals';
import { tSearch } from 'core/components/Search/SearchBox.internals';
import { dataIsEmpty } from 'utils/checkEmpty';

type tEventBoxListProps = {
  tab: number;
  docId: string;
  uid: string;
};

const EventBoxList: FC<tEventBoxListProps> = ({ tab, docId, uid }) => {
  const [page, setPage] = useState<number>(1);
  const [events, setEvents] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // let { items, isLoading, isStart, isEnd, getPrev, getNext } = usePagination(
  // 	query(
  // 		collection(db, '/events'),
  // 		where('status', 'in', statusEvents[tab]),
  // 		orderBy('time_start', 'asc'),
  // 	),
  // 	{ limit: 100 },
  // );

  const getEvents = async (userId: string) => {
    const [getUser] = await getUserByUserId(userId);
    return getUser?.joinEvents || null;
  };

  const setEventsFromApi = (res: any) => {
    if (res) setEvents(res);
    setLoading(false);
  };

  const getByStatus = async () => {
    return await getEventsByStatus(statusEvents[tab]);
  };

  const getEventsBySearchForRespond = (search: tSearch) => {
    const { organizationName, startDate, category } = search;
    const eventsBySearch = events.filter((event) => {
      return (
        (event.organizationName &&
          organizationName !== '' &&
          event.organizationName.includes(organizationName)) ||
        (category !== '' && event.category.includes(category)) ||
        (startDate !== '' && event.time_start.includes(startDate))
      );
    });
    setEvents(eventsBySearch);
  };

  const getBySearch = async (search: tSearch) => {
    if (tab === 2) {
      if (dataIsEmpty(search)) {
        getEvents(uid).then((res) => {
          setEventsFromApi(res);
        });
      } else {
        return getEventsBySearchForRespond(search);
      }
    }
    if (dataIsEmpty(search)) {
      return await getEventsByStatus(statusEvents[tab]);
    }
    return await getEventsBySearch(search, statusEvents[tab]);
  };

  const onHandleJoinToEvent = async (event: any, isUnFollow?: boolean) => {
    await joinToEvent(docId, { ...event, docId }, isUnFollow);
    const [getUser] = await getUserByUserId(uid);
    if (getUser?.joinEvents && tab === 2) {
      setEvents(getUser?.joinEvents);
    }
  };

  const searchEvents = (search: tSearch) => {
    getBySearch(search).then((res) => {
      setEventsFromApi(res);
    });
  };

  useEffect(() => {
    setPage(1);
    setLoading(true);
    if (tab === 2) {
      getEvents(uid).then((res) => {
        setEventsFromApi(res);
      });
    }
    if (tab === 0 || tab === 1) {
      getByStatus().then((res) => {
        setEventsFromApi(res);
      });
    }
  }, [tab]);

  return (
    <Box>
      {loading ? (
        <Box sx={{ minHeight: '414px', display: 'grid' }}>
          <SpinnerWrap isInside />
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gap: '24px' }}>
          <SearchBox searchEvents={searchEvents} />
          {events.length ? (
            <Grid sx={sxEventGridItems}>
              {events.map((item: any, index: number) => (
                <EventBoxItem
                  key={index}
                  item={item}
                  tab={tab}
                  onHandleJoinToEvent={onHandleJoinToEvent}
                />
              ))}
            </Grid>
          ) : (
            <Box sx={{ minHeight: '350px' }}>
              <Typography
                variant='body1'
                sx={{ margin: '24px 0 16px', fontSize: '24px' }}
              >
                Мероприятия отсутствуют
              </Typography>
            </Box>
          )}

          <Stack spacing={2} direction='row' justifyContent='flex-end'>
            <IconButton
              onClick={() => {
                setPage((prev) => --prev);
                // getPrev();
              }}
              // disabled={isStart || page === 1}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                setPage((prev) => ++prev);
                // getNext();
              }}
              // disabled={isEnd}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default EventBoxList;
