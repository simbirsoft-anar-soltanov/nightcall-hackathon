import * as yup from 'yup';
import { yupFields } from 'utils/yupFields';

const schema = yup
  .object({
    info: yupFields.info,
    category: yupFields.category,
    time_start: yupFields.time_start,
    must: yupFields.must,
    people_count: yupFields.people_count,
  })
  .required();

const schemaChangeStatus = yup
  .object({
    aboutSelf: yupFields.aboutSelf,
    organizationName: yupFields.organizationName,
  })
  .required();

const styledContainer = {
  maxWidth: '1280px',
  margin: '24px auto',
  display: 'grid',
  gap: '32px',
};

const sxOrgTitlePage = {
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '32px',
  lineHeight: '40px',
  letterSpacing: '0.05em',
  color: '#222',
};

const sxOrgNamePage = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '32px',
  textAlign: 'center',
  letterSpacing: '0.05em',
  color: '#777E99',
  opacity: '0.5',
};

const sxOrgTab = {
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '40px',
  letterSpacing: '0.05em',
  textTransform: 'none',
  color: '#777F9A',
};

const sxOrgAddRequest = {
  color: '#134BC5',
  gap: '16px',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '40px',
  letterSpacing: '0.05em',
  textTransform: 'none',
};

export {
  schema,
  schemaChangeStatus,
  styledContainer,
  sxOrgTitlePage,
  sxOrgNamePage,
  sxOrgTab,
  sxOrgAddRequest,
};
