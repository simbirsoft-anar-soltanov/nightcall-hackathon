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

const styledOrgContainer = {
  maxWidth: '100%',
  margin: '24px auto',
};

export { schema, schemaChangeStatus, styledOrgContainer };
