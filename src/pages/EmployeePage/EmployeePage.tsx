import { FC, MouseEvent, Fragment, useState, useEffect } from 'react';
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Typography, Box, Snackbar, Alert } from '@mui/material';
import { firebase } from 'core/lib/firebase';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import Togggle from 'components/controls/Toggle/Toggle';
import Card from 'components/controls/Card/Card';
import { styledCardContainer } from 'pages/ModeratorPage/ModeratorPage.internals';
import {
  changeEmployeeStatus,
  getUserByUserId,
  joinToEvent,
} from 'core/services/firebase';
import { User } from 'core/helpers/types';

const EmployeePage: FC<{ user: User; uid: string }> = ({
  user: { docId, role, statusReadyJoinToEvent, joinEvents },
  uid,
}) => {
  const [readyStatus, setReadyStatus] = useState<string>('');
  const [myEvents, setMyEvents] = useState<any[]>(joinEvents || []);

  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase), 'events'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  useEffect(() => {
    joinEvents?.length && setMyEvents(joinEvents);
  }, [joinEvents]);

  useEffect(() => {
    statusReadyJoinToEvent && setReadyStatus(statusReadyJoinToEvent);
  }, [statusReadyJoinToEvent]);

  const handleChange = async (
    _: MouseEvent<HTMLElement>,
    newStatus: string,
  ) => {
    setReadyStatus(newStatus);
    await changeEmployeeStatus(docId, newStatus);
  };

  const onHandleJoinToEvent = async (event: any, isUnFollow?: boolean) => {
    await joinToEvent(docId, event, isUnFollow);
    const [getUser] = await getUserByUserId(uid);
    if (getUser?.joinEvents) {
      setMyEvents(getUser?.joinEvents);
    }
  };

  if (loading) return <SpinnerWrap />;

  return (
    <Box component='div'>
      <Typography variant='h3' sx={{ margin: '24px 0 16px' }}>
        Страница сотрудника SimbirSoft
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <Typography variant='body1'>Статус сотрудника: </Typography>
        <Togggle value={readyStatus} handleChange={handleChange} />
      </Box>

      <Box>
        <Typography variant='h4' sx={{ margin: '24px 0 16px' }}>
          Мои мероприятия:
        </Typography>
        {myEvents?.length && myEvents.length > 0 ? (
          <Box component='div' sx={styledCardContainer}>
            {myEvents.map((event, index) => {
              return (
                <Fragment key={event.docId + index}>
                  <Card
                    request={event}
                    onHandleJoinToEvent={onHandleJoinToEvent}
                    isMyEvents
                  />
                </Fragment>
              );
            })}
          </Box>
        ) : (
          <Typography variant='body1' sx={{ margin: '24px 0 16px' }}>
            Отсутствуют активные мероприятия
          </Typography>
        )}
      </Box>

      <Box>
        {value && (
          <>
            <Typography variant='h4' sx={{ margin: '24px 0 16px' }}>
              Активные мероприятия:
            </Typography>
            <Box component='div' sx={styledCardContainer}>
              {value.docs.map((doc) => {
                return (
                  doc?.data && (
                    <Fragment key={doc?.id}>
                      <Card
                        request={
                          {
                            ...doc.data(),
                            docId: doc.id,
                            role,
                            readyStatus,
                          } as any
                        }
                        onHandleJoinToEvent={onHandleJoinToEvent}
                      />
                    </Fragment>
                  )
                );
              })}
            </Box>
          </>
        )}
      </Box>
      {error && (
        <Snackbar
          open
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity='error' color='error'>
            Произошла ошибка
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default EmployeePage;
