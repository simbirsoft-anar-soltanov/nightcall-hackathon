import { FC, useState } from 'react';
import { Avatar, Grid, Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { defaultAvatar } from 'core/constants/constants';
import { tUser } from 'core/helpers/types';
import { sxOrgTitlePage } from 'pages/OrgPage/OrgPage.internals';
import {
  getSxOrgInfoWrap,
  sxOrgInfoProfile,
  sxOrgInfoDescr,
  sxOrgInfoName,
  sxOrgInfoRow,
  sxOrgInfoTitle,
  sxInfoAboutOrg,
  sxOrgBtnViewMore,
  mockOrgDescr,
} from './OrgInfo.internals';

type tOrgInfoProps = {
  user: tUser;
  isNotTitle?: boolean;
  isFullWidth?: boolean;
};

const OrgInfo: FC<tOrgInfoProps> = ({
  user: { avatar, organizationName, numberPhone, email },
  isNotTitle,
  isFullWidth,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <>
      {!isNotTitle && <Typography sx={sxOrgTitlePage}>Данные</Typography>}

      <Grid container sx={getSxOrgInfoWrap(isFullWidth)}>
        <Box sx={sxOrgInfoProfile}>
          <Avatar src={avatar || defaultAvatar} alt={organizationName} />

          <Box sx={{ display: 'grid', gap: '20px' }}>
            <Typography sx={sxOrgInfoName}>
              {organizationName}
              <CheckCircleIcon height={20} sx={{ color: '#28C61A' }} />
            </Typography>

            <Typography sx={sxOrgInfoRow}>
              <LocationOnIcon />
              <a
                target='_blank'
                rel='nofollow noopener noreferrer'
                href={`https://maps.google.com/maps/search/${'г Москва, ул Радио, д 24 к 1'}`}
              >
                г Москва, ул Радио, д 24 к 1
              </a>
            </Typography>

            <Typography sx={sxOrgInfoRow}>
              <CallIcon />
              <a
                target='_blank'
                rel='nofollow noopener noreferrer'
                href={`tel:${numberPhone}`}
              >
                {numberPhone}
              </a>
            </Typography>

            <Typography sx={sxOrgInfoRow}>
              <MailOutlineIcon />
              <a
                target='_blank'
                rel='nofollow noopener noreferrer'
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </Typography>
          </Box>
        </Box>

        <Box sx={sxOrgInfoDescr}>
          <Typography sx={sxOrgInfoTitle}>Описание</Typography>
          <Typography sx={sxInfoAboutOrg}>
            {showMore && mockOrgDescr.length > 255
              ? mockOrgDescr
              : `${mockOrgDescr.substring(0, 250)}...`}
          </Typography>
          <Button
            variant='text'
            onClick={() => setShowMore(!showMore)}
            sx={sxOrgBtnViewMore}
          >
            {showMore ? 'Показать меньше' : 'Показать полностью'}
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default OrgInfo;
