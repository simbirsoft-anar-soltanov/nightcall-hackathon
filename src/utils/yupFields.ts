import * as yup from 'yup';

const handleShortTextfield = (fieldName: string, minNumber: number) => {
  return `Слишком короткий ${fieldName}. Минимальный набор символов - ${minNumber}.`;
};

const loginRegExp = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;

const passwordRegExp =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

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
    .min(8, handleShortTextfield('пароль', 8))
    .max(26)
    .matches(passwordRegExp, 'Недопустимый формат пароля'),
};
