import * as yup from 'yup';

const handleShortTextfield = (fieldName: string, minNumber: number) => {
  return `Слишком короткий ${fieldName}. Минимальный набор символов - ${minNumber}.`;
};

const passwordRegExp =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const yupFields = {
  email: yup.string().email().required('Введите почту'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(6, handleShortTextfield('пароль', 6))
    .max(26)
    .matches(passwordRegExp, 'Недопустимый формат пароля'),
  organizationName: yup.string().required('Введите название организации'),
  city: yup.string().required('Укажите город'),
  numberPhone: yup
    .string()
    .required('Введите номер телефона')
    .min(12)
    .max(13)
    .matches(phoneRegExp, 'Недопустимые символы'),
  info: yup.string().required('Укажите название мероприятия'),
  category: yup.string().required('Укажите категорию мероприятия'),
  time: yup.string().required('Укажите длительность мероприятия'),
  time_start: yup.string().required('Укажите дату проведения'),
  must: yup.string(),
  people_count: yup.number(),
};
