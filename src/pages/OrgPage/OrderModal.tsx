import Dialog from '@mui/material/Dialog';
import { Alert, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import {
  styledAuthContainer,
  styledForm,
} from 'pages/AuthPage/AuthPage.internals';
import { schema } from 'pages/OrgPage/OrgPage.internals';
import { Box, Grid } from '@mui/material';
import Input from 'components/controls/Input/Input';
import { CustomSendButton } from 'components/controls/Button/Button';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { addEvent } from 'core/services/firebase';
import { useContext, useState } from 'react';
import { UseUserType } from 'core/helpers/types';
import useUser from 'core/hooks/useUser';
import { UserContext } from 'core/context/user';

interface OrderModal {
  open: boolean;
  onClose: () => void;
}

const OrderModal = (props: OrderModal) => {
  const { onClose, open } = props;
  const [error, setError] = useState(false);
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { id },
  }: UseUserType = useUser(loggedInUser?.uid);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const isAddEvent = await addEvent(data, id);
      if (isAddEvent) {
        onClose();
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  });

  const fields = [
    { name: 'info', label: 'Название мероприятия' },
    { name: 'category', label: 'Категория' },
    { name: 'time_start', label: 'Дата проведения' },
    { name: 'time', label: 'Длительность мероприятия' },
    { name: 'must', label: 'Требования к кандидату' },
    { name: 'people_count', label: 'Количество волонтеров' },
  ];

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth='md'>
        <Grid container alignItems='center' justifyContent='space-between'>
          <DialogTitle style={{ fontSize: '22px' }}>Создать заявку</DialogTitle>
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
                  formError={errors[field.name]?.message}
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

export default OrderModal;
