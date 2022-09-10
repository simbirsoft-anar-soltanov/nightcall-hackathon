import { styled, Chip } from '@mui/material';
import { purple } from '@mui/material/colors';
const accent = purple['A200'];

const getCustomBaseStyleChip = (stylization: Record<string, string>) => ({
  background: accent,
  left: '-20px',
  borderRadius: '0px 10px 10px 0px',
  marginBottom: '10px',
  color: 'white',
  ...stylization,
});

const CustomChip = styled(Chip)<{
  stylization?: Record<string, string>;
}>(({ stylization = {} }) => {
  const customBaseStyleButton = getCustomBaseStyleChip(stylization);
  return {
    ...customBaseStyleButton,
    textTransform: 'none',
    position: 'relative',
    '&:hover': { ...customBaseStyleButton, opacity: '75%' },
    '&:active': customBaseStyleButton,
    '&:focus': customBaseStyleButton,
    '&:disabled': {
      ...customBaseStyleButton,
      opacity: stylization.opacity || '35%',
      cursor: 'not-allowed',
      pointerEvents: 'all',
    },
  };
});

export { CustomChip };
