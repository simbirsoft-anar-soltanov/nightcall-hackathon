import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

type tModalDialogProps = {
  open: boolean;
  handleClose: () => void;
  event: any;
};

const ModalDialog = ({ open, handleClose, event }: tModalDialogProps) => {
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          {event.organizationName}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant='h4'>
            Описание: <br />
          </Typography>
          <Typography gutterBottom>{event?.info}</Typography>
          <Typography variant='h4'>
            Требования к кандидату: <br />
          </Typography>
          <Typography gutterBottom>{event?.must}</Typography>
          <Typography variant='h4'>
            Категория: <br />
          </Typography>
          <Typography gutterBottom>{event?.category}</Typography>
          <Typography variant='h4'>
            Список участников: <br />
          </Typography>
          <Typography gutterBottom>{event?.people_count}</Typography>
          <Typography variant='h4'>
            Длительность: <br />
          </Typography>
          <Typography gutterBottom>{event?.time}</Typography>
          <Typography variant='h4'>
            Дата проведения: <br />
          </Typography>
          <Typography gutterBottom>{event?.time_start}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Закрыть
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default ModalDialog;
