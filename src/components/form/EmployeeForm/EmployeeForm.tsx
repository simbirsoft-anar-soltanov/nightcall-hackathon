import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Box, Alert, Snackbar } from '@mui/material';
import { FirebaseContext } from 'core/context/firebase';
import Input from 'components/controls/Input/Input';
import { CustomSendButton } from 'components/controls/Button/Button';
import { doesEmailExist } from 'core/services/firebase';
import { inputCollection, schema, styledForm } from './EmployeeForm.internals';

const EmployeeForm: FC = () => {
  const { firebase } = useContext(FirebaseContext);
  const [isAlreadyExists, setIsAlreadyExists] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = handleSubmit(
    async ({ email, password, name, surname, city, numberPhone }) => {
      const orgNameExists = await doesEmailExist(email);

      if (!orgNameExists) {
        try {
          const createdUserResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

          await createdUserResult.user.updateProfile({
            displayName: email,
          });

          await firebase.firestore().collection('users').add({
            id: createdUserResult.user.uid,
            email: email.toLowerCase(),
            name: name.toLowerCase(),
            surname: surname.toLowerCase(),
            city: city.toLowerCase(),
            numberPhone: numberPhone.toLowerCase(),
            role: 'Сотрудник',
          });

          navigate('/empDashboard');
        } catch (error: unknown) {
          navigate('/error');
        }
      }

      setIsAlreadyExists(orgNameExists);
    },
  );

  return (
    <>
      <Typography variant='h3' sx={{ margin: '24px 0 16px' }}>
        Регистрация сотрудника
      </Typography>
      <Box component='form' onSubmit={onSubmit} sx={styledForm}>
        {inputCollection.map(({ name, label }) => (
          <Input
            key={name}
            name={name}
            label={label}
            formError={errors?.[name]?.message}
            register={register}
          />
        ))}
        <CustomSendButton type='submit' variant='outlined' disabled={!isValid}>
          Зарегистрироваться
        </CustomSendButton>
        {isAlreadyExists && (
          <Snackbar
            open
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert severity='error' color='error'>
              Сотрудник уже зарегистрирована в системе!
            </Alert>
          </Snackbar>
        )}
      </Box>
    </>
  );
};

export default EmployeeForm;
