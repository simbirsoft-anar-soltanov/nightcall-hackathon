import { SyntheticEvent, useEffect, useState } from 'react';
import { Typography, Box, Tabs, Tab, Link } from '@mui/material';
import OrgForm from 'components/form/OrgForm/OrgForm';
import EmployeeForm from 'components/form/EmployeeForm/EmployeeForm';
import {
  roleOptionVariables,
  styledSignUpContainer,
} from './SignUpPage.internals';

const SignUpPage = () => {
  const [roleOption, setRoleOption] = useState<number>(0);

  const onChangeRoleOption = (_: SyntheticEvent, newValue: number) => {
    setRoleOption(newValue);
  };

  const isOrganization = roleOptionVariables[roleOption] === 'Организация';

  useEffect(() => {
    document.title = 'Регистрация';
  }, []);

  return (
    <Box component='div' sx={styledSignUpContainer}>
      <Typography variant='h3' sx={{ margin: '24px 0 16px' }}>
        Регистрация на портале
      </Typography>

      <Box
        sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '16px' }}
      >
        <Tabs value={roleOption} onChange={onChangeRoleOption}>
          <Tab label='Организация' sx={{ paddingLeft: 0 }} />
          <Tab label='Сотрудник' />
        </Tabs>
      </Box>

      {isOrganization ? <OrgForm isWithTitle /> : <EmployeeForm />}

      <Box sx={{ marginTop: '16px' }}>
        <Link href='/entry/auth' variant='body1'>
          Вы зарегистрированы в системе? Тогда авторизуйтесь
        </Link>
      </Box>
    </Box>
  );
};

export default SignUpPage;
