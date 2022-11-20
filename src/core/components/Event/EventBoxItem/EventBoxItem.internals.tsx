const sxEventBoxContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
  background: '#FFF',
  boxShadow: '0px 7px 40px rgba(31, 37, 113, 0.07)',
  borderRadius: '20px',
  border: '1px solid #DBDBDB',
};

const sxEventBoxLeftPanel = {
  flex: 0.7,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '24px',
};

const sxEventBoxRightPanel = {
  flex: 0.7,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '24px',
};

const sxEventBoxInfo = {
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

const sxEventBoxCategory = {
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0.05em',
  color: '#777F9A',
};

const sxEventBoxTime = { display: 'inline-flex', gap: '14px' };

const sxRejectBtn = {
  width: '142px',
  height: '46px',
  border: '2px solid #BB5A6C',
  borderRadius: '12px',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  color: '#BB5A6C',
  textTransform: 'none',
};

const sxAcceptBtn = {
  width: '142px',
  height: '46px',
  border: '2px solid #28C61A',
  borderRadius: '12px',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  color: '#28C61A',
  textTransform: 'none',
};

export {
  sxEventBoxContainer,
  sxEventBoxLeftPanel,
  sxEventBoxRightPanel,
  sxEventBoxInfo,
  sxEventBoxCategory,
  sxEventBoxTime,
  sxRejectBtn,
  sxAcceptBtn,
};
