import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Megaphone, FolderOpen, CreditCard, Settings, LogOut } from "lucide-react";
import { useAuth } from "../features/auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  const items: Array<{ name: string; path: string; icon: React.ElementType; end?: boolean }> = [
    { name: "Panel Principal", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "Usuarios", path: "/admin/users", icon: Users },
    { name: "Anuncios", path: "/admin/posts", icon: Megaphone },
    { name: "Categorías", path: "/admin/categories", icon: FolderOpen },
    { name: "Suscripciones", path: "/admin/subscriptions", icon: CreditCard },
    { name: "Configuración", path: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={onClose} />}

      <aside
        className={`fixed md:static z-30 inset-y-0 left-0 transform md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-[var(--gv-surface)] border-r border-[var(--gv-border)] flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="p-6 border-b border-[var(--gv-border)]">
            <h2 className="text-lg font-bold text-[var(--gv-text)]">
              Panel Admin
            </h2>
            <p className="text-xs text-[var(--gv-muted)] mt-1">GuanaVive</p>
          </div>

          <nav className="mt-4 flex flex-col gap-2 px-3 pb-6">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={Boolean(item.end)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "bg-[var(--gv-primary)] text-white shadow-md" 
                        : "text-[var(--gv-text)] hover:bg-[var(--gv-primary-100)] hover:text-[var(--gv-primary)]"
                    }`
                  }
                  onClick={onClose}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[var(--gv-border)]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
