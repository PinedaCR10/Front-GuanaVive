import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth';

interface AdminRouteProps {
  redirectTo?: string;
}

export const AdminRoute = ({ redirectTo = '/' }: AdminRouteProps) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
