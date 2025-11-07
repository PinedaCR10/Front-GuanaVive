import React, { useEffect, useState } from "react";
import { useAdmin } from "../../features/admin";
import type { DashboardStats } from "../../features/admin";
import RequestList from "./requests";

const Dashboard: React.FC = () => {
  const { getDashboardStats, isLoading, error } = useAdmin();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getDashboardStats();
      if (data) {
        setStats(data);
      }
    };

    loadStats();
  }, [getDashboardStats]);

  if (isLoading) {
    return (
      <section className="space-y-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error al cargar estadísticas</p>
          <p className="text-sm">{error}</p>
        </div>
      </section>
    );
  }

  const statsArray = stats
    ? [
        { title: "Total de usuarios", value: stats.users.total },
        { title: "Usuarios activos", value: stats.users.active },
        { title: "Total de publicaciones", value: stats.publications.total },
        { title: "Publicaciones publicadas", value: stats.publications.published },
        { title: "Publicaciones pendientes", value: stats.publications.pending },
        { title: "Categorías", value: stats.categories.total },
        { title: "Suscripciones activas", value: stats.subscriptions.active },
        { title: "Total suscripciones", value: stats.subscriptions.total },
      ]
    : [];

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Panel principal</h1>
        <p className="text-gray-500">
          ¡Bienvenido de nuevo! Esto es lo que está pasando en tu plataforma
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statsArray.map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-4 rounded-xl shadow-sm border text-center hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-semibold mt-1 text-blue-600">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Solicitudes / Actividades */}
      <RequestList />
    </section>
  );
};

export default Dashboard;
