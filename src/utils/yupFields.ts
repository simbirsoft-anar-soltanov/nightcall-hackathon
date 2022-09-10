import * as yup from 'yup';

const handleShortTextfield = (fieldName: string, minNumber: number) => {
  return `Слишком короткий ${fieldName}. Минимальный набор символов - ${minNumber}.`;
};

const loginRegExp = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;

export const yupFields = {
  login: yup
    .string()
    .required('Введите логин')
    .test('is-email', 'Введите корректный email или логин', (value) => {
      if (value) {
        return value.includes('@')
          ? yup.string().email().isValidSync(value)
          : yup
              .string()
              .min(5, handleShortTextfield('логин', 5))
              .matches(loginRegExp, 'Недопустимый формат логина')
              .isValidSync(value);
      }
      return true;
    }),
  password: yup
    .string()
    .required('Введите пароль')
    .min(6, handleShortTextfield('пароль', 6))
    .max(26),
  organizationName: yup.string().required('Введите название организации'),
  city: yup.string().required('Укажите город'),
  email: yup.string().email().required('Введите почту'),
  numberPhone: yup.string().required('Введите номер телефона'),
};
