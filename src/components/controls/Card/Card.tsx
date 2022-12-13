import { FC, useState } from 'react';
import {
  Box,
  Button,
  CardActions,
  Chip,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
} from '@mui/material';
import { default as CardMui } from '@mui/material/Card';
import { red } from '@mui/material/colors';
import { changeStatusRequest } from 'core/services/requests/changeStatusRequest';
import ModalDialog from '../ModalDialog/ModalDialog';
import { defaultLogo, defaultPreviewPhoto } from 'core/constants/constants';
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
    role: string;
    logo?: string;
    category?: string[];
    aboutSelf?: string;
    previewPhoto?: string;
    email?: string;
    readyStatus?: string;
  };
  nameCollection?: string;
  onHandleJoinToEvent?: (event: any, isUnFollow?: boolean) => Promise<void>;
  isMyEvents?: boolean;
};

const Card: FC<tCardProps> = ({
  request,
  request: {
    organizationName,
    city,
    phoneNumber,
    logo,
    category,
    aboutSelf,
    previewPhoto,
    status,
    role,
    readyStatus,
  },
  nameCollection,
  onHandleJoinToEvent,
  isMyEvents,
}) => {
  const [openDialogModal, setOpenDialogModal] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenDialogModal(true);
  };
  const handleClose = () => {
    setOpenDialogModal(false);
  };

  return (
    <CardMui sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar src={logo || defaultLogo} sx={{ bgcolor: red[500] }}>
            {organizationName && organizationName[0]}
          </Avatar>
        }
        title={
          <Typography gutterBottom variant='h5' component='div'>
            {organizationName}
          </Typography>
        }
        subheader={
          status &&
          role !== 'Сотрудник' && (
            <Chip
              label={statusLabelRequest[status]}
              color={statusRequest[status] as tColor}
              variant='outlined'
              sx={{ fontWeight: 500 }}
            />
          )
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
          {category}
          {city && <Chip label={city} />}
          {phoneNumber && <Chip label={phoneNumber} />}
        </Box>
      </CardContent>
      {status === 'active' && role === 'Модератор' && (
        <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            size='small'
            color='primary'
            onClick={async () => {
              await changeStatusRequest(request, 'approve', nameCollection);
            }}
          >
            Подтвердить заявку
          </Button>
          <Button
            size='small'
            color='primary'
            onClick={async () => {
              await changeStatusRequest(request, 'reject', nameCollection);
            }}
          >
            Отклонить
          </Button>
        </CardActions>
      )}

      {readyStatus === 'ready' && !isMyEvents && (
        <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            size='small'
            color='primary'
            onClick={async () => {
              if (onHandleJoinToEvent) {
                await onHandleJoinToEvent(request);
              }
            }}
          >
            Принять участие
          </Button>
          <Button size='small' color='primary' onClick={handleClickOpen}>
            Подробнее
          </Button>
        </CardActions>
      )}

      {isMyEvents && (
        <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            size='small'
            color='primary'
            onClick={async () => {
              if (onHandleJoinToEvent) {
                await onHandleJoinToEvent(request, true);
              }
            }}
          >
            Отписаться от события
          </Button>
          <Button size='small' color='primary' onClick={handleClickOpen}>
            Подробнее
          </Button>
        </CardActions>
      )}
      <ModalDialog
        open={openDialogModal}
        handleClose={handleClose}
        event={request}
      />
    </CardMui>
  );
};

export default Card;
