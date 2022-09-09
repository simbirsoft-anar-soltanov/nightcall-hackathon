import * as yup from 'yup';
import { FieldError } from 'react-hook-form';
import { yupFields } from 'utils/yupFields';

export const styledForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: '44px',
};

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

export const schema = yup
  .object({
    login: yupFields.login,
    password: yupFields.password,
  })
  .required();
