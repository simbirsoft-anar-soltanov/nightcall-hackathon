import CustomLink from 'components/controls/Link/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CustomChip } from 'components/controls/Chip/Chip';
import { Typography, Box, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, getFirestore } from 'firebase/firestore';
import { firebase } from 'core/lib/firebase';

const OrderList = () => {
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase), 'events'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  const defaultPreviewPhoto = 'https://i.ibb.co/gMSX8Xs/eco-volonterstvo.jpg';

  if (loading) return <SpinnerWrap />;

  return (
    <>
      {value ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {value.docs.map((event) => {
            return (
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                key={event.data().organization_id}
              >
                <CustomLink to='/'>
                  <Card sx={{ mb: 1.5 }}>
                    <CardMedia
                      component='img'
                      height='194'
                      image={
                        event.data().foto
                          ? event.data().foto[0]
                          : defaultPreviewPhoto
                      }
                      alt={event.data().info}
                    />
                    <CardContent>
                      <CustomChip label={event.data().category} />
                      <Typography
                        variant='h5'
                        component='div'
                        sx={{ mb: 1.5 }}
                        color='primary.main'
                      >
                        {event.data().info}
                      </Typography>
                      <Box component='div' sx={{ mb: 1.5 }}>
                        {event.data().must && event.data().must}
                      </Box>
                      <Typography variant='body2'>
                        <strong>Когда:</strong>{' '}
                        {event.data().time_start && event.data().time_start}
                      </Typography>
                      {event.data().time ? (
                        <Typography variant='body2'>
                          <strong>Длительность:</strong> {event.data().time}
                        </Typography>
                      ) : (
                        ''
                      )}
                      {event.data().people_count ? (
                        <Typography variant='body2'>
                          <strong>Количество участников:</strong>{' '}
                          {event.data().people_count}
                        </Typography>
                      ) : (
                        ''
                      )}
                    </CardContent>
                  </Card>
                </CustomLink>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant='body1' sx={{ margin: '24px 0 16px' }}>
          Заявки отсутствуют
        </Typography>
      )}
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
    </>
  );
};

export default OrderList;
