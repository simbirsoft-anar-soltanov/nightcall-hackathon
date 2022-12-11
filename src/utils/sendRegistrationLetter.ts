import { FieldValues } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { tAlert } from 'core/hooks/useAlert';

export const sendRegistrationLetter = (
  data: FieldValues,
  onHandleChangeAlert: (payload: tAlert) => void,
) => {
  emailjs
    .send('service_j8tzt17', 'template_blnojor', data, 'QyGabTAMctdYEJjMk')
    .then(
      () => {
        onHandleChangeAlert({
          status: 'success',
          title: 'Регистрация успешно выполнена',
        });
      },
      () => {
        onHandleChangeAlert({
          status: 'error',
          title: 'Не удалось зарегистрироваться в системе',
        });
      },
    );
};
