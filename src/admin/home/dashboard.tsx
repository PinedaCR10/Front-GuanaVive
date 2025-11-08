import React, { useEffect, useState } from "react";
import { Users, UserCheck, FileText, CheckCircle, Clock, FolderOpen, CreditCard, TrendingUp } from "lucide-react";
import { useAdmin } from "../../features/admin";
import type { DashboardStats } from "../../features/admin";
import RequestList from "./requests";

const Dashboard: React.FC = () => {
  const { getDashboardStats, isLoading, error } = useAdmin();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  console.log('📊 Dashboard: Componente renderizado', { isLoading, error, stats });

  useEffect(() => {
    const loadStats = async () => {
      console.log('📊 Dashboard: Cargando estadísticas...');
      const data = await getDashboardStats();
      console.log('📊 Dashboard: Datos recibidos', data);
      console.log('📊 Dashboard: Estructura completa:', JSON.stringify(data, null, 2));
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--gv-primary)]"></div>
        </div>
      </section>
    );
  }

  const statsArray = stats
    ? [
        { 
          title: "Total de usuarios", 
          value: stats.users?.total ?? 0,
          icon: Users,
          color: "blue",
          bgColor: "bg-blue-100",
          iconColor: "text-blue-600"
        },
        { 
          title: "Usuarios activos", 
          value: stats.users?.active ?? 0,
          icon: UserCheck,
          color: "green",
          bgColor: "bg-green-100",
          iconColor: "text-green-600"
        },
        { 
          title: "Total de publicaciones", 
          value: stats.publications?.total ?? 0,
          icon: FileText,
          color: "purple",
          bgColor: "bg-purple-100",
          iconColor: "text-purple-600"
        },
        { 
          title: "Publicaciones publicadas", 
          value: stats.publications?.published ?? 0,
          icon: CheckCircle,
          color: "emerald",
          bgColor: "bg-emerald-100",
          iconColor: "text-emerald-600"
        },
        { 
          title: "Publicaciones pendientes", 
          value: stats.publications?.pending ?? 0,
          icon: Clock,
          color: "yellow",
          bgColor: "bg-yellow-100",
          iconColor: "text-yellow-600"
        },
        { 
          title: "Categorías", 
          value: stats.categories?.total ?? 0,
          icon: FolderOpen,
          color: "indigo",
          bgColor: "bg-indigo-100",
          iconColor: "text-indigo-600"
        },
        { 
          title: "Suscripciones activas", 
          value: stats.subscriptions?.active ?? 0,
          icon: TrendingUp,
          color: "orange",
          bgColor: "bg-orange-100",
          iconColor: "text-orange-600"
        },
        { 
          title: "Total suscripciones", 
          value: stats.subscriptions?.total ?? 0,
          icon: CreditCard,
          color: "pink",
          bgColor: "bg-pink-100",
          iconColor: "text-pink-600"
        },
      ]
    : [];

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--gv-text)] mb-2">Panel Principal</h1>
        <p className="text-[var(--gv-muted)]">
          ¡Bienvenido de nuevo! Esto es lo que está pasando en tu plataforma
        </p>
      </div>

      {/* Mensaje de error si existe */}
      {error && (
        <div className="card bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-red-800">Error al cargar estadísticas</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <p className="text-xs text-red-600 mt-2">El panel continuará funcionando sin estadísticas en tiempo real</p>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje si no hay stats pero tampoco hay error */}
      {!stats && !error && !isLoading && (
        <div className="card bg-blue-50 border-l-4 border-blue-500 p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-800">No se pudieron cargar las estadísticas</p>
              <p className="text-sm text-blue-700 mt-1">Verifique que el backend esté corriendo en http://localhost:3000</p>
            </div>
          </div>
        </div>
      )}

      {/* Métricas */}
      {statsArray.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsArray.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="card p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-[var(--gv-primary)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[var(--gv-text)] mb-1">{stat.value}</p>
                <p className="text-sm text-[var(--gv-muted)]">{stat.title}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Solicitudes / Actividades */}
      <RequestList />
    </section>
  );
};

export default Dashboard;
