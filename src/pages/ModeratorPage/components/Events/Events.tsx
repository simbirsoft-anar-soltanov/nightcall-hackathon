import { FC, Fragment, useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import useGetCollection from 'core/hooks/useGetCollection';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import SnackBar from 'components/indicators/SnackBar/SnackBar';
import Card from 'components/controls/Card/Card';
import { UseUserType } from 'helpers/types';
import { styledCardContainer } from 'pages/ModeratorPage/ModeratorPage.internals';

const Events: FC = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { role },
  }: UseUserType = useUser(loggedInUser?.uid);

  const [value, loading, error] = useGetCollection('events');

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

      {error && <SnackBar title='Произошла ошибка' />}
    </>
  );
};

export default Events;
