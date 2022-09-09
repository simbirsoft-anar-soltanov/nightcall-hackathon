import { FC, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Button, Typography } from '@mui/material';
import { ReactComponent as LogoIcon } from '../../../../assets/img/logo.svg';
import { ReactComponent as ProfileIcon } from '../../../../assets/img/profile.svg';
import styles from './Header.module.scss';

const Header: FC = () => {
  const navigate = useNavigate();

  const handleSignOut: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/auth');
  };

  return (
    <nav
      className={`navbar ${styles.navbar}`}
      role='navigation'
      aria-label='main navigation'
    >
      <div className={styles.leftpanel}>
        <Link className={styles['navbar-item']} href='/' underline='hover'>
          <LogoIcon width='144' height='24' />
        </Link>
      </div>

      <div className={styles.rightPanel}>
        <Typography variant='subtitle1' color='#000'>
          Администратор
        </Typography>
        <Button
          color='primary'
          onClick={handleSignOut}
          sx={{ padding: 0, minWidth: '24px' }}
        >
          <ProfileIcon width='24' height='24' />
        </Button>
      </div>
    </nav>
  );
};

export default Header;
