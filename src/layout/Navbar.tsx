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
    "px-3 py-2 rounded-lg text-sm font-semibold transition";
  const inactive =
    "text-[var(--gv-muted)] hover:text-[var(--gv-primary)] hover:bg-[var(--gv-primary-100)]";
  const active = "text-[var(--gv-primary)] bg-[var(--gv-primary-100)]";

  return (
    <nav className="relative">
      {/* Desktop */}
      <ul className="hidden md:flex items-center gap-4">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={(e) => scrollToSection(e, to)}
              className={({ isActive }) =>
                `${base} ${isActive ? active : inactive}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
        
        {!isAuthenticated ? (
          <a href="/auth/login" className="btn btn-outline">
            Ingresar
          </a>
        ) : (
          <div className="flex items-center gap-2">
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `${base} ${isActive ? active : inactive}`
                }
              >
                Admin
              </NavLink>
            )}
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-[var(--gv-primary)] text-white grid place-items-center text-sm font-bold">
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-[var(--gv-text)]">
                {user?.firstName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline"
            >
              Salir
            </button>
          </div>
        )}
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
        <div className="absolute right-0 mt-2 w-48 card p-2 md:hidden">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={(e) => {
                scrollToSection(e, to);
                setOpen(false);
              }}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg ${
                  isActive
                    ? active
                    : "text-[var(--gv-text)] hover:bg-[var(--gv-primary-100)]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          
          {!isAuthenticated ? (
            <a
              href="/auth/login"
              className="btn btn-primary w-full justify-center mt-1"
            >
              Ingresar
            </a>
          ) : (
            <>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg ${
                      isActive
                        ? active
                        : "text-[var(--gv-text)] hover:bg-[var(--gv-primary-100)]"
                    }`
                  }
                >
                  Admin
                </NavLink>
              )}
              <div className="px-3 py-2 border-t border-[var(--gv-border)] mt-2">
                <div className="text-sm font-medium text-[var(--gv-text)] mb-2">
                  {user?.firstName} {user?.lastName}
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline w-full justify-center"
                >
                  Salir
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
