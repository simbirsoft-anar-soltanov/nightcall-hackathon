import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {
  BootstrapDialog,
  BootstrapDialogTitle,
  DialogDescrItem,
} from './ModalDialog.internals';

export type tModalDialogProps = {
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
        disableScrollLock
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          {event.organizationName}
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <DialogDescrItem name='Описание' value={event?.info} />

          <DialogDescrItem name='Требования к кандидату' value={event?.must} />

          <DialogDescrItem name='Категория' value={event?.category} />

          <DialogDescrItem
            name='Список участников'
            value={event?.people_count}
          />

          <DialogDescrItem name='Длительность' value={event?.time} />

          <DialogDescrItem name='Дата проведения' value={event?.time_start} />
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
