import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styledOrgContainer } from 'pages/OrgPage/OrgPage.internals';
import Grid from '@mui/material/Grid';
import OrderModal from 'pages/OrgPage/OrderModal';
import OrderList from 'pages/OrgPage/OrderList';
import { CustomOpenModalButton } from 'components/controls/Button/Button';

const OrgPage = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box component='div' sx={styledOrgContainer}>
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
    </Box>
  );
};

export default OrgPage;
