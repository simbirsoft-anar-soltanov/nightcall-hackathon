const statusLabelRequest: Record<string, string> = {
  active: 'Открыта',
  approve: 'Подтверждена',
  reject: 'Отменена',
};

const typeModerationVariables: Record<string, string> = {
  0: 'request',
  1: 'event',
};

const statusRequest: Record<string, string> = {
  active: 'info',
  approve: 'success',
  rejected: 'error',
};

export type tColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

const styledCardContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',
  justifyContent: 'flex-start',
  paddingBottom: '20px',
};

const sxRequestGridItems = {
  display: 'grid',
  gridTemplate: 'repeat(2, 1fr)/1fr',
  gap: '24px',
  minHeight: '350px',
  overflow: 'hidden',
};

const sxRequestBoxContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
  background: '#FFF',
  boxShadow: '0 7px 40px rgba(31, 37, 113, 0.07)',
  borderRadius: '20px',
  border: '1px solid #DBDBDB',
};

const sxRequestBoxLeftPanel = {
  flex: 0.7,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '24px',
};

const sxRequestBoxInfo = {
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '1.1',
  letterSpacing: '0.05em',
  color: '#1E1E1E',
};

const sxRequestBoxPhoneNumber = {
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0.05em',
  color: '#777F9A',
};

const sxRequestBoxRightPanel = {
  flex: 0.7,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '24px',
};

export {
  typeModerationVariables,
  statusLabelRequest,
  statusRequest,
  styledCardContainer,
  sxRequestGridItems,
  sxRequestBoxContainer,
  sxRequestBoxLeftPanel,
  sxRequestBoxInfo,
  sxRequestBoxPhoneNumber,
  sxRequestBoxRightPanel,
};
