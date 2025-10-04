import { NavLink } from "react-router-dom";
import { useState } from "react";

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

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/#categories", label: "Categorías" },
  { to: "/#guanacaste", label: "Guanacaste" },
  { to: "/#conocemas", label: "Conoce más" },
  { to: "/#gallery", label: "Galería" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
        <a href="/login" className="btn btn-outline">
          Ingresar
        </a>
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
          <a
            href="/login"
            className="btn btn-primary w-full justify-center mt-1"
          >
            Ingresar
          </a>
        </div>
      )}
    </nav>
  );
}
