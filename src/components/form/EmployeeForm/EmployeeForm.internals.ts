import * as yup from 'yup';
import { yupFields } from 'utils/yupFields';

const { email, password, city, numberPhone } = yupFields;

const schema = yup
  .object({
    email,
    password,
    city,
    numberPhone,
  })
  .required();

const inputCollection = [
  { name: 'name', label: 'Имя' },
  { name: 'surname', label: 'Фамилия' },
  { name: 'email', label: 'Адрес электронной почты' },
  { name: 'password', label: 'Пароль' },
  { name: 'city', label: 'Город' },
  { name: 'numberPhone', label: 'Номер телефона' },
];

const styledForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
};

export { schema, inputCollection, styledForm };
