import { FC, MouseEventHandler } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Input from 'components/controls/Input/Input';
import { CustomSendButton } from 'components/controls/Button/Button';
import { createSupportTicket } from 'utils/createSupportTicket';
import { getTextAreaProps } from 'utils/getTextAreaProps';
import { ticketNumberGenerator } from 'utils/createTicketNumber';
import { tAlert } from 'core/hooks/useAlert';
import {
  inputCollection,
  schema,
  styledForm,
  styledTitle,
} from './SupportForm.internals';

type tSupportFormProps = {
  onHandleChangeAlert: (payload: tAlert) => void;
  handleClose: VoidFunction;
};

const SupportForm: FC<tSupportFormProps> = ({
  onHandleChangeAlert,
  handleClose,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      ticket_number: ticketNumberGenerator(),
    },
  });

  const onSubmit = handleSubmit((data) => {
    createSupportTicket(data, onHandleChangeAlert);
    handleClose();
  });

  const helperText = `${watch('descriptionOfTheProblem')?.length ?? 0}/255`;

  const onClickCloseModal: MouseEventHandler<HTMLButtonElement> = () => {
    handleClose();
  };

  return (
    <>
      <Box sx={styledTitle}>
        <Typography variant='h3'>Обращение в поддержку</Typography>
        <IconButton
          data-test-id='buttonClose-addIntegration'
          aria-label='close'
          onClick={onClickCloseModal}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box component='form' onSubmit={onSubmit} sx={styledForm}>
        {inputCollection.map(({ name, label, isSpellCheck }) => {
          const textAreaProps =
            name === 'descriptionOfTheProblem' && getTextAreaProps(helperText);

          return (
            <Input
              key={name}
              name={name}
              label={label}
              formError={errors?.[name]?.message as string}
              register={register}
              spellCheck={isSpellCheck}
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
