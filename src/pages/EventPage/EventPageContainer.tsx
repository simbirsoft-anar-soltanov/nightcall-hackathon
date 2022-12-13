import { FC } from 'react';
import { useParams } from 'react-router-dom';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import EventPage from './EventPage';

const EventPageContainer: FC = () => {
  const { id: eventId } = useParams();

  if (!eventId) return <SpinnerWrap />;

  return <EventPage eventId={eventId} />;
};

export default EventPageContainer;
