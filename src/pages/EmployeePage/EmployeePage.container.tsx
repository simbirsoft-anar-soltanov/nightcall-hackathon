import { FC, useContext } from 'react';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import EmployeePage from './EmployeePage';
import { UseUserType } from 'helpers/types';

const EmployeePageContainer: FC = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user,
    user: { docId },
  }: UseUserType = useUser(loggedInUser?.uid);

  if (!docId) return <SpinnerWrap />;

  return <EmployeePage user={user} uid={loggedInUser?.uid} />;
};

export default EmployeePageContainer;
