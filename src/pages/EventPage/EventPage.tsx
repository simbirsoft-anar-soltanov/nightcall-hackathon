import { FC, useContext, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import BackPage from 'components/view/BackPage/BackPage';
import TitleHead from 'core/components/TitleHead/TitleHead';
import EventBoxItem from 'core/components/Event/EventBoxItem/EventBoxItem';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import Slider from 'core/components/Slider/Slider';
import OrgInfo from 'core/components/OrgInfo/OrgInfo';
import { getEventById } from 'core/services/events/getEventById';
import { orgInfoById } from 'core/services/org/orgInfo';
import { tDocumentEvent, tEvent, tUser, UseUserType } from 'core/helpers/types';
import { styledEmpContainer } from 'pages/EmployeePage/EmployeePage.internals';

type tEventPageProps = { eventId: string };

const EventPage: FC<tEventPageProps> = ({ eventId }) => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { role },
  }: UseUserType = useUser(loggedInUser?.uid);

  const [event, setEvent] = useState<tEvent[]>();
  const [orgInfo, setOrgInfo] = useState<tUser[]>();

  const getEvent = async () => {
    const result = await getEventById(eventId);

    if (result) setEvent(result);
  };

  const getUserInfo = async (orgId: string) => {
    const result = await orgInfoById(orgId);

    setOrgInfo(result);
  };

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    if (event?.length) {
      getUserInfo(event[0].organization_id);
    }
  }, [event]);

  if (!event) return <SpinnerWrap />;

  return (
    <Box component='div' sx={{ ...styledEmpContainer, gap: '24px' }}>
      <BackPage role={role} />

      <TitleHead title='Данные мероприятия' namePage='Страница мероприятия' />

      {event[0] && (
        <EventBoxItem item={event[0] as tDocumentEvent} isDetailsPage />
      )}

      {orgInfo?.length ? (
        <Box>
          <OrgInfo user={orgInfo[0]} isNotTitle isFullWidth />
        </Box>
      ) : null}

      <Box>
        <TitleHead title='Фотографии' namePage='' />
        <Slider />
      </Box>
    </Box>
  );
};

export default EventPage;
