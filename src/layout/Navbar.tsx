import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../features/auth";

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
  if (to.includes('#')) {
    e.preventDefault();
    const id = to.split('#')[1];
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const publicLinks = [
  { to: "/", label: "Inicio", end: true },
  { to: "/#categories", label: "Categorías" },
  { to: "/#guanacaste", label: "Guanacaste" },
  { to: "/#conocemas", label: "Conoce más" },
  { to: "/#gallery", label: "Galería" },
];

const userLinks = [
  { to: "/", label: "Inicio", end: true },
  { to: "/feed", label: "Feed" },
  { to: "/gallery", label: "Galería" },
  { to: "/my-publications", label: "Mis Publicaciones" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
    setOpen(false);
  };

  const links = isAuthenticated ? userLinks : publicLinks;

  const base =
    "px-3 py-2 text-sm font-semibold transition";
  const inactive =
    "text-[var(--gv-muted)] hover:text-[var(--gv-primary)]";
  const active = "text-[var(--gv-primary)]";

  return (
    <nav className="relative">
      {/* Desktop */}
      <ul className="hidden lg:flex items-center gap-2 xl:gap-4">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={(e) => scrollToSection(e, to)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive} text-xs xl:text-sm px-2 xl:px-3`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Tablet - Mostrar menos enlaces */}
      <ul className="hidden md:flex lg:hidden items-center gap-2">
        {links.slice(0, 3).map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={(e) => scrollToSection(e, to)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive} text-xs px-2`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <button
        aria-label="Menú"
        onClick={() => setOpen((v) => !v)}
        className="md:hidden h-10 w-10 grid place-items-center rounded-lg border border-[var(--gv-border)]"
      >
        <div className="w-4 h-[2px] bg-[var(--gv-text)] relative">
          <span className="absolute inset-x-0 -top-1.5 h-[2px] bg-[var(--gv-text)]" />
          <span className="absolute inset-x-0 top-1.5 h-[2px] bg-[var(--gv-text)]" />
        </div>
      </button>

      {open && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 card p-3 md:hidden z-50 shadow-xl">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[var(--gv-border)]">
              <h3 className="text-base font-bold text-[var(--gv-text)]">Menú</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-[var(--gv-primary-100)] transition-colors text-[var(--gv-text)]"
                aria-label="Cerrar menú"
              >
                ×
              </button>
            </div>
            <nav className="space-y-1">
              {links.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={(e) => {
                    scrollToSection(e, to);
                    setOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? active + " bg-[var(--gv-primary-100)]"
                        : "text-[var(--gv-text)] hover:bg-[var(--gv-primary-100)] hover:text-[var(--gv-primary)]"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          
            <div className="mt-3 pt-3 border-t border-[var(--gv-border)]">
              {!isAuthenticated ? (
                <a
                  href="/auth/login"
                  className="flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="/images/homepage/acceso.png" 
                    alt="Login" 
                    className="w-8 h-8"
                    style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(35%) saturate(1000%) hue-rotate(175deg) brightness(95%) contrast(90%)' }}
                  />
                </a>
              ) : (
                <>
                  {isAdmin && (
                    <NavLink
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 rounded-lg transition-colors mb-2 ${
                          isActive
                            ? active + " bg-[var(--gv-primary-100)]"
                            : "text-[var(--gv-text)] hover:bg-[var(--gv-primary-100)] hover:text-[var(--gv-primary)]"
                        }`
                      }
                    >
                      Admin
                    </NavLink>
                  )}
                  <div className="px-4 py-2 rounded-lg bg-[var(--gv-primary-100)] mb-3">
                    <div className="text-sm font-semibold text-[var(--gv-text)] mb-1">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-xs text-[var(--gv-muted)]">
                      {user?.email}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline w-full justify-center"
                  >
                    Salir
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
