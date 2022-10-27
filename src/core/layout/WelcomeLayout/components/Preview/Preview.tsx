import { FC } from 'react';
import { Box, Button, Typography, Chip } from '@mui/material';
import { ReactComponent as PreviewLogo } from 'assets/icons/previewlogo.svg';
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
        <Button sx={sxPreviewBtn}>Зарегистрировать организацию</Button>
      </Box>
    </Box>
  );
};

export default Preview;
