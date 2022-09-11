import { useContext, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styledOrgContainer } from 'pages/OrgPage/OrgPage.internals';
import Grid from '@mui/material/Grid';
import OrderModal from 'pages/OrgPage/OrderModal';
import OrderList from 'pages/OrgPage/OrderList';
import { CustomOpenModalButton } from 'components/controls/Button/Button';
import { UserContext } from 'core/context/user';
import { UseUserType } from 'core/helpers/types';
import useUser from 'core/hooks/useUser';
import ChangeStatusModal from 'pages/OrgPage/ChangeStatusModal';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';

const OrgPage = () => {
  const [open, setOpen] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(true);
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { status },
  }: UseUserType = useUser(loggedInUser?.uid);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!status) return <SpinnerWrap />;

  return (
    <Box component='div' sx={styledOrgContainer}>
      {status === 'active' || status === 'reject' ? (
        <Grid container justifyContent='space-between' alignItems='center'>
          <Typography variant='h3' sx={{ margin: '5px 0 10px' }}>
            Страница организации
          </Typography>
          <CustomOpenModalButton onClick={() => setOpenChangeModal(true)}>
            Получить доступ
          </CustomOpenModalButton>
          <ChangeStatusModal
            open={openChangeModal}
            onClose={() => setOpenChangeModal(false)}
          />
        </Grid>
      ) : (
        <>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Typography variant='h3' sx={{ margin: '5px 0 10px' }}>
              Мои заявки
            </Typography>
            <CustomOpenModalButton onClick={handleClickOpen}>
              Создать заявку
            </CustomOpenModalButton>
          </Grid>
          <OrderList />
          <OrderModal open={open} onClose={handleClose} />
        </>
      )}
    </Box>
  );
};

export default OrgPage;
