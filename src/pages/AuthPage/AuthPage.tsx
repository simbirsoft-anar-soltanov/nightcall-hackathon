import { FC, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Box, Link } from '@mui/material';
import { auth } from 'core/lib/firebase';
import { CustomSendButton } from 'components/controls/Button/Button';
import Input from 'components/controls/Input/Input';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import SnackBar from 'components/indicators/SnackBar/SnackBar';
import { styledAuthContainer, styledForm, schema } from './AuthPage.internals';

const AuthPage: FC = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

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

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await signInWithEmailAndPassword(email, password);
  });

  return (
    <Box component='div' sx={styledAuthContainer}>
      <Typography variant='h3' sx={{ margin: '24px 0 16px' }}>
        Вход на портал
      </Typography>

      <Box component='form' onSubmit={onSubmit} sx={styledForm}>
        <Input
          name='email'
          label='Адрес электронной почты'
          formError={errors.email?.message as string}
          register={register}
        />
        <Input
          name='password'
          label='Пароль'
          formError={errors.password?.message as string}
          register={register}
        />

        <CustomSendButton type='submit' variant='outlined' disabled={!isValid}>
          Войти в систему
        </CustomSendButton>
      </Box>

      <Box sx={{ marginTop: '16px' }}>
        <Link href='/entry/sign-up' variant='body1'>
          У вас нет аккаунта? Зарегистрируйтесь
        </Link>
      </Box>

      {error && <SnackBar title='Неверный адрес или пароль' />}
    </Box>
  );
};

export default AuthPage;
