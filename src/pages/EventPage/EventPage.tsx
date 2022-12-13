import { FC, useContext } from 'react';
import { Box } from '@mui/material';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import { UseUserType } from 'core/helpers/types';
import BackPage from 'components/view/BackPage/BackPage';

const EventPage: FC = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { role },
  }: UseUserType = useUser(loggedInUser?.uid);

  return (
    <Box sx={{ display: 'grid' }}>
      <BackPage role={role} />
      Страница мероприятия
    </Box>
  );
};

export default EventPage;
