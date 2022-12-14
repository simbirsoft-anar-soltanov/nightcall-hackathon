import { FC } from 'react';
import { Link } from 'react-scroll';
import { Box, Button, Typography, Chip } from '@mui/material';
import { ReactComponent as PreviewLogo } from 'assets/icons/previewLogo.svg';
import logoIcon from 'assets/img/hearth.png';
import {
  sxPreviewContainer,
  sxPreviewTitle,
  sxPreviewLogoBox,
  sxPreviewPanel,
  sxPreviewChip,
  sxPreviewBtn,
} from './Preview.internals';

const Preview: FC = () => {
  return (
    <Box component='section' sx={sxPreviewContainer}>
      <Typography sx={sxPreviewTitle}>Портал волонтёров</Typography>

      <Box sx={sxPreviewLogoBox}>
        <img src={logoIcon} alt='logo' loading='lazy' />

        <PreviewLogo />
      </Box>

      <Box sx={sxPreviewPanel}>
        <Box>
          <Chip label='Помощь рядом' sx={sxPreviewChip} />
        </Box>

        <Link
          to='registration' spy smooth offset={-3}
          duration={500}
        >
          <Button sx={sxPreviewBtn}>Зарегистрировать организацию</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Preview;
