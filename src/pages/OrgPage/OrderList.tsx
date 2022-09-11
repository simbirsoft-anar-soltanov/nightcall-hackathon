import { useState, useEffect } from 'react';
import CustomLink from 'components/controls/Link/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CustomChip } from 'components/controls/Chip/Chip';
import { Typography, Box } from '@mui/material';
import { getEvents } from 'core/services/firebase';
import Grid from '@mui/material/Grid';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';

const OrderList = () => {
  const [events, setEvents] = useState([]);

  const getAllEvents = async () => {
    const result: any = await getEvents();
    setEvents(result);
  };

  useEffect(() => {
    if (events.length === 0) {
      getAllEvents();
    }
  }, [events]);

  return (
    <Grid container spacing={2}>
      {events.length !== 0 ? (
        events.map((event: any, index: number) => (
          <Grid item xs={4} key={index}>
            <CustomLink to='/'>
              <Card sx={{ minWidth: 275, mb: 1.5 }}>
                <CardMedia
                  component='img'
                  height='194'
                  image={event.foto ? event.foto[0] : ''}
                  alt={event.info}
                />
                <CardContent>
                  <CustomChip label={event.category} />
                  <Typography
                    variant='h5'
                    component='div'
                    sx={{ mb: 1.5 }}
                    color='primary.main'
                  >
                    {event.info}
                  </Typography>
                  <Box component='div' sx={{ mb: 1.5 }}>
                    {event.must && event.must}
                  </Box>
                  <Typography variant='body2'>
                    <strong>Когда:</strong>{' '}
                    {event.time_start && event.time_start}
                  </Typography>
                  {event.time ? (
                    <Typography variant='body2'>
                      <strong>Длительность:</strong> {event.time}
                    </Typography>
                  ) : (
                    ''
                  )}
                  {event.people_count ? (
                    <Typography variant='body2'>
                      <strong>Количество участников:</strong>{' '}
                      {event.people_count}
                    </Typography>
                  ) : (
                    ''
                  )}
                </CardContent>
              </Card>
            </CustomLink>
          </Grid>
        ))
      ) : (
        <SpinnerWrap />
      )}
    </Grid>
  );
};

export default OrderList;
