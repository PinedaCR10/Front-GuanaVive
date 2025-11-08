import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth';

interface AdminRouteProps {
  redirectTo?: string;
}

export const AdminRoute = ({ redirectTo = '/' }: AdminRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gv-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('AdminRoute: Usuario no autenticado, redirigiendo a login');
    return <Navigate to="/auth/login" replace />;
  }

  if (!isAdmin) {
    console.log('AdminRoute: Usuario no es admin, redirigiendo a', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  console.log('AdminRoute: Acceso permitido - Usuario es admin');
  return <Outlet />;
};
