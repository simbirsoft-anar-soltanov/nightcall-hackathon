const sxFooterContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '44px',
  padding: '40px 0',
};

const sxFooterTitle = {
  color: '#134BC5',
  fontWeight: 700,
  fontSize: '32px',
  lineHeight: '40px',
  textAlign: 'center',
  letterSpacing: '0.05em',
};

const sxFooterSubBox = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const sxFooterSubDescr = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  color: '#7C85A1',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '32px',
  textAlign: 'center',
  letterSpacing: '0.05em',
  '& > a': {
    display: 'inherit',
  },
};

const sxFooterReserved = {
  color: '#7C85A1',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center',
  letterSpacing: '0.05em',
};

export {
  sxFooterContainer,
  sxFooterTitle,
  sxFooterSubBox,
  sxFooterSubDescr,
  sxFooterReserved,
};
