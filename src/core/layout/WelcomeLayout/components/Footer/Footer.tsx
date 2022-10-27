import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ReactComponent as SubLogo } from 'assets/icons/subLogo.svg';
import {
  sxFooterContainer,
  sxFooterTitle,
  sxFooterSubBox,
  sxFooterSubDescr,
  sxFooterReserved,
} from './Footer.internals';

const Footer: FC = () => (
  <Box component='section' sx={sxFooterContainer}>
    <Typography sx={sxFooterTitle}>SimbirHelp - помощь рядом</Typography>

    <Box sx={sxFooterSubBox}>
      <Typography sx={sxFooterSubDescr}>
        Портал разработан компанией
        <a
          target='_blank'
          href='https://www.simbirsoft.com'
          rel='nofollow noopener noreferrer'
        >
          <SubLogo width={124} height={24} />
        </a>
      </Typography>
      <Typography sx={sxFooterReserved}>All rights reserved © 2022</Typography>
    </Box>
  </Box>
);

export default Footer;
