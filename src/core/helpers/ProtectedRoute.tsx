import { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type tProtectedRouteProps = {
  role: string;
  children: ReactNode;
};

const ProtectedRoute: FC<tProtectedRouteProps> = ({ role }) => {
  return role ? <Outlet /> : <Navigate to='/auth' />;
};

export default ProtectedRoute;
