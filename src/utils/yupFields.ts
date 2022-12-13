import * as yup from 'yup';

const handleShortTextfield = (fieldName: string, minNumber: number) => {
  return `Слишком короткий ${fieldName}. Минимальный набор символов - ${minNumber}.`;
};

const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;

const phoneRegExp = /^((\+7|7|8)+([0-9]){10})$/;

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
    .matches(phoneRegExp, 'Недопустимые символы'),

  info: yup.string().required('Укажите название мероприятия'),
  category: yup.string().required('Укажите категорию мероприятия'),
  time: yup.string().required('Укажите длительность мероприятия'),
  time_start: yup.string().required('Укажите дату проведения'),
  must: yup.string().required('Укажите требования к волонтёру'),
  people_count: yup.number().typeError('Введите число').required(),
  aboutSelf: yup.string().required('Укажите деятельность организации'),

  supportForm: {
    user_name: yup.string(),
    ticket_number: yup.string(),
    user_email: yup.string().email().required('Введите почту'),
    themeOfTheAppeal: yup.string().required('Укажите тему обращения'),
    descriptionOfTheProblem: yup.string().required('Опишите проблему'),
  },

  filterForm: {
    search: yup.string().optional(),
    city: yup.string().optional(),
    startDate: yup.string().optional(),
    category: yup.string().optional(),
  },
};
