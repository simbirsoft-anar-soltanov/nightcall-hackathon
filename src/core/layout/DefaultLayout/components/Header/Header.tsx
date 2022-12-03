import { FC, useState, useEffect } from 'react';
import Firebase from 'firebase/compat/app';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Avatar,
  Alert,
  AlertColor,
} from '@mui/material';
import SnackBar from 'components/indicators/SnackBar/SnackBar';
import LogoutIcon from '@mui/icons-material/Logout';
import useModal from 'core/hooks/useModal';
import Dialog from 'components/controls/Dialog/Dialog';
import { useStyles } from '../../DefaultLayout.internals';
import SupportForm from 'components/form/SupportForm/SupportForm';
import logoIcon from 'assets/img/logo.png';
import { defaultAvatar } from 'core/constants/constants';
import { UseUserType } from 'core/helpers/types';
import {
  sxSupportBtn,
  sxSupportTitle,
  sxSupportWrap,
} from './Header.internals';

type tHeaderProps = {
  firebase: Firebase.app.App;
  loggedInUser: Firebase.User;
  user: UseUserType['user'];
};

export type tAlert = { status: string; title: string };

const Header: FC<tHeaderProps> = ({
  firebase,
  loggedInUser,
  user: { id, name, surname, organizationName, avatar },
}) => {
  const navigate = useNavigate();

  const { modal: isModalOpen, handleOpen, handleClose } = useModal();

  const [alert, setAlert] = useState<tAlert | null>(null);

  const onHandleChangeAlert = (payload: tAlert) => setAlert(payload);

  useEffect(() => {
    const clearAlert = setTimeout(() => setAlert(null), 5000);

    return () => {
      clearTimeout(clearAlert);
    };
  }, [alert]);

  const { header, headerContainer, logo, userBlock, userName } = useStyles();

  return (
    <Box className={`h-16 mb-8 p-4 lg:p-0 ${headerContainer}`}>
      <Box
        component='header'
        className='container mx-auto max-w-screen-lg h-full'
      >
        <Box className={header}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to='/'>
              <img src={logoIcon} alt='logo' className={logo} />
            </Link>

            <Typography sx={sxSupportTitle}>
              Обращайтесь по всем вопросам в поддержку SimbirHelp.
              <br />
              <Typography component='span'>
                Ответим в течении 24 часов.
              </Typography>
            </Typography>

            <Button sx={sxSupportBtn} onClick={() => handleOpen()}>
              Поддержка
            </Button>
          </Box>

          {loggedInUser && id && (
            <>
              <Box className={userBlock}>
                <Avatar src={avatar || defaultAvatar} alt={name} />
                <Typography className={userName}>
                  {organizationName && organizationName}
                  {name && surname && `${name} ${surname}`}
                </Typography>

                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() => {
                    firebase.auth().signOut();
                    navigate('/entry/auth');
                  }}
                  onKeyDown={({ key }) => {
                    if (key === 'Enter') {
                      firebase.auth().signOut();
                      navigate('/entry/auth');
                    }
                  }}
                >
                  <LogoutIcon sx={{ color: '#3066CD' }} />
                </IconButton>
              </Box>
            </>
          )}

          {isModalOpen && (
            <Dialog open={isModalOpen} onClose={handleClose}>
              <Box sx={sxSupportWrap}>
                <SupportForm
                  onHandleChangeAlert={onHandleChangeAlert}
                  handleClose={handleClose}
                />
              </Box>
            </Dialog>
          )}

          {alert?.status && (
            <SnackBar>
              <Alert severity={alert.status as AlertColor}>{alert.title}</Alert>
            </SnackBar>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
