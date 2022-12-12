import { FC, useState, useContext, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { UserContext } from 'core/context/user';
import TitleHead from 'core/components/TitleHead/TitleHead';
import ChangeStatusModal from 'core/components/ChangeStatusModal/ChangeStatusModal';
import OrderBoxList from 'core/components/Order/OrderBoxList/OrderBoxList';
import OrgInfo from 'core/components/OrgInfo/OrgInfo';
import OrderModal from 'core/components/Order/OrderModal/OrderModal';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import { CustomOpenModalButton } from 'components/controls/Button/Button';
import useUser from 'core/hooks/useUser';
import useTabs from 'core/hooks/useTabs';
import useModal from 'core/hooks/useModal';
import { UseUserType } from 'core/helpers/types';
import {
  styledContainer,
  sxOrgTab,
  sxOrgAddRequest,
} from 'pages/OrgPage/OrgPage.internals';

const OrgPage: FC = () => {
  const [openChangeModal, setOpenChangeModal] = useState<boolean>(true);

  const { modal: open, handleOpen, handleClose } = useModal();
  const { tab, onChangeTab } = useTabs();

  const { user: loggedInUser } = useContext(UserContext);

  const {
    user,
    user: { status },
  }: UseUserType = useUser(loggedInUser?.uid);

  useEffect(() => {
    document.title = 'Страница организации';
  }, []);

  if (!user) return <SpinnerWrap />;

  return (
    <Box component='div' sx={styledContainer}>
      <TitleHead title='Мероприятия' namePage='Страница организации' />

      {status === 'active' || status === 'reject' ? (
        <Grid container justifyContent='flex-end' alignItems='center'>
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
            <Tabs value={tab} onChange={onChangeTab}>
              <Tab label='Активные' sx={{ paddingLeft: 0, ...sxOrgTab }} />
              <Tab label='На модерации' sx={sxOrgTab} />
              <Tab label='Отклонены' sx={sxOrgTab} />
            </Tabs>

            <Button
              variant='text'
              component='span'
              sx={sxOrgAddRequest}
              onClick={handleOpen}
            >
              <Typography
                component='span'
                sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}
              >
                +
              </Typography>
              Создать заявку
            </Button>
          </Grid>

          <OrderBoxList tab={tab} />

          <OrderModal open={open} onClose={handleClose} />
        </>
      )}

      <OrgInfo user={user} />
    </Box>
  );
};

export default OrgPage;
