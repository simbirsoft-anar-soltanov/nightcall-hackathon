const sxPreviewContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '16px',
  position: 'relative',
};

const sxPreviewTitle = {
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  color: '#7B839F',
};

const sxPreviewLogoBox = {
  marginTop: '32px',
  '& > img': {
    position: 'absolute',
    transform: 'rotate(15deg)',
    top: { xs: '7%', lg: '1%' },
    right: { xs: '8%', lg: '22%' },
  },
};

const sxPreviewPanel = {
  display: 'grid',
  gridTemplateColumns: 'max-content',
  justifyContent: 'center',
  gap: '62px',
};

const sxPreviewChip = {
  background: '#7C83A0',
  borderRadius: '100px',
  transform: 'rotate(-9deg)',
  width: '201px',
  height: '48px',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  color: '#fff',
};

const sxPreviewBtn = {
  background: 'linear-gradient(104.42deg, #4745D0 0%, #2A27C9 60.23%)',
  boxShadow:
    'inset -4px -4px 4px rgba(0, 0, 0, 0.1), inset 4px 4px 4px rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  color: '#fff',
  padding: '16px 24px',
  textTransform: 'none',
};

export {
  sxPreviewContainer,
  sxPreviewTitle,
  sxPreviewLogoBox,
  sxPreviewPanel,
  sxPreviewChip,
  sxPreviewBtn,
};
