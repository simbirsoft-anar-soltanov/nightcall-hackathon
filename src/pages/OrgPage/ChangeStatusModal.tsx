import { FC, useContext, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
} from '@mui/material';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import { sendOrderForChangeStatusOrg } from 'services/firebase';
import { schemaChangeStatus } from 'pages/OrgPage/OrgPage.internals';
import Input from 'components/controls/Input/Input';
import { CustomSendButton } from 'components/controls/Button/Button';
import { UseUserType } from 'helpers/types';
import {
  styledAuthContainer,
  styledForm,
} from 'pages/AuthPage/AuthPage.internals';

const fields = [
  { name: 'aboutSelf', label: 'Деятельность организации' },
  { name: 'organizationName', label: 'Название организации' },
];

type ChangeStatusModalProps = {
  open: boolean;
  onClose: VoidFunction;
};

const ChangeStatusModal: FC<ChangeStatusModalProps> = ({ open, onClose }) => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { id, ...dataOrg },
  }: UseUserType = useUser(loggedInUser?.uid);

  const [error, setError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    resolver: yupResolver(schemaChangeStatus),
    mode: 'all',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const isAddEvent = await sendOrderForChangeStatusOrg(data, dataOrg);

      return isAddEvent ? onClose() : setError(true);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth='md'>
        <Grid container alignItems='center' justifyContent='space-between'>
          <DialogTitle style={{ fontSize: '22px' }}>
            Получить доступ на создание заявок
          </DialogTitle>
          <Button onClick={onClose} autoFocus>
            Х
          </Button>
        </Grid>

        <DialogContent>
          <Box component='div' sx={styledAuthContainer}>
            <Box component='form' onSubmit={onSubmit} sx={styledForm}>
              {fields.map((field, index) => (
                <Input
                  key={index}
                  name={field.name}
                  label={field.label}
                  formError={errors[field.name]?.message as string}
                  register={register}
                />
              ))}
              <CustomSendButton
                type='submit'
                variant='outlined'
                disabled={!isValid}
              >
                Отправить
              </CustomSendButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {error && (
        <Snackbar
          open
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity='error' color='error'>
            Данные не сохранились
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default ChangeStatusModal;
