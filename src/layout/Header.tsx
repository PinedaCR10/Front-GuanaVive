import Navbar from "./Navbar";
import { useAuth } from "../features/auth";
import { useNavigate, NavLink } from "react-router-dom";

export default function Header() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  const base = "px-3 py-2 text-sm font-semibold transition";
  const active = "text-[var(--gv-primary)]";
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--gv-border)]">
      <div className="container h-16 flex items-center relative px-4">
        {/* Logo */}
        <a href="/" className="flex items-baseline gap-1 select-none flex-shrink-0 -ml-4 md:-ml-8">
          <span className="text-xl md:text-2xl font-extrabold text-blue-500">Guana</span>
          <span className="text-xl md:text-2xl font-extrabold text-red-500">Vive</span>
        </a>

        {/* Navbar - Centrado */}
        <div className="flex-1 flex justify-center">
          <Navbar />
        </div>

        {/* Icono de login / Usuario - Absoluto a la derecha - Solo desktop */}
        <div className="absolute right-4 md:right-0 top-0 h-full items-center -mr-0 md:-mr-8 hidden lg:flex">
          {!isAuthenticated ? (
            <a href="/auth/login" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/images/homepage/acceso.png" 
                alt="Login" 
                className="w-7 h-7 md:w-8 md:h-8"
                style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(35%) saturate(1000%) hue-rotate(175deg) brightness(95%) contrast(90%)' }}
              />
            </a>
          ) : (
            <div className="flex items-center gap-1 md:gap-2">
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={`${base} ${active}`}
                >
                  Admin
                </NavLink>
              )}
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2">
                <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-[var(--gv-primary)] text-white grid place-items-center text-xs md:text-sm font-bold">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs md:text-sm font-medium text-[var(--gv-text)] hidden sm:block">
                  {user?.firstName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-outline text-xs md:text-sm px-2 md:px-4"
              >
                <span className="hidden sm:inline">Salir</span>
                <span className="sm:hidden">×</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
