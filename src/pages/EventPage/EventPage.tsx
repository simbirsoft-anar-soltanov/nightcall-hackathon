import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const EventPage: FC = () => {
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
        onClick={() => navigate('/dashboard/org')}
        onKeyDown={({ key }) => key === 'Enter' && navigate('/dashboard/org')}
      >
        <ChevronLeftIcon />
        <Typography>Вернуться назад</Typography>
      </IconButton>
      Страница мероприятия
    </Box>
  );
};

export default EventPage;
