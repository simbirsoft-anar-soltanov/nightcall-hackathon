import { FC } from 'react';
import { useContext } from 'react';
import { Box, IconButton, Typography, Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'core/context/user';
import { FirebaseContext } from 'core/context/firebase';
import useUser from 'core/hooks/useUser';
import { useStyles } from '../../DefaultLayout.internals';
import { UseUserType } from 'core/helpers/types';
import logoIcon from 'assets/img/logo.png';

const Header: FC = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { id, name, surname, organizationName, avatar },
  }: UseUserType = useUser(loggedInUser?.uid);

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
              navigate('/auth');
            }}
            onKeyDown={({ key }) => {
              if (key === 'Enter') {
                firebase.auth().signOut();
                navigate('/auth');
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
