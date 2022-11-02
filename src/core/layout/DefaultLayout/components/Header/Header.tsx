import { FC } from 'react';
import Firebase from 'firebase/compat/app';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Typography, Avatar } from '@mui/material';
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

const Header: FC<tHeaderProps> = ({
  firebase,
  loggedInUser,
  user: { id, name, surname, organizationName, avatar },
}) => {
  const navigate = useNavigate();

  const { modal: isModalOpen, handleOpen, handleClose } = useModal();

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
                <SupportForm handleClose={handleClose} />
              </Box>
            </Dialog>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
