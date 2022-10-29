import { FC, MouseEventHandler } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Input from 'components/controls/Input/Input';
import { CustomSendButton } from 'components/controls/Button/Button';
import {
  inputCollection,
  schema,
  styledForm,
  styledTitle,
} from './SupportForm.internals';

type tSupportFormProps = {
  handleClose: MouseEventHandler<HTMLButtonElement>;
};

const SupportForm: FC<tSupportFormProps> = ({ handleClose }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = handleSubmit((data) => console.log('data', data));

  const helperText = `${watch('descriptionOfTheProblem')?.length ?? 0}/255`;

  return (
    <>
      <Box sx={styledTitle}>
        <Typography variant='h3'>Обращение в поддержку</Typography>
        <IconButton
          data-test-id='buttonClose-addIntegration'
          aria-label='close'
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component='form' onSubmit={onSubmit} sx={styledForm}>
        {inputCollection.map(({ name, label }) => {
          const textAreaProps = name === 'descriptionOfTheProblem' && {
            multiline: true,
            rows: 4,
            maxRows: 6,
            inputProps: { maxLength: 255 },
            helperText,
          };

          return (
            <Input
              key={name}
              name={name}
              label={label}
              formError={errors?.[name]?.message as string}
              register={register}
              {...textAreaProps}
            />
          );
        })}

        <CustomSendButton type='submit' variant='outlined' disabled={!isValid}>
          Отправить обращение
        </CustomSendButton>
      </Box>
    </>
  );
};

export default SupportForm;
