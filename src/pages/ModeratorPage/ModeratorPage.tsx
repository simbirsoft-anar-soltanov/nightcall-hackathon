import { FC, SyntheticEvent, useState } from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import Events from './components/Events/Events';
import Requests from './components/Requests/Requests';
import {
  styledModeratorContainer,
  typeModerationVariables,
} from './ModeratorPage.internals';

const ModeratorPage: FC = () => {
  const [typeModeration, setTypeModeration] = useState<number>(0);

  const onChangeTypeModeration = (_: SyntheticEvent, newValue: number) => {
    setTypeModeration(newValue);
  };

  const isEvent = typeModerationVariables[typeModeration] === 'event';

  return (
    <Box component='div' sx={styledModeratorContainer}>
      <Typography variant='h3' sx={{ margin: '24px 0 16px' }}>
        Страница Модератора
      </Typography>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '16px' }}
      >
        <Tabs value={typeModeration} onChange={onChangeTypeModeration}>
          <Tab label='Заявки организаций' sx={{ paddingLeft: 0 }} />
          <Tab label='Заявки на создание мероприятия' />
        </Tabs>
      </Box>

      {isEvent ? <Events /> : <Requests />}
    </Box>
  );
};

export default ModeratorPage;
