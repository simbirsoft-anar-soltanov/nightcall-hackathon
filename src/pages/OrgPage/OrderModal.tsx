import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import {
  styledAuthContainer,
  styledForm,
} from 'pages/AuthPage/AuthPage.internals';
import { schema } from 'pages/OrgPage/OrgPage.internals';
import { Box, Typography } from '@mui/material';
import Input from 'components/controls/Input/Input';
import { CustomSendButton } from 'components/controls/Button/Button';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { addEvent } from 'core/services/firebase';

interface OrderModal {
  open: boolean;
  onClose: () => void;
}

const OrderModal = (props: OrderModal) => {
  const { onClose, open } = props;

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
      await addEvent(data);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Создать заявку
        <Button onClick={onClose} autoFocus>
          Х
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box component='div' sx={styledAuthContainer}>
          <Typography variant='h3' sx={{ margin: '24px 0 16px' }}>
            Вход на портал
          </Typography>
          <Box component='form' onSubmit={onSubmit} sx={styledForm}>
            <Input
              name='info'
              label='Название мероприятия'
              formError={errors.info?.message}
              register={register}
            />
            <Input
              name='category'
              label='Категория'
              formError={errors.category?.message}
              register={register}
            />
            <Input
              name='time_start'
              label='Дата проведения'
              formError={errors.time_start?.message}
              register={register}
            />
            <Input
              name='must'
              label='Требования к кандидату'
              formError={errors.must?.message}
              register={register}
            />
            <Input
              name='people_count'
              label='Количество волонтеров'
              formError={errors.people_count?.message}
              register={register}
            />

            <CustomSendButton
              type='submit'
              variant='outlined'
              disabled={!isValid}
            >
              Подать заявку
            </CustomSendButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
