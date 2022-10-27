import { FC, useState, useEffect, SyntheticEvent } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Link,
  Alert,
  Snackbar,
  Tabs,
  Tab,
} from '@mui/material';
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
import { roleOptionVariables } from 'pages/SignUpPage/SignUpPage.internals';

const AuthPage: FC = () => {
  const [isNotYourRole, setIsNotYourRole] = useState<boolean>(false);
  const [roleOption, setRoleOption] = useState<number>(0);

  const onChangeRoleOption = (_: SyntheticEvent, newValue: number) => {
    setRoleOption(newValue);
  };

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

  const onSubmit = handleSubmit(async ({ email, password }) => {
    signInWithEmailAndPassword(email, password);
  });

  if (user) {
    const getUserRole = async () => {
      const [getUser]: User[] = await getUserByUserId(user?.user?.uid);

      const isCurrentRole = roleOptionVariables[roleOption] === getUser.role;

      isCurrentRole
        ? navigate(rolePath[getUser.role] ?? '/errorBoundary')
        : setIsNotYourRole(true);
    };

    getUserRole();
  }

  return (
    <Box component='div' sx={styledAuthContainer}>
      <Typography variant='h3' sx={{ margin: '24px 0 16px' }}>
        Вход на портал
      </Typography>

      <Box
        sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '16px' }}
      >
        <Tabs value={roleOption} onChange={onChangeRoleOption}>
          <Tab label='Организация' sx={{ paddingLeft: 0 }} />
          <Tab label='Сотрудник' />
          <Tab label='Модератор' />
        </Tabs>
      </Box>

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
        <Link href='/signup' variant='body1'>
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

      {isNotYourRole && (
        <Snackbar
          open
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity='error' color='error'>
            Выберите доступную для Вас роль
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AuthPage;
