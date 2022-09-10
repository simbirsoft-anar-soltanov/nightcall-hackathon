import CustomLink from 'components/controls/Link/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CustomChip } from 'components/controls/Chip/Chip';
import { Typography } from '@mui/material';

const OrderList = () => {
  return (
    <div>
      <CustomLink to='/'>
        <Card sx={{ minWidth: 275, mb: 1.5 }}>
          <CardContent>
            <CustomChip label='Категория 2' />
            <Typography sx={{ fontSize: 14 }} color='text.secondary'>
              г. Москва
            </Typography>
            <Typography
              variant='h5'
              component='div'
              sx={{ mb: 1.5 }}
              color='primary.main'
            >
              Акция волонтерской помощи пожилым людям и инвалидам по уборке
              снега «Снежный десант»
            </Typography>
            <Typography variant='body2'>
              <strong>Где:</strong> Орлово-Розовской библиотеки-ф. №19
            </Typography>
            <Typography variant='body2'>
              <strong>Когда:</strong> 12 февраля в 19:00
            </Typography>
            <Typography variant='body2'>
              <strong>Длительность:</strong> 1 час
            </Typography>
            <Typography variant='body2'>
              <strong>Количество участников:</strong> 11
            </Typography>
          </CardContent>
        </Card>
      </CustomLink>
      <CustomLink to='/'>
        <Card sx={{ minWidth: 275, mb: 1.5 }}>
          <CardContent>
            <CustomChip label='Категория 2' />
            <Typography sx={{ fontSize: 14 }} color='text.secondary'>
              г. Москва
            </Typography>
            <Typography
              variant='h5'
              component='div'
              sx={{ mb: 1.5 }}
              color='primary.main'
            >
              Акция волонтерской помощи пожилым людям и инвалидам по уборке
              снега «Снежный десант»
            </Typography>
            <Typography variant='body2'>
              <strong>Где:</strong> Орлово-Розовской библиотеки-ф. №19
            </Typography>
            <Typography variant='body2'>
              <strong>Когда:</strong> 12 февраля в 19:00
            </Typography>
            <Typography variant='body2'>
              <strong>Длительность:</strong> 1 час
            </Typography>
            <Typography variant='body2'>
              <strong>Количество участников:</strong> 11
            </Typography>
          </CardContent>
        </Card>
      </CustomLink>
    </div>
  );
};

export default OrderList;
