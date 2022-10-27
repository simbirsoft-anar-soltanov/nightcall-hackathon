import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import OrgForm from 'components/form/OrgForm/OrgForm';
import likeIcon from 'assets/img/like.png';
import userIcon from 'assets/img/hearth.png';
import { sxRegistrationTitle, useStyles } from './Registration.internals';

const Registration: FC = () => {
  const classes = useStyles();

  return (
    <Box component='section'>
      <Box className={classes.root}>
        <Typography sx={sxRegistrationTitle}>Регистрация на портал</Typography>
        <OrgForm />

        <img
          src={likeIcon}
          width={170}
          height={170}
          alt='logo'
          loading='lazy'
        />

        <img
          src={userIcon}
          width={224}
          height={224}
          alt='logo'
          loading='lazy'
        />
      </Box>
    </Box>
  );
};

export default Registration;
