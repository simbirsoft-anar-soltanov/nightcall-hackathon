import { FC, useState, useEffect } from 'react';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { usePagination } from 'use-pagination-firestore';
import { db } from 'core/lib/firebase';
import { Typography, Box, Grid, Stack, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import OrderBoxItem from '../OrderBoxItem/OrderBoxItem';
import { statusEvents, sxOrderGridItems } from './OrderBoxList.internals';

type tOrderBoxListProps = {
  tab: number;
};

const OrderBoxList: FC<tOrderBoxListProps> = ({ tab }) => {
  const [page, setPage] = useState<number>(1);

  const { items, isLoading, isStart, isEnd, getPrev, getNext } = usePagination(
    query(
      collection(db, '/events'),
      where('status', '==', statusEvents[tab]),
      orderBy('time_start', 'asc'),
    ),
    { limit: 2 },
  );

  useEffect(() => {
    setPage(1);
  }, [tab]);

  return (
    <Box>
      {isLoading ? (
        <Box sx={{ minHeight: '414px', display: 'grid' }}>
          <SpinnerWrap isInside />
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gap: '24px' }}>
          {items.length ? (
            <Grid sx={sxOrderGridItems}>
              {items?.map((item, index) => (
                <OrderBoxItem item={item} key={index} />
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
                getPrev();
              }}
              disabled={isStart || page === 1}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                setPage((prev) => ++prev);
                getNext();
              }}
              disabled={isEnd}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default OrderBoxList;
