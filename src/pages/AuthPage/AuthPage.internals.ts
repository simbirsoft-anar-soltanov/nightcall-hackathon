import * as yup from 'yup';
import { FieldError } from 'react-hook-form';
import { yupFields } from 'utils/yupFields';

export type AuthFormValues = {
  email: string;
  password: string;
};

export type AuthFieldsError = {
  [index: string]: FieldError | undefined;
  [key: number]: FieldError;
  email?: FieldError;
  password?: FieldError;
};

const rolePath: Record<string, string> = {
  ['Модератор']: '/dashboard/mod',
  ['Организация']: '/dashboard/org',
  ['Сотрудник']: '/dashboard/emp',
};

const schema = yup
  .object({
    email: yupFields.email,
    password: yupFields.password,
  })
  .required();

const styledAuthContainer = {
  maxWidth: '600px',
  margin: '16px auto',
};

const styledForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: '42px',
};

export { rolePath, schema, styledAuthContainer, styledForm };
