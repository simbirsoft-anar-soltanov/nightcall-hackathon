import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Tooltip from 'components/indicators/Tooltip/Tooltip';
import { sxSupportBtn } from 'core/layout/DefaultLayout/components/Header/Header.internals';
import {
  sxOrderBoxContainer,
  sxOrderBoxLeftPanel,
  sxOrderBoxInfo,
  sxOrderBoxCategory,
  sxOrderBoxTime,
} from './OrderBoxItem.internals';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';

type OrderBoxItemProps = {
  item: DocumentData & Pick<DocumentSnapshot<DocumentData>, 'id'>;
};

const OrderBoxItem: FC<OrderBoxItemProps> = ({
  item: { organization_id, category, info, time, time_start, status },
}) => {
  const navigate = useNavigate();

  return (
    <Grid sx={sxOrderBoxContainer}>
      <Box sx={sxOrderBoxLeftPanel}>
        <Box sx={{ display: 'grid', gap: '4px' }}>
          <Typography sx={sxOrderBoxInfo} component='div'>
            {info.length < 36 ? (
              info
            ) : (
              <Tooltip title={info}>
                <span>{info}</span>
              </Tooltip>
            )}
          </Typography>
          <Typography sx={sxOrderBoxCategory}>
            {category}
            <br />
            {organization_id}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gap: '24px' }}>
          <Typography sx={sxOrderBoxTime}>
            <CalendarMonthIcon sx={{ color: '#134BC5' }} />
            {time_start}
          </Typography>
          <Typography sx={sxOrderBoxTime}>
            <ScheduleIcon sx={{ color: '#134BC5' }} />
            {time} &nbsp;
            {status}
          </Typography>
        </Box>
      </Box>

      <Button
        onClick={() => navigate(`event/${organization_id}`)}
        onKeyDown={({ key }) =>
          key === 'Enter' && navigate(`event/${organization_id}`)
        }
        sx={sxSupportBtn}
      >
        Подробнее
      </Button>
    </Grid>
  );
};

export default OrderBoxItem;
