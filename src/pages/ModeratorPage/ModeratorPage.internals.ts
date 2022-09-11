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

const styledModeratorContainer = {
  maxWidth: '1280px',
  margin: '16px auto',
};

const styledCardContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2rem',
  justifyContent: 'flex-start',
  paddingBottom: '20px',
};

export {
  typeModerationVariables,
  statusLabelRequest,
  statusRequest,
  styledModeratorContainer,
  styledCardContainer,
};
