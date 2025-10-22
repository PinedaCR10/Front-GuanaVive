import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const items = [
    { name: "Panel Principal", path: "/admin", end: true },   // <- end para match exacto
    { name: "Usuarios", path: "/admin/users" },
    { name: "Anuncios", path: "/admin/posts" },
    { name: "Categorías", path: "/admin/categories" },
    { name: "Suscripciones", path: "/admin/subscriptions" },
    { name: "Configuración", path: "/admin/settings" },
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={onClose} />}

      <aside
        className={`fixed md:static z-30 inset-y-0 left-0 transform md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white border-r border-gray-200 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <h2 className="text-lg font-semibold p-6 border-b border-gray-200">
            Panel de Administración
          </h2>

          <nav className="mt-8 flex flex-col gap-3 px-3 pb-6">
            {items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={Boolean((item as any).end)} // <- clave: exact para /admin
                className={({ isActive }) =>
                  `w-full text-left px-4 py-2 rounded-md transition ${
                    isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100 text-gray-800"
                  }`
                }
                onClick={onClose}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button className="w-full text-left text-red-600 hover:underline">
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
