import Navbar from "./Navbar";
import { useAuth } from "../features/auth";

export default function Header() {
  const { isAuthenticated } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--gv-border)]">
      <div className="container h-16 flex items-center relative px-4">
        {/* Logo */}
        <a href="/" className="flex items-baseline gap-1 select-none flex-shrink-0 -ml-4 md:-ml-8">
          <span className="text-xl md:text-2xl font-extrabold text-[var(--gv-primary)]">Guana</span>
          <span className="text-xl md:text-2xl font-extrabold text-red-500">Vive</span>
        </a>

        {/* Navbar - Centrado */}
        <div className="flex-1 flex justify-center">
          <Navbar />
        </div>

        {/* Icono de login - Solo desktop cuando NO está autenticado */}
        <div className="absolute right-4 md:right-0 top-0 h-full items-center -mr-0 md:-mr-8 hidden lg:flex">
          {!isAuthenticated && (
            <a href="/auth/login" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/images/homepage/acceso.png" 
                alt="Login" 
                className="w-7 h-7 md:w-8 md:h-8"
                style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(35%) saturate(1000%) hue-rotate(175deg) brightness(95%) contrast(90%)' }}
              />
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
