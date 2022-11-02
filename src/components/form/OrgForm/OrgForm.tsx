import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Box } from '@mui/material';
import { FirebaseContext } from 'core/context/firebase';
import { doesOrganizationNameExist } from 'core/services/firebase';
import Input from 'components/controls/Input/Input';
import Select from 'components/controls/Select/Select';
import { CustomSendButton } from 'components/controls/Button/Button';
import SnackBar from 'components/indicators/SnackBar/SnackBar';
import { defaultLogo } from 'core/constants/constants';
import { inputCollection, schema, styledForm } from './OrgForm.internals';

type tOrgFormProps = {
  isWithTitle?: boolean;
};

const OrgForm: FC<tOrgFormProps> = ({ isWithTitle }) => {
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
    async ({ email, password, organizationName, city, numberPhone }) => {
      const orgNameExists = await doesOrganizationNameExist(organizationName);

      if (!orgNameExists) {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        if (createdUserResult?.user) {
          await createdUserResult.user.updateProfile({
            displayName: organizationName,
          });

          await firebase.firestore().collection('users').add({
            id: createdUserResult.user.uid,
            avatar: defaultLogo,
            organizationName: organizationName.toLowerCase(),
            email: email.toLowerCase(),
            city: city.toLowerCase(),
            numberPhone: numberPhone.toLowerCase(),
            role: 'Организация',
            status: 'active',
          });

          navigate('/dashboard/org');
        }
      }

      setIsAlreadyExists(orgNameExists);
    },
  );

  return (
    <>
      {isWithTitle && (
        <Typography variant='h3' sx={{ margin: '24px 0 16px' }}>
          Регистрация организации
        </Typography>
      )}

      <Box component='form' onSubmit={onSubmit} sx={styledForm}>
        {inputCollection.map(({ name, label }) => {
          if (name === 'city')
            return (
              <Select
                key={name}
                name={name}
                label={label}
                formError={errors?.[name]?.message as string}
                register={register}
              />
            );

          return (
            <Input
              key={name}
              name={name}
              label={label}
              formError={errors?.[name]?.message as string}
              register={register}
            />
          );
        })}

        <CustomSendButton type='submit' variant='outlined' disabled={!isValid}>
          Зарегистрироваться
        </CustomSendButton>

        {isAlreadyExists && (
          <SnackBar title='Пользователь зарегистрирован в системе!' />
        )}
      </Box>
    </>
  );
};

export default OrgForm;
