import { FC, MouseEvent, Fragment, useState, useEffect } from 'react';
import { Typography, Box, Tabs, Tab, Button } from '@mui/material';
import useGetCollection from 'core/hooks/useGetCollection';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import SnackBar from 'components/indicators/SnackBar/SnackBar';
import Togggle from 'components/controls/Toggle/Toggle';
import Card from 'components/controls/Card/Card';
import {
  changeEmployeeStatus,
  getUserByUserId,
  joinToEvent,
} from 'core/services/firebase';
import { User } from 'helpers/types';
import { styledCardContainer } from 'pages/ModeratorPage/ModeratorPage.internals';
import Grid from '@mui/material/Grid';
import {
  sxEmpTitlePage,
  styledEmpContainer,
  sxEmpNamePage,
  sxEmpTab,
  styledItemEvent,
} from 'pages/EmployeePage/EmployeePage.internals';
import useTabs from 'core/hooks/useTabs';
import OrderBoxList from 'pages/OrgPage/components/OrderBoxList/OrderBoxList';
import {
  sxOrderBoxCategory,
  sxOrderBoxContainer,
  sxOrderBoxInfo,
  sxOrderBoxLeftPanel,
  sxOrderBoxTime,
} from 'pages/EmployeePage/components/OrderBoxList.internals';
import Tooltip from 'components/indicators/Tooltip/Tooltip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { sxSupportBtn } from 'layout/DefaultLayout/components/Header/Header.internals';

type tEmployeePageProps = { user: User; uid: string };

const EmployeePage: FC<tEmployeePageProps> = ({
  user: { docId, role, statusReadyJoinToEvent, joinEvents },
  uid,
}) => {
  const [readyStatus, setReadyStatus] = useState<string>('');
  const [myEvents, setMyEvents] = useState<any[]>(joinEvents || []);
  const { tab, onChangeTab } = useTabs();

  const [value, loading, error] = useGetCollection('events');
  console.log('value = ', value?.docs);
  console.log('joinEvents = ', joinEvents);

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
    <Box component='div' sx={styledEmpContainer}>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Typography sx={sxEmpTitlePage}>Мероприятия</Typography>
        <Typography sx={sxEmpNamePage}>Страница Волонтера</Typography>
      </Grid>

      <Grid container justifyContent='space-between' alignItems='center'>
        <Tabs value={tab} onChange={onChangeTab}>
          <Tab label='Все' sx={{ paddingLeft: 0, ...sxEmpTab }} />
          <Tab label='Активные' sx={sxEmpTab} />
          <Tab label='Откликнутые' sx={sxEmpTab} />
        </Tabs>
        <Togggle value={readyStatus} handleChange={handleChange} />
      </Grid>
      {/*<OrderBoxList tab={tab} />*/}
      <Box>
        {myEvents?.length && myEvents.length > 0 ? (
          <Box component='div'>
            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              // key={data.organization_id}
            >
              <Grid sx={sxOrderBoxContainer}>
                <Box sx={sxOrderBoxLeftPanel}>
                  <Box sx={{ display: 'grid', gap: '4px' }}>
                    <Typography sx={sxOrderBoxInfo} component='div'>
                      dsds
                      {/*{data.info.length < 36 ? (*/}
                      {/*  data.info*/}
                      {/*) : (*/}
                      {/*  <Tooltip title={data.info}>*/}
                      {/*    <span>{data.info}</span>*/}
                      {/*  </Tooltip>*/}
                      {/*)}*/}
                    </Typography>
                    <Typography sx={sxOrderBoxCategory}>
                      {/*{data.category}*/}
                      555
                      <br />
                      {/*{data.organization_id}*/}
                      444
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'grid', gap: '24px' }}>
                    <Typography sx={sxOrderBoxTime}>
                      <CalendarMonthIcon sx={{ color: '#134BC5' }} />
                      {/*{data.time_start}*/}dsds
                    </Typography>
                    <Typography sx={sxOrderBoxTime}>
                      <ScheduleIcon sx={{ color: '#134BC5' }} />
                      {/*{data.time}*/}3333
                    </Typography>
                  </Box>
                </Box>

                {/*<Button*/}
                {/*  onClick={() => navigate(`event/${data.organization_id}`)}*/}
                {/*  onKeyDown={({ key }) =>*/}
                {/*    key === 'Enter' &&*/}
                {/*    navigate(`event/${data.organization_id}`)*/}
                {/*  }*/}
                {/*  sx={sxSupportBtn}*/}
                {/*>*/}
                {/*  Подробнее*/}
                {/*</Button>*/}
              </Grid>
            </Grid>
            {myEvents.map((event, index) => (
              <Box
                component='div'
                sx={styledItemEvent}
                key={event.docId + index}
              >
                <div>
                  <div>«Поделись добром»</div>
                  <div>Экология</div>
                </div>
                <div />
              </Box>
              // <Fragment key={event.docId + index}>
              //   <Card
              //     request={event}
              //     onHandleJoinToEvent={onHandleJoinToEvent}
              //     isMyEvents
              //   />
              // </Fragment>
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

      {error && <SnackBar title='Произошла ошибка' />}
    </Box>
  );
};

export default EmployeePage;
