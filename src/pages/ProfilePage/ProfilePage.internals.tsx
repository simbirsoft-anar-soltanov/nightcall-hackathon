const sxIconButton = {
  padding: 0,
  width: 'max-content',
  color: '#777F9A',
  display: 'inline-flex',
  gap: '10px',
  alignItems: 'first baseline',
  ['&:hover, &:active, &:focus, & .Mui-focusVisible']: {
    background: 'none',
  },
};

const sxBoxProfile = {
  background: '#fff',
  boxShadow: '0px 7px 40px rgba(31, 37, 113, 0.07)',
  borderRadius: '20px',
  marginTop: '16px',
  minHeight: '250px',
  display: 'flex',
  gap: '32px',
  alignItems: 'flex-start',
  padding: '24px',
};

const sxProfileUserName = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '14px',
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '32px',
  letterSpacing: '0.05em',
  color: '#222',
};

export { sxIconButton, sxBoxProfile, sxProfileUserName };
