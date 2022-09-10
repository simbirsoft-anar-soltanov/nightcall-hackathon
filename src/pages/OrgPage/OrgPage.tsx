import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styledOrgContainer } from 'pages/OrgPage/OrgPage.internals';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import OrderModal from 'pages/OrgPage/OrderModal';
import OrderList from 'pages/OrgPage/OrderList';

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
      <Grid container justifyContent='space-between'>
        <Typography variant='h3' sx={{ margin: '48px 0' }}>
          Мои заявки
        </Typography>
        <Button onClick={handleClickOpen}>Создать заявку</Button>
      </Grid>
      <OrderList />
      <OrderModal open={open} onClose={handleClose} />
    </Box>
  );
};

export default OrgPage;
