import { FC, useContext, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  Box,
  Grid,
  Button,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Input from 'components/controls/Input/Input';
import { CustomSendButton } from 'components/controls/Button/Button';
import FileLoader from 'components/controls/FileLoader/FileLoader';
import { addEvent } from 'core/services/firebase';
import useUser from 'core/hooks/useUser';
import { UserContext } from 'core/context/user';
import { UseUserType } from 'core/helpers/types';
import { schema } from 'pages/OrgPage/OrgPage.internals';
import {
  styledAuthContainer,
  styledForm,
} from 'pages/AuthPage/AuthPage.internals';

const fields = [
  { name: 'info', label: 'Название мероприятия' },
  { name: 'category', label: 'Категория' },
  { name: 'time_start', label: 'Дата проведения' },
  { name: 'time', label: 'Длительность мероприятия' },
  { name: 'must', label: 'Требования к кандидату' },
  { name: 'people_count', label: 'Количество волонтеров' },
];

type OrderModalProps = {
  open: boolean;
  onClose: VoidFunction;
};

const OrderModal: FC<OrderModalProps> = ({ open, onClose }) => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { id },
  }: UseUserType = useUser(loggedInUser?.uid);

  const [error, setError] = useState<boolean>(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
      isAddEvent ? onClose() : setError(true);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth='md'
        fullScreen={fullScreen}
        disableScrollLock
      >
        <Grid container alignItems='center' justifyContent='space-between'>
          <DialogTitle style={{ fontSize: '22px' }}>Создать заявку</DialogTitle>
          <Button onClick={onClose} autoFocus>
            Х
          </Button>
        </Grid>

        <DialogContent>
          <Box component='div' sx={styledAuthContainer}>
            <Box component='form' onSubmit={onSubmit} sx={styledForm}>
              {fields.map(({ name, label }, index) => (
                <Input
                  key={index}
                  name={name}
                  label={label}
                  formError={errors[name]?.message as string}
                  register={register}
                />
              ))}

              <FileLoader />
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
