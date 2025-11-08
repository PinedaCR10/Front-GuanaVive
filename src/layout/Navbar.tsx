import { NavLink, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useAuth } from "../features/auth";
import { useTranslation } from "react-i18next";
import { LayoutDashboard, User, Crown, FileText, LogOut } from "lucide-react";

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

export default function Navbar() {
  const { t } = useTranslation("navbar");
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const publicLinks = useMemo(() => [
    { to: "/", labelKey: "INICIO", end: true },
    { to: "/#categories", labelKey: "CATEGORIAS" },
    { to: "/#guanacaste", labelKey: "GUANACASTE" },
    { to: "/#conocemas", labelKey: "CONOCE_MAS" },
    { to: "/#gallery", labelKey: "GALERIA" },
  ], []);

  const userLinks = useMemo(() => [
    { to: "/", labelKey: "INICIO", end: true },
    { to: "/feed", labelKey: "FEED" },
    { to: "/gallery", labelKey: "GALERIA" },
    { to: "/my-publications", labelKey: "MIS_PUBLICACIONES" },
  ], []);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
    setOpen(false);
    setUserMenuOpen(false);
  };

  const translatedLinks = useMemo(() => {
    const links = isAuthenticated ? userLinks : publicLinks;
    return links.map(link => ({
      ...link,
      label: t(link.labelKey, { defaultValue: link.labelKey })
    }));
  }, [isAuthenticated, userLinks, publicLinks, t]);

  const base =
    "px-3 py-2 text-sm font-semibold transition";
  const inactive =
    "text-[var(--gv-muted)] hover:text-[var(--gv-primary)]";
  const active = "text-[var(--gv-primary)]";

  return (
    <nav className="relative">
      {/* Desktop */}
      <ul className="hidden lg:flex items-center gap-2 xl:gap-4">
        {translatedLinks.map(({ to, label, end }) => (
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
        
        {!isAuthenticated ? (
          <a href="/auth/login" className="btn btn-outline">
            {t("INGRESAR", { defaultValue: "Ingresar" })}
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
                {t("ADMIN", { defaultValue: "Admin" })}
              </NavLink>
            )}
            {/* User Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--gv-primary-100)] transition"
              >
                <div className="h-8 w-8 rounded-full bg-[var(--gv-primary)] text-white grid place-items-center text-sm font-bold">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-[var(--gv-text)]">
                  {user?.firstName}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 card p-2 shadow-lg z-50">
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--gv-primary-100)] text-[var(--gv-text)] text-sm flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--gv-primary-100)] text-[var(--gv-text)] text-sm flex items-center gap-2"
                  >
                    <User className="w-4 h-4" /> {t("MI_PERFIL", { defaultValue: "Mi Perfil" })}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/plans');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--gv-primary-100)] text-[var(--gv-text)] text-sm flex items-center gap-2"
                  >
                    <Crown className="w-4 h-4" /> {t("PLANES", { defaultValue: "Planes" })}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/my-publications');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--gv-primary-100)] text-[var(--gv-text)] text-sm flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> {t("MIS_PUBLICACIONES", { defaultValue: "Mis Publicaciones" })}
                  </button>
                  <div className="border-t border-[var(--gv-border)] my-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-sm flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> {t("CERRAR_SESION", { defaultValue: "Cerrar Sesión" })}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </ul>

      {/* Mobile - Solo botón de menú */}
      <button
        aria-label={t("MENU", { defaultValue: "Menú" })}
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden h-10 w-10 grid place-items-center rounded-lg border border-[var(--gv-border)]"
      >
        <div className="w-4 h-[2px] bg-[var(--gv-text)] relative">
          <span className="absolute inset-x-0 -top-1.5 h-[2px] bg-[var(--gv-text)]" />
          <span className="absolute inset-x-0 top-1.5 h-[2px] bg-[var(--gv-text)]" />
        </div>
      </button>

      {open && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 card p-3 lg:hidden z-50 shadow-xl">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[var(--gv-border)]">
              <h3 className="text-base font-bold text-[var(--gv-text)]">{t("MENU", { defaultValue: "Menú" })}</h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-[var(--gv-primary-100)] transition-colors text-[var(--gv-text)]"
                aria-label={t("CERRAR_MENU", { defaultValue: "Cerrar menú" })}
              >
                ×
              </button>
            </div>
            <nav className="space-y-1">
              {translatedLinks.map(({ to, label, end }) => (
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
                <NavLink
                  to="/auth/login"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? active + " bg-[var(--gv-primary-100)]"
                        : "text-[var(--gv-text)] hover:bg-[var(--gv-primary-100)] hover:text-[var(--gv-primary)]"
                    }`
                  }
                >
                  {t("INGRESAR", { defaultValue: "Ingresar" })}
                </NavLink>
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
                      {t("ADMIN", { defaultValue: "Admin" })}
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
                    {t("SALIR", { defaultValue: "Salir" })}
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
