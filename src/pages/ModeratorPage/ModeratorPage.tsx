import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TitleHead from 'core/components/TitleHead/TitleHead';
import Events from './components/Events/Events';
import Requests from './components/Requests/Requests';
import { typeModerationVariables } from './ModeratorPage.internals';
import { styledContainer } from 'pages/OrgPage/OrgPage.internals';

const ModeratorPage: FC = () => {
  const [typeModeration, setTypeModeration] = useState<number>(0);

  useEffect(() => {
    document.title = 'Страница Модератора';
  }, []);

  const onChangeTypeModeration = (_: SyntheticEvent, newValue: number) => {
    setTypeModeration(newValue);
  };

  const isEvent = typeModerationVariables[typeModeration] === 'event';

  return (
    <Box component='div' sx={styledContainer}>
      <TitleHead title='Мероприятия' namePage='Страница Модератора' />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
