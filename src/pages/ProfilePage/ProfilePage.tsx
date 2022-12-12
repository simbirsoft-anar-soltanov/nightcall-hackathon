import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { sxIconButton } from './ProfilePage.internals';

const ProfilePage: FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'grid' }}>
      <IconButton
        sx={sxIconButton}
        onClick={() => navigate('/dashboard/org')}
        onKeyDown={({ key }) => key === 'Enter' && navigate('/dashboard/org')}
      >
        <ChevronLeftIcon />
        <Typography>Вернуться на главную страницу</Typography>
      </IconButton>
      Страница профиля
    </Box>
  );
};

export default ProfilePage;
