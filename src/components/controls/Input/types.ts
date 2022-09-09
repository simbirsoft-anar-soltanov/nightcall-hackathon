import { UseFormRegister, FieldValues } from 'react-hook-form';

export type tNameInput = 'login' | 'password';

export type tInputProps = {
  label: string;
  formError: string | undefined;
  name: tNameInput;
  register: UseFormRegister<FieldValues>;
};
