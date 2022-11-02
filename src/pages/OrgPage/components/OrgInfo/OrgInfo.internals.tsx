const sxOrgInfoWrap = {
  display: 'grid',
  alignItems: 'flex-start',
  gridTemplate: 'minmax(224px, max-content)/484px 586px',
  gap: '40px',
};

const sxOrgInfoProfile = {
  background: '#FFF',
  boxShadow: '0px 7px 40px rgba(31, 37, 113, 0.07)',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'start',
  gap: '16px',
  padding: '24px',
};

const sxOrgInfoDescr = {
  background: '#FFF',
  boxShadow: '0px 7px 40px rgba(31, 37, 113, 0.07)',
  borderRadius: '20px',
  padding: '24px',
  display: 'grid',
  gap: '12px',
};

const sxOrgInfoName = {
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '32px',
  letterSpacing: '0.05em',
  color: '#134BC5',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  marginBotton: '8px',
};

const sxOrgInfoTitle = {
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '32px',
  letterSpacing: '0.07em',
  color: '#222',
};

const sxInfoAboutOrg = {
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  color: '#222',
};

const sxOrgInfoRow = { display: 'inline-flex', gap: '14px', color: '#777F9A' };

const sxOrgBtnViewMore = {
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  color: '#134BC5',
  maxWidth: 'max-content',
  padding: '6px 0',
};

const mockOrgDescr =
  'Компания ОАО «Российские железные дороги» - крупнейшая железнодорожная компания России, созданная на базе Министерства путей сообщения России в 2003 году в процессе реализации реформы железнодорожного транспорта, состоит из шестнадцати железных дорог. Развитие корпоративного волонтерства в ОАО «РЖД» началось с 2017 года. И сейчас поддержка проектов и мероприятий по основным направлениям корпоративного волонтерства компании является одной из целевых задач развития социальной политики в ОАО «РЖД» Благодаря корпоративным волонтерам компании на сегодняшний день реализовано больше тысячи акций и мероприятий по различным направлениям волонтерства по всей сети железных дорог.';

export {
  sxOrgInfoWrap,
  sxOrgInfoProfile,
  sxOrgInfoDescr,
  sxOrgInfoName,
  sxOrgInfoRow,
  sxOrgInfoTitle,
  sxInfoAboutOrg,
  sxOrgBtnViewMore,
  mockOrgDescr,
};
