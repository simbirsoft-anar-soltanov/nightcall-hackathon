import { FC, useState, useEffect, useContext, MouseEvent } from 'react';
import { Avatar, Box, Chip, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import { UseUserType } from 'core/helpers/types';
import { sxBoxProfile, sxProfileUserName } from './ProfilePage.internals';
import { defaultAvatar } from 'core/constants/constants';
import { red } from '@mui/material/colors';
import { changeEmployeeStatus } from 'core/services/status/changeEmployeeStatus';
import TitleHead from 'core/components/TitleHead/TitleHead';
import Togggle from 'components/controls/Toggle/Toggle';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import { sxOrgInfoRow } from 'core/components/OrgInfo/OrgInfo.internals';
import BackPage from 'components/view/BackPage/BackPage';

const ProfilePage: FC = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: {
      role,
      avatar,
      name,
      surname,
      organizationName,
      city,
      email,
      numberPhone,
      statusReadyJoinToEvent,
      docId,
      status,
    },
  }: UseUserType = useUser(loggedInUser?.uid);

  const [readyStatus, setReadyStatus] = useState<string>('');

  useEffect(() => {
    document.title = 'Профиль';
  }, []);

  useEffect(() => {
    statusReadyJoinToEvent && setReadyStatus(statusReadyJoinToEvent);
  }, [statusReadyJoinToEvent]);

  const handleChange = async (
    _: MouseEvent<HTMLElement>,
    newStatus: string,
  ) => {
    setReadyStatus(newStatus);
    await changeEmployeeStatus(docId, newStatus);
  };

  if (!role) return <SpinnerWrap />;

  const labelChip =
    readyStatus === 'dontDisturb' ? 'Не беспокоить' : `В активной помощи =)`;

  const statusChip = readyStatus === 'dontDisturb' ? 'error' : `success`;

  return (
    <Box sx={{ display: 'grid', gap: '8px', padding: '8px' }}>
      <BackPage role={role} />

      <TitleHead title={role} namePage='Страница профиля' />

      {role === 'Сотрудник' && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Togggle value={readyStatus} handleChange={handleChange} />
        </Box>
      )}

      <Box sx={sxBoxProfile}>
        <Box>
          <Avatar
            src={avatar || defaultAvatar}
            sx={{
              bgcolor: red[500],
              height: '220px',
              width: '220px',
              borderRadius: '20px',
            }}
          />
        </Box>

        <Box sx={{ display: 'grid', gap: '20px' }}>
          <Typography sx={sxProfileUserName}>
            {role === 'Организация' ? (
              <>
                {organizationName}
                {status === 'approve' ? (
                  <CheckCircleIcon height={20} sx={{ color: '#28C61A' }} />
                ) : (
                  <WarningIcon height={20} sx={{ color: 'rgb(235, 0, 20)' }} />
                )}
              </>
            ) : (
              `${name} ${surname}`
            )}
          </Typography>

          <Typography sx={sxOrgInfoRow}>
            Город:
            <Typography sx={{ color: '#134BC5' }}>{city}</Typography>
          </Typography>

          <Typography sx={sxOrgInfoRow}>
            Номер телефона:
            <a
              target='_blank'
              rel='nofollow noopener noreferrer'
              href={`tel:${numberPhone}`}
            >
              <Typography sx={{ color: '#134BC5' }}>{numberPhone}</Typography>
            </a>
          </Typography>

          <Typography sx={sxOrgInfoRow}>
            Email:
            <a
              target='_blank'
              rel='nofollow noopener noreferrer'
              href={`mailto:${email}`}
            >
              <Typography sx={{ color: '#134BC5' }}>{email}</Typography>
            </a>
          </Typography>
        </Box>

        {role === 'Сотрудник' && (
          <Box sx={{ flex: '1', textAlign: 'right' }}>
            <Chip
              label={labelChip}
              variant='outlined'
              color={statusChip}
              sx={{ fontWeight: 600, borderWidth: '2px' }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
