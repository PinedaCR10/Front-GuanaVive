import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Crown, 
  Search, 
  FileEdit, 
  User, 
  Plus,
  Image as ImageIcon,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../features/auth';
import { usePublications } from '../features/publications';
import { useSubscriptions, PLANS } from '../features/subscriptions';

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { publications, fetchMyPublications } = usePublications();
  const { subscription, fetchMySubscription } = useSubscriptions();
  const [stats, setStats] = useState({
    total: 0,
    publicadas: 0,
    pendientes: 0,
    borradores: 0,
  });

  useEffect(() => {
    fetchMyPublications();
    fetchMySubscription();
  }, [fetchMyPublications, fetchMySubscription]);

  useEffect(() => {
    const total = publications.length;
    const publicadas = publications.filter(p => p.status === 'publicado').length;
    const pendientes = publications.filter(p => p.status === 'pendiente_revision').length;
    const borradores = publications.filter(p => p.status === 'borrador').length;
    
    setStats({ total, publicadas, pendientes, borradores });
  }, [publications]);

  const currentPlan = subscription ? PLANS[subscription.plan as keyof typeof PLANS] : null;

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--gv-text)]">
              ¡Bienvenido, {user?.firstName}!
            </h1>
            <p className="text-[var(--gv-muted)] mt-2">
              Aquí está el resumen de tu actividad en GuanaVive
            </p>
          </div>
          <button
            onClick={() => navigate('/my-publications/create')}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nueva Publicación
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6 border-l-4 border-[var(--gv-primary)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[var(--gv-muted)]">Total</h3>
              <div className="p-2 bg-[var(--gv-primary-100)] rounded-lg">
                <BookOpen className="w-6 h-6 text-[var(--gv-primary)]" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[var(--gv-text)]">{stats.total}</p>
            <p className="text-xs text-[var(--gv-muted)] mt-1">Publicaciones totales</p>
          </div>

          <div className="card p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[var(--gv-muted)]">Publicadas</h3>
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.publicadas}</p>
            <p className="text-xs text-[var(--gv-muted)] mt-1">Aprobadas y visibles</p>
          </div>

          <div className="card p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[var(--gv-muted)]">Pendientes</h3>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendientes}</p>
            <p className="text-xs text-[var(--gv-muted)] mt-1">En revisión</p>
          </div>

          <div className="card p-6 border-l-4 border-gray-400">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[var(--gv-muted)]">Borradores</h3>
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-600">{stats.borradores}</p>
            <p className="text-xs text-[var(--gv-muted)] mt-1">Sin publicar</p>
          </div>
        </div>

        {/* Plan Actual */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-[var(--gv-text)] mb-4 flex items-center gap-2">
              <Crown className="w-6 h-6 text-[var(--gv-primary)]" />
              Tu Plan Actual
            </h2>
            
            {subscription && currentPlan ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--gv-primary)]">
                      {subscription.plan}
                    </h3>
                    <p className="text-sm text-[var(--gv-muted)]">
                      ₡{currentPlan.price.toLocaleString()} / mes
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    subscription.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {subscription.status === 'active' ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {currentPlan.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[var(--gv-text)]">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/plans')}
                  className="btn btn-outline w-full"
                >
                  Cambiar Plan
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[var(--gv-muted)] mb-4">
                  No tienes un plan activo
                </p>
                <button
                  onClick={() => navigate('/plans')}
                  className="btn btn-primary"
                >
                  Ver Planes Disponibles
                </button>
              </div>
            )}
          </div>

          {/* Accesos Rápidos */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-[var(--gv-text)] mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[var(--gv-primary)]" />
              Accesos Rápidos
            </h2>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/user-home')}
                className="w-full text-left px-4 py-3 rounded-lg border border-[var(--gv-border)] hover:border-[var(--gv-primary)] hover:bg-[var(--gv-primary-100)] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[var(--gv-primary-100)] rounded-lg">
                    <Search className="w-5 h-5 text-[var(--gv-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--gv-text)]">Explorar</p>
                    <p className="text-xs text-[var(--gv-muted)]">Ver todas las publicaciones</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/my-publications')}
                className="w-full text-left px-4 py-3 rounded-lg border border-[var(--gv-border)] hover:border-[var(--gv-primary)] hover:bg-[var(--gv-primary-100)] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileEdit className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--gv-text)]">Mis Publicaciones</p>
                    <p className="text-xs text-[var(--gv-muted)]">Gestionar mis contenidos</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/profile')}
                className="w-full text-left px-4 py-3 rounded-lg border border-[var(--gv-border)] hover:border-[var(--gv-primary)] hover:bg-[var(--gv-primary-100)] transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--gv-text)]">Mi Perfil</p>
                    <p className="text-xs text-[var(--gv-muted)]">Editar información personal</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Últimas Publicaciones */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[var(--gv-text)] flex items-center gap-2">
              <FileText className="w-6 h-6 text-[var(--gv-primary)]" />
              Últimas Publicaciones
            </h2>
            <button
              onClick={() => navigate('/my-publications')}
              className="text-sm text-[var(--gv-primary)] hover:underline"
            >
              Ver todas →
            </button>
          </div>

          {publications.length === 0 ? (
            <div className="text-center py-12 text-[var(--gv-muted)]">
              <p className="mb-4">No tienes publicaciones aún</p>
              <button
                onClick={() => navigate('/my-publications/create')}
                className="btn btn-primary"
              >
                Crear mi primera publicación
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {publications.slice(0, 5).map((pub) => (
                <div
                  key={pub.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-[var(--gv-border)] hover:border-[var(--gv-primary)] transition cursor-pointer"
                  onClick={() => navigate(`/my-publications/edit/${pub.id}`)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {pub.imageUrl ? (
                      <img
                        src={pub.imageUrl}
                        alt={pub.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--gv-text)] truncate">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-[var(--gv-muted)]">
                        {new Date(pub.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    pub.status === 'publicado'
                      ? 'bg-green-100 text-green-700'
                      : pub.status === 'pendiente_revision'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {pub.status === 'publicado' ? 'Publicado' : 
                     pub.status === 'pendiente_revision' ? 'Pendiente' : 'Borrador'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
