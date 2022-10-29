import * as yup from 'yup';
import { yupFields } from 'utils/yupFields';

const { themeOfTheAppeal, descriptionOfTheProblem } = yupFields;

const schema = yup
  .object({
    themeOfTheAppeal,
    descriptionOfTheProblem,
  })
  .required();

const inputCollection = [
  { name: 'themeOfTheAppeal', label: 'Тема' },
  { name: 'descriptionOfTheProblem', label: 'Описание проблемы' },
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
