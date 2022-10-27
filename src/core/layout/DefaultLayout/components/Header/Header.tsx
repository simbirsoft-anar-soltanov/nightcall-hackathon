import { FC } from 'react';
import Firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import { Box, IconButton, Typography, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useStyles } from '../../DefaultLayout.internals';
import logoIcon from 'assets/img/logo.png';
import { UseUserType } from 'core/helpers/types';

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

  const { header, logo, userBlock, userName } = useStyles();

  return (
    <Box component='header' className={header}>
      <img src={logoIcon} alt='logo' className={logo} />

      {loggedInUser && id && (
        <Box className={userBlock}>
          <Avatar
            src={avatar || 'https://i.ibb.co/Lkz8LWW/default.png'}
            alt={name}
          />
          <Typography className={userName}>
            {organizationName && organizationName}
            {name && surname && `${name} ${surname}`}
          </Typography>

          <IconButton
            sx={{ padding: 0 }}
            onClick={() => {
              firebase.auth().signOut();
              navigate('/');
            }}
            onKeyDown={({ key }) => {
              if (key === 'Enter') {
                firebase.auth().signOut();
                navigate('/');
              }
            }}
          >
            <LogoutIcon sx={{ color: '#3066CD' }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Header;
