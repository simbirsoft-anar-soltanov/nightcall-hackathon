import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as PeoplesIcon } from 'assets/icons/peoples.svg';
import { ReactComponent as AcceptIcon } from 'assets/icons/accept.svg';
import { ReactComponent as SmileIcon } from 'assets/icons/smile.svg';

export const steps = [
  {
    icon: <CalendarIcon />,
    stepNumber: 1,
    title: 'Создайте заявку на проведение волонтёрского мероприятия',
  },
  {
    icon: <PeoplesIcon />,
    stepNumber: 2,
    title: 'Найдите тех, кто поможет вам в вашем нелегком деле',
  },
  {
    icon: <AcceptIcon />,
    stepNumber: 3,
    title: 'Отберите волонтёров необходимых для мероприятия',
  },
  {
    icon: <SmileIcon />,
    stepNumber: 4,
    title: 'Получите плюсик в карму и создавайте другие мероприятия',
  },
];
