const statusEvents: Record<string, string> = {
  0: 'active',
  1: 'past',
  2: 'approve',
  3: 'reject',
};

const sxOrderGridItems = {
  display: 'grid',
  gridTemplate: 'repeat(2, 1fr)/1fr',
  height: '350px',
  gap: '36px',
  overflow: 'hidden',
};

const sxOrderBoxContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
  background: '#FFF',
  boxShadow: '0px 7px 40px rgba(31, 37, 113, 0.07)',
  borderRadius: '20px',
  border: '1px solid #DBDBDB',
};

const sxOrderBoxLeftPanel = {
  flex: 0.7,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '24px',
};

const sxOrderBoxInfo = {
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '40px',
  letterSpacing: '0.05em',
  color: '#1E1E1E',
  overflowWrap: 'break-word',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const sxOrderBoxCategory = {
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0.05em',
  color: '#777F9A',
};

const sxOrderBoxTime = { display: 'inline-flex', gap: '14px' };

export {
  statusEvents,
  sxOrderGridItems,
  sxOrderBoxContainer,
  sxOrderBoxLeftPanel,
  sxOrderBoxInfo,
  sxOrderBoxCategory,
  sxOrderBoxTime,
};
