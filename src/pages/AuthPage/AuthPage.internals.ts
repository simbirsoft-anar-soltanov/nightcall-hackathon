import * as yup from 'yup';
import { FieldError } from 'react-hook-form';
import { yupFields } from 'utils/yupFields';

export type AuthFormValues = {
  login: string;
  password: string;
};

export type AuthFieldsError = {
  [index: string]: FieldError | undefined;
  [key: number]: FieldError;
  login?: FieldError;
  password?: FieldError;
};

const schema = yup
  .object({
    login: yupFields.login,
    password: yupFields.password,
  })
  .required();

const styledAuthContainer = {
  maxWidth: '600px',
  margin: '24px auto',
};

const styledForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: '42px',
};

export { schema, styledAuthContainer, styledForm };
