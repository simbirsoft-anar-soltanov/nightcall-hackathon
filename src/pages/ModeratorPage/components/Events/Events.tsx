import { FC, Fragment, useContext } from 'react';
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Typography, Box, Snackbar, Alert } from '@mui/material';
import { firebase } from 'lib/firebase';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import Card from 'components/controls/Card/Card';
import { UseUserType } from 'helpers/types';
import { styledCardContainer } from 'pages/ModeratorPage/ModeratorPage.internals';

const Events: FC = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { role },
  }: UseUserType = useUser(loggedInUser?.uid);

  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase), 'events'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  if (loading) return <SpinnerWrap />;

  return (
    <>
      <Box>
        {value ? (
          <>
            <Typography variant='h4' sx={{ margin: '24px 0 16px' }}>
              Заявки на волонтерскую деятельность:
            </Typography>
            <Box component='div' sx={styledCardContainer}>
              {value.docs.map((doc) => {
                const docData = doc?.data();

                return (
                  docData?.status === 'active' && (
                    <Fragment key={doc?.id}>
                      <Card
                        request={
                          {
                            ...docData,
                            docId: doc.id,
                            role,
                          } as any
                        }
                        nameCollection='events'
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
                const docData = doc?.data();

                return (
                  docData?.status !== 'active' && (
                    <Fragment key={doc?.id}>
                      <Card
                        request={
                          {
                            ...docData,
                            docId: doc.id,
                            role,
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
    </>
  );
};

export default Events;
