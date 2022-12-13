import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import { ReactComponent as BackArrow } from 'assets/icons/coolicon.svg';
import { rolePath } from 'pages/AuthPage/AuthPage.internals';
import { sxIconButton } from 'pages/ProfilePage/ProfilePage.internals';

type tBackPageProps = { role: string };

const BackPage: FC<tBackPageProps> = ({ role }) => {
  const navigate = useNavigate();

  return (
    <IconButton
      sx={sxIconButton}
      onClick={() => navigate(rolePath[role], { replace: true })}
      onKeyDown={({ key }) =>
        key === 'Enter' && navigate(rolePath[role], { replace: true })
      }
    >
      <BackArrow />
      <Typography>На главную</Typography>
    </IconButton>
  );
};

export default BackPage;
