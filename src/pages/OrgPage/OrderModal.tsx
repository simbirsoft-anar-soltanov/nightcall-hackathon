import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

interface OrderModal {
  open: boolean;
  onClose: () => void;
}

const OrderModal = (props: OrderModal) => {
  const { onClose, open } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant='h3'>Создать заявку</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Форма заявки</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;
