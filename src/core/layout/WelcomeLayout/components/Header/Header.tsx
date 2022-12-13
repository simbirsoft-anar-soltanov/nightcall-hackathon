import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { ReactComponent as LogoIcon } from 'assets/icons/simbirHelp.svg';
import { sxHeaderWrap, sxHeaderBtnPanel } from './Header.internals';

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <Box component='section' sx={sxHeaderWrap}>
      <LogoIcon />

      <Box sx={sxHeaderBtnPanel}>
        <Button
          onClick={() => navigate('/entry/sign-up')}
          onKeyDown={({ key }) => key === 'Enter' && navigate('/entry/sign-up')}
        >
          Зарегистрироваться в системе
        </Button>
        <Button
          onClick={() => navigate('/entry/auth')}
          onKeyDown={({ key }) => key === 'Enter' && navigate('/entry/auth')}
        >
          Войти
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
