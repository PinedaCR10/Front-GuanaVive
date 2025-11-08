import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../admin/sidebar";
import Dashboard from "../admin/home/dashboard";
import AdminUsers from "./AdminUsers";
import AdminAdvertisement from "./AdminAdvertisement";
import AdminCategories from "../admin/categories/AdminCategories";
import AdminSubscriptions from "../admin/suscriptions/AdminSuscriptions";

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log('🎯 AdminDashboard: Renderizando componente');

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Banner superior con tu imagen */}
        <div
          className="relative w-full h-32 sm:h-40 md:h-56 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.elmundoforestal.com/wp-content/uploads/2020/09/guanacaste.jpg')",
          }}
        >
          {/* Menú hamburguesa en móviles */}
          <button
            className="absolute top-3 left-3 md:hidden p-2 rounded-md bg-black/40 text-white backdrop-blur-sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        {/* Contenido del panel: rutas hijas */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8">
          <Routes>
            <Route index element={<Dashboard />} />      {/* /admin */}
            <Route path="users" element={<AdminUsers />} /> {/* /admin/users */}
            <Route path="posts" element={<AdminAdvertisement />} />
            <Route path="categories" element={<AdminCategories />} /> {/* 👈 */}
             <Route path="subscriptions" element={<AdminSubscriptions />} /> 
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
