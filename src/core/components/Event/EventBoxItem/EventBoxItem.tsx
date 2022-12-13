import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Tooltip from 'components/indicators/Tooltip/Tooltip';
import TotalAvatars from 'components/view/TotalAvatars/TotalAvatars';
import { upperCaseFirstString } from 'utils/upperCaseFirstString';
import { tDocumentEvent } from 'core/helpers/types';
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

type EventBoxItemProps = {
  item: tDocumentEvent;
  tab?: number;
  isConfirmEventDisabled?: boolean;
  isDetailsPage?: boolean;
  onHandleJoinToEvent?: (
    event: tDocumentEvent,
    isUnFollow?: boolean,
  ) => Promise<void>;
};

const EventBoxItem: FC<EventBoxItemProps> = ({
  item,
  tab,
  isConfirmEventDisabled,
  isDetailsPage,
  onHandleJoinToEvent,
}) => {
  const navigate = useNavigate();

  const {
    docId,
    category,
    info,
    time,
    time_start,
    city,
    people_count,
    peoples,
  } = item;

  const handlerActionWithEvent = async () => {
    if (onHandleJoinToEvent) {
      await onHandleJoinToEvent(item, tab === 2);
    }
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

          <Typography sx={sxEventBoxCategory}>
            {upperCaseFirstString(category)}
            {` (${upperCaseFirstString(city)})`}
          </Typography>
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
        {isDetailsPage && (
          <TotalAvatars avatars={peoples} total={people_count} />
        )}

        <Button
          onClick={handlerActionWithEvent}
          disabled={isConfirmEventDisabled}
          sx={tab === 2 ? sxRejectBtn : sxAcceptBtn}
        >
          {tab === 2 ? 'Отклонить' : 'Принять'}
        </Button>

        {!isDetailsPage && (
          <Button
            onClick={() => navigate(`/dashboard/event/${docId}`)}
            onKeyDown={({ key }) =>
              key === 'Enter' && navigate(`/dashboard/event/${docId}`)
            }
            sx={sxSupportBtn}
          >
            Подробнее
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default EventBoxItem;
