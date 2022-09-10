import { FC, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Link, Alert, Snackbar } from '@mui/material';
import { auth } from 'core/lib/firebase';
import { CustomSendButton } from 'components/controls/Button/Button';
import Input from 'components/controls/Input/Input';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import {
  styledAuthContainer,
  styledForm,
  schema,
  rolePath,
} from './AuthPage.internals';
import { User } from 'core/helpers/types';
import { getUserByUserId } from 'core/services/firebase';

const AuthPage: FC = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    document.title = 'Авторизация';
  }, []);

  if (loading) return <SpinnerWrap />;

  const onSubmit = handleSubmit(async ({ login, password }) => {
    signInWithEmailAndPassword(login, password);
  });

  if (user) {
    const getUserRole = async () => {
      const [getUser]: User[] = await getUserByUserId(user?.user?.uid);
      navigate(rolePath[getUser.role]);
    };

    getUserRole();
  }

  return (
    <Box component='div' sx={styledAuthContainer}>
      <Typography variant='h3' sx={{ margin: '24px 0 16px' }}>
        Вход на портал
      </Typography>
      <Box component='form' onSubmit={onSubmit} sx={styledForm}>
        <Input
          name='login'
          label='Адрес электронной почты'
          formError={errors.login?.message}
          register={register}
        />
        <Input
          name='password'
          label='Пароль'
          formError={errors.password?.message}
          register={register}
        />

        <CustomSendButton type='submit' variant='outlined' disabled={!isValid}>
          Войти в систему
        </CustomSendButton>
      </Box>
      <Box sx={{ marginTop: '16px' }}>
        <Link href='/singup' variant='body1'>
          У вас нет аккаунта? Зарегистрируйтесь
        </Link>
      </Box>
      {error && (
        <Snackbar
          open
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity='error' color='error'>
            Неверный адрес или пароль
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AuthPage;
