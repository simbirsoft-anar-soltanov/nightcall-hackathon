import { FC, MouseEvent, Fragment, useState, useEffect } from 'react';
import { Typography, Box, Snackbar, Alert } from '@mui/material';
import useGetCollection from 'core/hooks/useGetCollection';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import Togggle from 'components/controls/Toggle/Toggle';
import Card from 'components/controls/Card/Card';
import {
  changeEmployeeStatus,
  getUserByUserId,
  joinToEvent,
} from 'core/services/firebase';
import { User } from 'helpers/types';
import { styledCardContainer } from 'pages/ModeratorPage/ModeratorPage.internals';

type tEmployeePageProps = { user: User; uid: string };

const EmployeePage: FC<tEmployeePageProps> = ({
  user: { docId, role, statusReadyJoinToEvent, joinEvents },
  uid,
}) => {
  const [readyStatus, setReadyStatus] = useState<string>('');
  const [myEvents, setMyEvents] = useState<any[]>(joinEvents || []);

  const [value, loading, error] = useGetCollection('events');

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
            {myEvents.map((event, index) => (
              <Fragment key={event.docId + index}>
                <Card
                  request={event}
                  onHandleJoinToEvent={onHandleJoinToEvent}
                  isMyEvents
                />
              </Fragment>
            ))}
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
