import { FC, useContext } from 'react';
import { Typography, Box, Grid, Chip, Avatar, Button } from '@mui/material';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import useGetCollection from 'core/hooks/useGetCollection';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import SnackBar from 'components/indicators/SnackBar/SnackBar';
import { changeStatusRequest } from 'services/requests/changeStatusRequest';
import {
  statusLabelRequest,
  statusRequest,
  sxRequestBoxContainer,
  sxRequestBoxInfo,
  sxRequestBoxLeftPanel,
  tColor,
  sxRequestBoxPhoneNumber,
  sxRequestBoxRightPanel,
} from 'src/pages/ModeratorPage/ModeratorPage.internals';
import { sxEventGridItems } from 'core/components/Event/EventBoxList/EventBoxList.internals';
import { defaultLogo } from 'core/constants/constants';
import { red } from '@mui/material/colors';
import {
  sxAcceptBtn,
  sxRejectBtn,
} from 'core/components/Event/EventBoxItem/EventBoxItem.internals';
import { UseUserType } from 'helpers/types';

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

            <Grid sx={sxEventGridItems}>
              {value.docs.map((doc) => {
                return (
                  doc?.data &&
                  doc?.data().status === 'active' && (
                    <>
                      <Grid sx={sxRequestBoxContainer}>
                        <Box sx={sxRequestBoxLeftPanel}>
                          <Box sx={{ display: 'grid', gap: '4px' }}>
                            <div>
                              <Chip
                                avatar={
                                  <Avatar
                                    src={doc.data().logo || defaultLogo}
                                    sx={{ bgcolor: red[500] }}
                                  />
                                }
                                label={statusLabelRequest[doc.data().status]}
                                color={
                                  statusRequest[doc.data().status] as tColor
                                }
                                variant='outlined'
                                sx={{ fontWeight: 500 }}
                              />
                            </div>
                            <Typography sx={sxRequestBoxInfo} component='div'>
                              {doc.data().organizationName}
                            </Typography>
                            <Typography sx={sxRequestBoxPhoneNumber}>
                              {doc.data().city} ({doc.data().phoneNumber})
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'grid', gap: '24px' }} />
                        </Box>
                        <Box sx={sxRequestBoxRightPanel}>
                          <Button
                            onClick={async () => {
                              await changeStatusRequest(
                                {
                                  ...doc.data(),
                                  docId: doc.id,
                                  role,
                                } as any,
                                'reject',
                                'request',
                              );
                            }}
                            sx={sxRejectBtn}
                          >
                            Отклонить
                          </Button>
                          <Button
                            onClick={async () => {
                              await changeStatusRequest(
                                {
                                  ...doc.data(),
                                  docId: doc.id,
                                  role,
                                } as any,
                                'approve',
                                'request',
                              );
                            }}
                            sx={sxAcceptBtn}
                          >
                            Принять
                          </Button>
                        </Box>
                      </Grid>
                    </>
                  )
                );
              })}
            </Grid>
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
            <Grid sx={sxEventGridItems}>
              {value.docs.map((doc) => {
                const docData = doc?.data();

                return (
                  docData?.status !== 'active' && (
                    <>
                      <Grid sx={sxRequestBoxContainer}>
                        <Box sx={sxRequestBoxLeftPanel}>
                          <Box sx={{ display: 'grid', gap: '4px' }}>
                            <div>
                              <Chip
                                avatar={
                                  <Avatar
                                    src={doc.data().logo || defaultLogo}
                                    sx={{ bgcolor: red[500] }}
                                  />
                                }
                                label={statusLabelRequest[doc.data().status]}
                                color={
                                  statusRequest[doc.data().status] as tColor
                                }
                                variant='outlined'
                                sx={{ fontWeight: 500 }}
                              />
                            </div>
                            <Typography sx={sxRequestBoxInfo} component='div'>
                              {doc.data().organizationName}
                            </Typography>
                            <Typography sx={sxRequestBoxPhoneNumber}>
                              {doc.data().city} ({doc.data().phoneNumber})
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'grid', gap: '24px' }} />
                        </Box>
                      </Grid>
                    </>
                  )
                );
              })}
            </Grid>
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

export default Requests;
