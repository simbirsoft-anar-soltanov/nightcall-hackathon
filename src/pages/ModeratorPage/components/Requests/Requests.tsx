import { FC, Fragment, useContext } from 'react';
import { Typography, Box, Snackbar, Alert } from '@mui/material';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import useGetCollection from 'core/hooks/useGetCollection';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import Card from 'components/controls/Card/Card';
import { UseUserType } from 'helpers/types';
import { styledCardContainer } from 'src/pages/ModeratorPage/ModeratorPage.internals';

const Requests: FC = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { role },
  }: UseUserType = useUser(loggedInUser?.uid);

  const [value, loading, error] = useGetCollection('request');

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
                return (
                  doc?.data &&
                  doc?.data().status === 'active' && (
                    <Fragment key={doc?.id}>
                      <Card
                        request={
                          {
                            ...doc.data(),
                            docId: doc.id,
                            role,
                          } as any
                        }
                        nameCollection='request'
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

export default Requests;
