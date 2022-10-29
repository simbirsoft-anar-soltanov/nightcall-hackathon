import { FC, MouseEventHandler, ReactNode } from 'react';
import { Dialog as DialogMui, DialogContent } from '@mui/material';

type tDialogProps = {
  open: boolean;
  children: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
  isOpenSecondDialog?: boolean;
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
    keepMounted
    maxWidth='lg'
    style={{
      zIndex: 1100,
      display: isOpenSecondDialog ? 'none' : 'block',
    }}
  >
    <DialogContent
      sx={{
        padding: { xs: '20px', xm: '34px', md: '44px' },
        overflow: 'auto',
      }}
    >
      <>{children}</>
    </DialogContent>
  </DialogMui>
);

export default Dialog;
