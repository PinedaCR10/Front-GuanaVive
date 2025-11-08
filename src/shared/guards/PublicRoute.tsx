import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth';

interface PublicRouteProps {
  redirectTo?: string;
}

export const PublicRoute = ({ redirectTo = '/dashboard' }: PublicRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gv-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirigir según el rol del usuario
    if (isAdmin) {
      console.log('PublicRoute: Usuario admin autenticado, redirigiendo a /admin');
      return <Navigate to="/admin" replace />;
    }
    console.log('PublicRoute: Usuario autenticado, redirigiendo a', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
