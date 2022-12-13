import { FC, MouseEventHandler, ReactNode } from 'react';
import { Dialog as DialogMui, DialogContent } from '@mui/material';

type tDialogProps = {
  open: boolean;
  children: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
  isOpenSecondDialog?: boolean;
};

const sxDialogContent = {
  padding: { xs: '20px', xm: '34px', md: '44px' },
  overflow: 'auto',
};

const Dialog: FC<tDialogProps> = ({
  open,
  children,
  onClose,
  isOpenSecondDialog,
}) => (
  <DialogMui
    data-test-id='dialog'
    open={open}
    onClose={onClose}
    maxWidth='lg'
    disableScrollLock
    keepMounted
    style={{ zIndex: 1100, display: isOpenSecondDialog ? 'none' : 'block' }}
  >
    <DialogContent sx={sxDialogContent}>
      <>{children}</>
    </DialogContent>
  </DialogMui>
);

export default Dialog;
