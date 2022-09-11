import { FC, useContext } from 'react';
import useUser from 'core/hooks/useUser';
import { UseUserType } from 'core/helpers/types';
import { UserContext } from 'core/context/user';
import EmployeePage from './EmployeePage';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';

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
