import { FC, MouseEvent, useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import useTabs from 'core/hooks/useTabs';
import { changeEmployeeStatus } from 'core/services/firebase';
import TitleHead from 'core/components/TitleHead/TitleHead';
import EventBoxList from 'core/components/Event/EventBoxList/EventBoxList';
import Togggle from 'components/controls/Toggle/Toggle';
import { User } from 'helpers/types';
import {
  styledEmpContainer,
  sxEmpTab,
} from 'pages/EmployeePage/EmployeePage.internals';

type tEmployeePageProps = { user: User; uid: string };

const EmployeePage: FC<tEmployeePageProps> = ({
  user: { docId, statusReadyJoinToEvent },
  uid,
}) => {
  const [readyStatus, setReadyStatus] = useState<string>('');
  const { tab, onChangeTab } = useTabs();

  useEffect(() => {
    document.title = 'Страница сотрудника';
  }, []);

  useEffect(() => {
    statusReadyJoinToEvent && setReadyStatus(statusReadyJoinToEvent);
  }, [statusReadyJoinToEvent]);

  const handleChange = async (
    _: MouseEvent<HTMLElement>,
    newStatus: string,
  ) => {
    setReadyStatus(newStatus);
    await changeEmployeeStatus(docId, newStatus);
  };

  return (
    <Box component='div' sx={styledEmpContainer}>
      <TitleHead title='SimbirHelp' namePage='Страница сотрудника SimbirSoft' />

      <Grid container justifyContent='space-between' alignItems='center'>
        <Tabs value={tab} onChange={onChangeTab}>
          <Tab label='Все' sx={{ paddingLeft: 0, ...sxEmpTab }} />
          <Tab label='Активные' sx={sxEmpTab} />
          <Tab label='Откликнутые' sx={sxEmpTab} />
        </Tabs>
        <Togggle value={readyStatus} handleChange={handleChange} />
      </Grid>

      <EventBoxList tab={tab} docId={docId} uid={uid} />
    </Box>
  );
};

export default EmployeePage;
