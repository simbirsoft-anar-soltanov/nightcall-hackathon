import { FC, ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';

type tSnackBarProps = {
  title?: string;
  children?: ReactNode;
};

const SnackBar: FC<tSnackBarProps> = ({ title, children }) => (
  <Snackbar
    data-test-id='snackbar'
    open
    autoHideDuration={6000}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <div>
      {children ?? (
        <Alert severity='error' color='error'>
          {title}
        </Alert>
      )}
    </div>
  </Snackbar>
);

export default SnackBar;
