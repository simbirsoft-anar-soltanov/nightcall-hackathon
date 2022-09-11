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

const styledOrgContainer = {
  maxWidth: '100%',
  margin: '24px auto',
};

export { schema, styledOrgContainer };
