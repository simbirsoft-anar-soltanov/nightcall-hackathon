import { collection, getFirestore } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
} from '@mui/material';
import { firebase } from 'lib/firebase';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import CustomLink from 'components/controls/Link/Link';
import { CustomChip } from 'components/controls/Chip/Chip';

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
            const data = event.data();

            return (
              <Grid
                item xs={12} sm={4} md={4}
                key={data.organization_id}
              >
                <CustomLink to='/'>
                  <Card sx={{ mb: 1.5 }}>
                    <CardMedia
                      component='img'
                      height='194'
                      image={data.foto ? data.foto[0] : defaultPreviewPhoto}
                      alt={data.info}
                    />

                    <CardContent>
                      <CustomChip label={data.category} />
                      <Typography
                        variant='h5'
                        component='div'
                        sx={{ mb: 1.5 }}
                        color='primary.main'
                      >
                        {data.info}
                      </Typography>

                      <Box component='div' sx={{ mb: 1.5 }}>
                        {data.must && data.must}
                      </Box>

                      <Typography variant='body2'>
                        <strong>Когда:</strong>{' '}
                        {data.time_start && data.time_start}
                      </Typography>

                      {data.time && (
                        <Typography variant='body2'>
                          <strong>Длительность:</strong> {data.time}
                        </Typography>
                      )}

                      {data.people_count && (
                        <Typography variant='body2'>
                          <strong>Количество участников:</strong>{' '}
                          {data.people_count}
                        </Typography>
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
