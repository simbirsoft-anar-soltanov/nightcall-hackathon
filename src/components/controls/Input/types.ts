import { UseFormRegister, FieldValues } from 'react-hook-form';

export type tInputProps = {
  label: string;
  name: string;
  formError: string | undefined;
  register: UseFormRegister<FieldValues>;
};
