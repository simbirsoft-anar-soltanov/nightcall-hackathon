import { FieldValues } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { tAlert } from 'core/layout/DefaultLayout/components/Header/Header';

export const createSupportTicket = (
  data: FieldValues,
  onHandleChangeAlert: (payload: tAlert) => void,
) => {
  console.log('data', data);

  const mailAboutCreateTicket = emailjs.send(
    'service_fisxvc9',
    'template_atbnxru',
    data,
    'Tpzx2DPdMLgpZGiO7',
  );

  const mailAboutNewAppealForAdmin = emailjs.send(
    'service_fisxvc9',
    'template_gktmje8',
    data,
    'Tpzx2DPdMLgpZGiO7',
  );

  Promise.all([mailAboutCreateTicket, mailAboutNewAppealForAdmin]).then(
    () => {
      onHandleChangeAlert({
        status: 'success',
        title: 'Заявка успешно создана',
      });
    },
    () => {
      onHandleChangeAlert({
        status: 'error',
        title: 'Не удалось создать заявку',
      });
    },
  );
};
