import { FC } from 'react';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Tooltip from 'components/indicators/Tooltip/Tooltip';
import { sxSupportBtn } from 'core/layout/DefaultLayout/components/Header/Header.internals';
import { sxAcceptBtn, sxRejectBtn } from './EventBoxItem.internals';
import {
  sxEventBoxContainer,
  sxEventBoxLeftPanel,
  sxEventBoxInfo,
  sxEventBoxCategory,
  sxEventBoxTime,
  sxEventBoxRightPanel,
} from './EventBoxItem.internals';

type Event = DocumentData & Pick<DocumentSnapshot<DocumentData>, 'id'>;

type OrderBoxItemProps = {
  item: Event;
  tab: number;
  onHandleJoinToEvent: (event: Event, isUnFollow?: boolean) => Promise<void>;
};

const EventBoxItem: FC<OrderBoxItemProps> = ({
  item,
  tab,
  onHandleJoinToEvent,
}) => {
  const navigate = useNavigate();

  const { organization_id, category, info, time, time_start } = item;

  const handlerActionWithEvent = async () => {
    await onHandleJoinToEvent(item, tab === 2);
  };

  return (
    <Grid sx={sxEventBoxContainer}>
      <Box sx={sxEventBoxLeftPanel}>
        <Box sx={{ display: 'grid', gap: '4px' }}>
          <Typography sx={sxEventBoxInfo} component='div'>
            {info.length < 36 ? (
              info
            ) : (
              <Tooltip title={info}>
                <span>{info}</span>
              </Tooltip>
            )}
          </Typography>
          <Typography sx={sxEventBoxCategory}>{category}</Typography>
        </Box>

        <Box sx={{ display: 'grid', gap: '24px' }}>
          <Typography sx={sxEventBoxTime}>
            <CalendarMonthIcon sx={{ color: '#134BC5' }} />
            {time_start}
          </Typography>
          <Typography sx={sxEventBoxTime}>
            <ScheduleIcon sx={{ color: '#134BC5' }} />
            {time}
          </Typography>
        </Box>
      </Box>
      <Box sx={sxEventBoxRightPanel}>
        <Button
          onClick={handlerActionWithEvent}
          sx={tab === 2 ? sxRejectBtn : sxAcceptBtn}
        >
          {tab === 2 ? 'Отклонить' : 'Принять'}
        </Button>
        <Button
          onClick={() => navigate(`/dashboard/event/${organization_id}`)}
          onKeyDown={({ key }) =>
            key === 'Enter' && navigate(`/dashboard/event/${organization_id}`)
          }
          sx={sxSupportBtn}
        >
          Подробнее
        </Button>
      </Box>
    </Grid>
  );
};

export default EventBoxItem;
