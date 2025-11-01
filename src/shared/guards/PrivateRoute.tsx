import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth';

interface PrivateRouteProps {
  redirectTo?: string;
}

export const PrivateRoute = ({ redirectTo = '/login' }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
