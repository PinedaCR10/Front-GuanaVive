import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth';

interface PublicRouteProps {
  redirectTo?: string;
}

export const PublicRoute = ({ redirectTo = '/' }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
