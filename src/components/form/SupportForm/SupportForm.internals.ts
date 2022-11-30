import * as yup from 'yup';
import { yupFields } from 'utils/yupFields';

const {
  supportForm: {
    user_name,
    user_email,
    themeOfTheAppeal,
    descriptionOfTheProblem,
  },
} = yupFields;

const schema = yup
  .object({
    user_name,
    user_email,
    themeOfTheAppeal,
    descriptionOfTheProblem,
  })
  .required();

const inputCollection = [
  { name: 'user_name', label: 'Ваше имя' },
  { name: 'user_email', label: 'Адрес электронной почты' },
  { name: 'themeOfTheAppeal', label: 'Тема', isSpellCheck: true },
  {
    name: 'descriptionOfTheProblem',
    label: 'Описание проблемы',
    isSpellCheck: true,
  },
];

const styledForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
};

const styledTitle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  mb: '24px',
};

export { schema, inputCollection, styledForm, styledTitle };
