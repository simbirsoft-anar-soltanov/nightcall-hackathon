import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import Tooltip from 'components/indicators/Tooltip/Tooltip';
import { sxSupportBtn } from 'core/layout/DefaultLayout/components/Header/Header.internals';
import {
  sxOrderGridItems,
  sxOrderBoxContainer,
  sxOrderBoxLeftPanel,
  sxOrderBoxInfo,
  sxOrderBoxCategory,
  sxOrderBoxTime,
} from './OrderBoxList.internals';
import { usePagination } from 'core/hooks/usePagination';

type tOrderBoxListProps = {
  tab: number;
};

const OrderBoxList: FC<tOrderBoxListProps> = ({ tab }) => {
  const navigate = useNavigate();

  const { list, page, showNext, showPrevious } = usePagination(tab);

  return (
    <>
      {!list ? (
        <SpinnerWrap isInside />
      ) : list?.docs?.length ? (
        <>
          <Grid sx={sxOrderGridItems}>
            {list.docs.map((event: any) => {
              const data = event.data();

              return (
                <Grid
                  item xs={12} sm={4} md={4}
                  key={data.organization_id}
                >
                  <Grid sx={sxOrderBoxContainer}>
                    <Box sx={sxOrderBoxLeftPanel}>
                      <Box sx={{ display: 'grid', gap: '4px' }}>
                        <Typography sx={sxOrderBoxInfo} component='div'>
                          {data.info.length < 36 ? (
                            data.info
                          ) : (
                            <Tooltip title={data.info}>
                              <span>{data.info}</span>
                            </Tooltip>
                          )}
                        </Typography>
                        <Typography sx={sxOrderBoxCategory}>
                          {data.category}
                          <br />
                          {data.organization_id}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'grid', gap: '24px' }}>
                        <Typography sx={sxOrderBoxTime}>
                          <CalendarMonthIcon sx={{ color: '#134BC5' }} />
                          {data.time_start}
                        </Typography>
                        <Typography sx={sxOrderBoxTime}>
                          <ScheduleIcon sx={{ color: '#134BC5' }} />
                          {data.time}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      onClick={() => navigate(`event/${data.organization_id}`)}
                      onKeyDown={({ key }) =>
                        key === 'Enter' &&
                        navigate(`event/${data.organization_id}`)
                      }
                      sx={sxSupportBtn}
                    >
                      Подробнее
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>

          <Stack spacing={2} direction='row' justifyContent='flex-end'>
            {page > 1 && (
              <Button onClick={() => showPrevious({ item: list.docs[0] })}>
                <ArrowBackIosNewIcon />
              </Button>
            )}

            {list.docs.length >= 2 && (
              <Button
                onClick={() =>
                  showNext({ item: list.docs[list.docs.length - 1] })
                }
              >
                <ArrowForwardIosIcon />
              </Button>
            )}
          </Stack>
        </>
      ) : (
        <Typography variant='body1' sx={{ margin: '24px 0 16px' }}>
          Мероприятия отсутствуют
        </Typography>
      )}
    </>
  );
};

export default OrderBoxList;
