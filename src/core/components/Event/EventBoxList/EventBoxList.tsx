import { FC, useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Grid,
  Stack,
  IconButton,
  Alert,
  AlertColor,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getUserByUserId } from 'services/firebase';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import SnackBar from 'components/indicators/SnackBar/SnackBar';
import EventBoxItem from '../EventBoxItem/EventBoxItem';
import SearchBox from 'core/components/Search/SearchBox';
import { DocumentData } from 'firebase/firestore';
import { joinToEvent } from 'core/services/events/joinToEvent';
import { getEventsBySearch } from 'core/services/events/getEventsBySearch';
import { getEventsByStatus } from 'core/services/events/getEventsByStatus';
import { getEventsBySearchForRespond } from 'utils/getEventsBySearchForRespond';
import { statusEvents, sxEventGridItems } from './EventBoxList.internals';
import { tSearchFilters } from 'core/components/Search/SearchBox.internals';
import { dataIsEmpty } from 'utils/checkEmpty';
import { tDocumentEvent } from 'core/helpers/types';
import { useAlert } from 'core/hooks/useAlert';

type tEventBoxListProps = {
  tab: number;
  userDocId: string;
  userId: string;
  readyStatus: string;
  role: string;
};

const EventBoxList: FC<tEventBoxListProps> = ({
  tab,
  userDocId,
  userId,
  readyStatus,
  role,
}) => {
  const [page, setPage] = useState<number>(1);
  const [events, setEvents] = useState<DocumentData[]>([]);
  const [joinEvents, setJoinEvents] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { alert, onHandleChangeAlert } = useAlert();

  const getJoinEvents = async () => {
    const [getUser] = await getUserByUserId(userId);
    getUser && setJoinEvents(getUser?.joinEvents);
  };

  useEffect(() => {
    getJoinEvents();
  }, []);

  useEffect(() => {
    setPage(1);
    setLoading(true);
    if (tab === 2) {
      getEvents(userId).then((response) => setEventsFromApi(response));
    }

    if (tab === 0 || tab === 1) {
      getByStatus().then((response) => setEventsFromApi(response));
    }
  }, [tab]);

  const getEvents = async (userId: string) => {
    const [getUser] = await getUserByUserId(userId);
    return getUser?.joinEvents || null;
  };

  const setEventsFromApi = (response: any) => {
    if (response) setEvents(response);
    setLoading(false);
  };

  const getByStatus = async () => await getEventsByStatus(statusEvents[tab]);

  const getBySearch = async (searchFilters: tSearchFilters) => {
    if (tab === 2) {
      if (dataIsEmpty(searchFilters)) {
        getEvents(userId).then((response) => setEventsFromApi(response));
      } else {
        return getEventsBySearchForRespond(searchFilters, events, setEvents);
      }
    }

    if (dataIsEmpty(searchFilters)) {
      return await getEventsByStatus(statusEvents[tab]);
    }

    return await getEventsBySearch(searchFilters, statusEvents[tab]);
  };

  const onHandleJoinToEvent = async (
    event: tDocumentEvent,
    isUnFollow?: boolean,
  ) => {
    await joinToEvent(userDocId, event, isUnFollow);

    const [getUser] = await getUserByUserId(userId);

    if (getUser?.joinEvents && tab === 2) {
      setEvents(getUser?.joinEvents);
    }

    onHandleChangeAlert({
      status: isUnFollow ? 'error' : 'success',
      title: isUnFollow
        ? 'Вы отписались от события.'
        : 'Вы успешно подписались на событие.',
    });
  };

  const handleFiltersEvents = (search: tSearchFilters) => {
    getBySearch(search).then((response) => setEventsFromApi(response));
  };

  const isConfirmEventDisabled = readyStatus === 'dontDisturb';

  const handleIsAlreadyEmpSubscribeEvent = (id: string): boolean => {
    return joinEvents.some(
      ({ docId: joinEventDocId }) => joinEventDocId === id,
    );
  };

  return (
    <Box>
      {loading ? (
        <Box sx={{ minHeight: '414px', display: 'grid' }}>
          <SpinnerWrap isInside />
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gap: '24px' }}>
          <SearchBox handleFiltersEvents={handleFiltersEvents} />

          {events.length ? (
            <>
              <Grid sx={sxEventGridItems}>
                {events.map((item: DocumentData, index: number) => (
                  <EventBoxItem
                    key={index}
                    tab={tab}
                    item={item as tDocumentEvent}
                    role={role}
                    isConfirmEventDisabled={isConfirmEventDisabled}
                    handleIsAlreadyEmpSubscribeEvent={
                      handleIsAlreadyEmpSubscribeEvent
                    }
                    onHandleJoinToEvent={onHandleJoinToEvent}
                  />
                ))}
              </Grid>
            </>
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
            <IconButton>
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton>
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>

          {alert?.status && (
            <SnackBar>
              <Alert severity={alert.status as AlertColor}>{alert.title}</Alert>
            </SnackBar>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EventBoxList;
