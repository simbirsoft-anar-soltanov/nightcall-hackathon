import * as yup from 'yup';
import { yupFields } from 'utils/yupFields';

const { organizationName, email, city, numberPhone } = yupFields;

const schema = yup
  .object({
    organizationName,
    email,
    city,
    numberPhone,
  })
  .required();

const inputCollection = [
  { name: 'organizationName', label: 'Имя организации' },
  { name: 'email', label: 'Адрес электронной почты' },
  { name: 'numberPhone', label: 'Номер телефона' },
  { name: 'city', label: 'Город' },
];

const styledForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
};

export { schema, inputCollection, styledForm };
