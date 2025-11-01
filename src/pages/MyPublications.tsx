import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePublications } from '../features/publications';

export default function MyPublicationsPage() {
  const navigate = useNavigate();
  const { publications, isLoading, fetchMyPublications, deletePublication } = usePublications();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchMyPublications();
  }, [fetchMyPublications]);

  const handleDelete = async (id: string) => {
    try {
      await deletePublication(id);
      await fetchMyPublications();
      setDeleteId(null);
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      borrador: 'bg-gray-200 text-gray-800',
      pendiente_revision: 'bg-yellow-200 text-yellow-800',
      publicado: 'bg-green-200 text-green-800',
      archivado: 'bg-red-200 text-red-800',
    };
    const labels = {
      borrador: 'Borrador',
      pendiente_revision: 'Pendiente',
      publicado: 'Publicado',
      archivado: 'Archivado',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[status as keyof typeof colors] || 'bg-gray-200 text-gray-800'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--gv-primary)] border-r-transparent"></div>
          <p className="mt-4 text-[var(--gv-muted)]">Cargando publicaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--gv-text)]">Mis Publicaciones</h1>
          <p className="mt-2 text-[var(--gv-muted)]">
            Gestiona tus publicaciones y crea nuevas
          </p>
        </div>
        <button
          onClick={() => navigate('/my-publications/create')}
          className="btn btn-primary"
        >
          Nueva Publicación
        </button>
      </div>

      {publications.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg text-[var(--gv-muted)]">
            Aún no tienes publicaciones
          </p>
          <button
            onClick={() => navigate('/my-publications/create')}
            className="btn btn-primary mt-4"
          >
            Crear mi primera publicación
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {publications.map((pub) => (
            <div key={pub.id} className="card overflow-hidden">
              {pub.imageUrl && (
                <img
                  src={pub.imageUrl}
                  alt={pub.title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-[var(--gv-text)]">{pub.title}</h3>
                <p className="mt-2 text-sm text-[var(--gv-muted)] line-clamp-2">
                  {pub.content}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  {getStatusBadge(pub.status)}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/my-publications/edit/${pub.id}`)}
                      className="text-sm text-[var(--gv-primary)] hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setDeleteId(pub.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDeleteId(null)}>
          <div className="bg-white rounded-lg p-6 max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-[var(--gv-text)] mb-4">Confirmar eliminación</h2>
            <p className="text-[var(--gv-muted)] mb-6">
              ¿Estás seguro de que deseas eliminar esta publicación? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="btn btn-outline"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
