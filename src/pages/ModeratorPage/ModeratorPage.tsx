import { FC, Fragment } from 'react';
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Typography, Box, Snackbar, Alert } from '@mui/material';
import { firebase } from 'core/lib/firebase';
import {
  styledCardContainer,
  styledModeratorContainer,
} from './ModeratorPage.internals';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import Card from 'components/controls/Card/Card';

const ModeratorPage: FC = () => {
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase), 'request'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  if (loading) return <SpinnerWrap />;

  return (
    <Box component='div' sx={styledModeratorContainer}>
      <Typography variant='h3' sx={{ margin: '24px 0 16px' }}>
        Страница Модератора
      </Typography>
      <Box>
        {value ? (
          <>
            <Typography variant='h4' sx={{ margin: '24px 0 16px' }}>
              Заявки на волонтерскую деятельность:
            </Typography>
            <Box component='div' sx={styledCardContainer}>
              {value.docs.map((doc) => {
                console.log('check', doc?.data && doc.data());
                return (
                  doc?.data &&
                  doc?.data().status === 'active' && (
                    <Fragment key={doc?.id}>
                      <Card
                        request={
                          {
                            ...doc.data(),
                            docId: doc.id,
                          } as any
                        }
                      />
                    </Fragment>
                  )
                );
              })}
            </Box>
          </>
        ) : (
          <Typography variant='body1' sx={{ margin: '24px 0 16px' }}>
            Заявки отсутствуют
          </Typography>
        )}

        {value ? (
          <>
            <Typography variant='h4' sx={{ margin: '24px 0 16px' }}>
              Завершенные заявки:
            </Typography>
            <Box component='div' sx={styledCardContainer}>
              {value.docs.map((doc) => {
                console.log('check', doc?.data && doc.data());
                return (
                  doc?.data &&
                  doc?.data().status !== 'active' && (
                    <Fragment key={doc?.id}>
                      <Card
                        request={
                          {
                            ...doc.data(),
                            docId: doc.id,
                          } as any
                        }
                      />
                    </Fragment>
                  )
                );
              })}
            </Box>
          </>
        ) : (
          <Typography variant='body1' sx={{ margin: '24px 0 16px' }}>
            Заявки отсутствуют
          </Typography>
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

export default ModeratorPage;
