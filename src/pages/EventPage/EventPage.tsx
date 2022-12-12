import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import { UseUserType } from 'core/helpers/types';
import { rolePath } from 'pages/AuthPage/AuthPage.internals';

const EventPage: FC = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { role },
  }: UseUserType = useUser(loggedInUser?.uid);

  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'grid' }}>
      <IconButton
        sx={{
          padding: 0,
          width: 'max-content',
          color: '#3066CD',
          ['&:hover, &:active, &:focus, & .Mui-focusVisible']: {
            background: 'none',
          },
        }}
        onClick={() => navigate(rolePath[role], { replace: true })}
        onKeyDown={({ key }) =>
          key === 'Enter' && navigate(rolePath[role], { replace: true })
        }
      >
        <ChevronLeftIcon />
        <Typography>Вернуться назад</Typography>
      </IconButton>
      Страница мероприятия
    </Box>
  );
};

export default EventPage;
