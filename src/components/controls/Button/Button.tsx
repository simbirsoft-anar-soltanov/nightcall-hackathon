import { styled, Button } from '@mui/material';

const getCustomBaseStyleButton = (stylization: Record<string, string>) => ({
  background: '#0c60d8',
  borderRadius: '8px',
  border: 'none',
  boxShadow: 'none',
  color: '#fff',
  fontSize: '24px',
  fontWeight: '500',
  height: '64px',
  transition: 'opacity 300ms',
  ...stylization,
});

const CustomSendButton = styled(Button)<{
  stylization?: Record<string, string>;
}>(({ stylization = {} }) => {
  const customBaseStyleButton = getCustomBaseStyleButton(stylization);

  return {
    ...customBaseStyleButton,
    textTransform: 'none',
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

const CustomOpenModalButton = styled(Button)<{
  stylization?: Record<string, string>;
}>(({ stylization = {} }) => {
  const customBaseStyleButton = getCustomBaseStyleButton(stylization);
  const customBaseStyleOpenModalButton = {
    fontSize: '18px',
    padding: '5px 15px',
    height: 'auto',
    margin: '5px 0px 10px',
  };

  return {
    ...customBaseStyleButton,
    ...customBaseStyleOpenModalButton,
    textTransform: 'none',
    '&:hover': {
      ...customBaseStyleButton,
      ...customBaseStyleOpenModalButton,
      opacity: '75%',
    },
    '&:active': { ...customBaseStyleButton, ...customBaseStyleOpenModalButton },
    '&:focus': { ...customBaseStyleButton, ...customBaseStyleOpenModalButton },
    '&:disabled': {
      ...customBaseStyleButton,
      opacity: stylization.opacity || '35%',
      cursor: 'not-allowed',
      pointerEvents: 'all',
    },
  };
});

export { CustomSendButton, CustomOpenModalButton };
