import { FieldValues } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { tAlert } from 'core/hooks/useAlert';

export const createSupportTicket = (
  data: FieldValues,
  onHandleChangeAlert: (payload: tAlert) => void,
) => {
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
