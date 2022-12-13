import { FC, useContext } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Box, Alert, AlertColor } from '@mui/material';
import { FirebaseContext } from 'core/context/firebase';
import { doesOrganizationNameExist } from 'core/services/firebase';
import Dialog from 'components/controls/Dialog/Dialog';
import Input from 'components/controls/Input/Input';
import Select from 'components/controls/Select/Select';
import { CustomSendButton } from 'components/controls/Button/Button';
import SnackBar from 'components/indicators/SnackBar/SnackBar';
import useModal from 'core/hooks/useModal';
import { useAlert } from 'core/hooks/useAlert';
import { defaultLogo } from 'core/constants/constants';
import { genPassword } from 'utils/genPassword';
import { sendRegistrationLetter } from 'utils/sendRegistrationLetter';
import { inputCollection, schema, styledForm } from './OrgForm.internals';

type tOrgFormProps = {
  isWithTitle?: boolean;
};

const OrgForm: FC<tOrgFormProps> = ({ isWithTitle }) => {
  const { firebase } = useContext(FirebaseContext);
  const { modal: isOpenSuccessSignUp, handleOpen, handleClose } = useModal();
  const { alert, onHandleChangeAlert } = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = handleSubmit(async (fieldValues) => {
    const { email, organizationName, city, numberPhone } = fieldValues;

    const password = genPassword();

    const orgNameExists = await doesOrganizationNameExist(organizationName);

    if (!orgNameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult?.user?.updateProfile({
          displayName: organizationName,
        });

        reset();
        handleOpen();

        await firebase.firestore().collection('users').add({
          id: createdUserResult?.user?.uid,
          organization_id: createdUserResult?.user?.uid,
          avatar: defaultLogo,
          email: email.toLowerCase(),
          organizationName,
          city,
          numberPhone: numberPhone.toLowerCase(),
          role: 'Организация',
          status: 'active',
        });

        const payloadLetter = { ...fieldValues, password };

        sendRegistrationLetter(payloadLetter, onHandleChangeAlert);
      } catch (error: unknown) {
        reset({});
      }
    } else {
      onHandleChangeAlert({
        status: 'error',
        title: 'Пользователь зарегистрирован в системе!',
      });
    }
  });

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

        {alert?.status && (
          <SnackBar>
            <Alert severity={alert.status as AlertColor}>{alert.title}</Alert>
          </SnackBar>
        )}

        {isOpenSuccessSignUp && (
          <Dialog open={isOpenSuccessSignUp} onClose={handleClose}>
            <Box sx={{ display: 'grid', gap: '24px' }}>
              <Typography variant='h3'>
                Вы успешно зарегистрировались в системе!
              </Typography>

              <Typography variant='body1'>
                Вам поступит письмо на указанную почту с паролем от учётной
                записи и ссылкой для входа в систему.
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CustomSendButton
                  variant='outlined'
                  onClick={() => handleClose()}
                  stylization={{ height: 'auto' }}
                >
                  Закрыть
                </CustomSendButton>
              </Box>
            </Box>
          </Dialog>
        )}
      </Box>
    </>
  );
};

export default OrgForm;
