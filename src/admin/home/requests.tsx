import React, { useState, useEffect } from "react";
import { useAdmin } from "../../features/admin";
import type { RecentActivity } from "../../features/admin";

const PER_PAGE = 5;

const RequestList: React.FC = () => {
  const { getRecentActivities, isLoading, error } = useAdmin();
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadActivities = async () => {
      const data = await getRecentActivities();
      if (data) {
        setActivities(data);
      }
    };

    loadActivities();
  }, [getRecentActivities]);

  const totalPages = Math.ceil(activities.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const displayedActivities = activities.slice(start, start + PER_PAGE);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-blue-50 text-blue-700";
      case "update":
        return "bg-yellow-50 text-yellow-700";
      case "delete":
        return "bg-red-50 text-red-700";
      case "approve":
        return "bg-green-50 text-green-700";
      case "reject":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case "create":
        return "Creado";
      case "update":
        return "Actualizado";
      case "delete":
        return "Eliminado";
      case "approve":
        return "Aprobado";
      case "reject":
        return "Rechazado";
      default:
        return action;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "user":
        return "Usuario";
      case "publication":
        return "Publicación";
      case "subscription":
        return "Suscripción";
      case "category":
        return "Categoría";
      default:
        return type;
    }
  };

  if (isLoading) {
    return (
      <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <h2 className="text-lg font-medium mb-4">Actividades recientes</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <h2 className="text-lg font-medium mb-4">Actividades recientes</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      </section>
    );
  }

  if (activities.length === 0) {
    return (
      <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <h2 className="text-lg font-medium mb-4">Actividades recientes</h2>
        <p className="text-center text-gray-500 py-8">
          No hay actividades recientes
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      <h2 className="text-lg font-medium mb-4">Actividades recientes</h2>

      <ul className="space-y-3">
        {displayedActivities.map((activity) => (
          <li
            key={activity.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1 mb-2 sm:mb-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${getActionColor(
                    activity.action
                  )}`}
                >
                  {getActionText(activity.action)}
                </span>
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-gray-200 text-gray-700">
                  {getTypeText(activity.type)}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-700">{activity.description}</p>
              {activity.user && (
                <p className="mt-1 text-xs text-gray-500">
                  Por: {activity.user.firstName} {activity.user.lastName}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-400">
                {new Date(activity.createdAt).toLocaleString("es-CR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prev}
            disabled={page === 1}
            aria-label="Página anterior"
            className="h-9 w-9 grid place-items-center border rounded disabled:opacity-40 hover:bg-gray-100 transition-colors"
            title="Anterior"
          >
            {"<"}
          </button>
          <span className="text-sm text-gray-600">
            {page} / {totalPages}
          </span>
          <button
            onClick={next}
            disabled={page === totalPages}
            aria-label="Página siguiente"
            className="h-9 w-9 grid place-items-center border rounded disabled:opacity-40 hover:bg-gray-100 transition-colors"
            title="Siguiente"
          >
            {">"}
          </button>
        </div>
      )}
    </section>
  );
};

export default RequestList;
