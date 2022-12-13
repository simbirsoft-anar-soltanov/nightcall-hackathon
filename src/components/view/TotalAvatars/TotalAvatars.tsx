import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { tEvent } from 'core/helpers/types';
import { defaultAvatar } from 'core/constants/constants';

type tTotalAvatarsProps = { avatars: tEvent['peoples']; total: number };

const TotalAvatars: FC<tTotalAvatarsProps> = ({ avatars, total }) => {
  return (
    <AvatarGroup total={total}>
      {avatars?.map(({ userName, avatarUrl }, index) => (
        <Avatar
          key={index}
          alt={userName ?? 'Remy Sharp'}
          src={avatarUrl ?? defaultAvatar}
        />
      ))}
    </AvatarGroup>
  );
};

export default TotalAvatars;
