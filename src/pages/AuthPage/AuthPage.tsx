import { FC } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { auth } from 'core/lib/firebase';
import { CustomSendButton } from 'components/controls/Button/Button';
import Input from 'components/controls/Input/Input';
import { styledAuthContainer, styledForm, schema } from './AuthPage.internals';

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

  if (loading) return <p>Loading...</p>;
  if (error) {
    navigate('/error');
  }
  if (user) {
    navigate('/modDashboard');
  }

  const onSubmit = handleSubmit(({ login, password }) =>
    signInWithEmailAndPassword(login, password),
  );

  return (
    <Box component='div' sx={styledAuthContainer}>
      <Typography variant='h3' sx={{ margin: '48px 0' }}>
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
    </Box>
  );
};

export default AuthPage;
