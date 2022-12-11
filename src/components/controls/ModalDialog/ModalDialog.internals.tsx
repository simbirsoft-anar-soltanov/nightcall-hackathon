import { FC, PropsWithChildren } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Theme } from '@mui/system';

export type DialogTitleProps = PropsWithChildren<{
  id: string;
  onClose: () => void;
}>;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const sxIconBtnDialog = {
  position: 'absolute',
  right: 8,
  top: 8,
  color: (theme: Theme) => theme.palette.grey[500],
};

const BootstrapDialogTitle = ({
  children,
  onClose,
  ...other
}: DialogTitleProps) => (
  <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
    {children}

    {onClose && (
      <IconButton aria-label='close' onClick={onClose} sx={sxIconBtnDialog}>
        <CloseIcon />
      </IconButton>
    )}
  </DialogTitle>
);

type tDialogDescrItemProps = { name: string; value: string };

const DialogDescrItem: FC<tDialogDescrItemProps> = ({ name, value }) => {
  return (
    <>
      <Typography variant='h4'>
        {name}: <br />
      </Typography>

      <Typography gutterBottom>{value}</Typography>
    </>
  );
};

export {
  BootstrapDialog,
  sxIconBtnDialog,
  BootstrapDialogTitle,
  DialogDescrItem,
};
