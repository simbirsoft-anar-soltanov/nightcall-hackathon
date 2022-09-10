import { UseFormRegister, FieldValues } from 'react-hook-form';

export type tInputProps = {
  label: string;
  formError: string | undefined;
  name: string;
  register: UseFormRegister<FieldValues>;
};
