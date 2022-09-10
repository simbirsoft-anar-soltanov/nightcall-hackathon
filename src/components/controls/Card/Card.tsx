import { FC } from 'react';
import { Box, Button, CardActions, Chip } from '@mui/material';
import { default as CardMui } from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { changeStatusRequest } from 'core/services/firebase';
import {
  statusLabelRequest,
  statusRequest,
  tColor,
} from 'pages/ModeratorPage/ModeratorPage.internals';

export type tCardProps = {
  request: {
    docId: string;
    requestId: string;
    city: string;
    phoneNumber: string;
    organizationName: string;
    status: string;
    logo?: string;
    category?: string[];
    aboutSelf?: string;
    previewPhoto?: string;
    email?: string;
  };
};

const defaultLogo =
  'https://i.ibb.co/pdVMWGR/png-clipart-computer-icons-child-desktop-volunteering-child-child-text.png';
const defaultPreviewPhoto = 'https://i.ibb.co/gMSX8Xs/eco-volonterstvo.jpg';

const Card: FC<tCardProps> = ({
  request: {
    docId,
    organizationName,
    city,
    phoneNumber,
    logo,
    category,
    aboutSelf,
    previewPhoto,
    status,
  },
}) => {
  return (
    <CardMui sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar src={logo || defaultLogo} sx={{ bgcolor: red[500] }}>
            {organizationName[0]}
          </Avatar>
        }
        title={
          <Typography gutterBottom variant='h5' component='div'>
            {organizationName}
          </Typography>
        }
        subheader={
          <Chip
            label={statusLabelRequest[status]}
            color={statusRequest[status] as tColor}
            variant='outlined'
            sx={{ fontWeight: 500 }}
          />
        }
      />
      <CardMedia
        component='img'
        image={previewPhoto || defaultPreviewPhoto}
        alt='previewPhoto'
        sx={{ height: '200px' }}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {aboutSelf}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginTop: '1rem',
          }}
        >
          {category?.join('')}
          {city && <Chip label={city} />}
          {phoneNumber && <Chip label={phoneNumber} />}
        </Box>
      </CardContent>
      {status === 'active' && (
        <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            size='small'
            color='primary'
            onClick={async () => {
              await changeStatusRequest(docId, 'approve');
            }}
          >
            Подтвердить заявку
          </Button>
          <Button
            size='small'
            color='primary'
            onClick={async () => {
              await changeStatusRequest(docId, 'reject');
            }}
          >
            Отклонить
          </Button>
        </CardActions>
      )}
    </CardMui>
  );
};

export default Card;
