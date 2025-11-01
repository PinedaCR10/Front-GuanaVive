import { useEffect } from 'react';
import { usePublications } from '../features/publications';

export default function MyPublicationsPage() {
  const { publications, isLoading, fetchMyPublications } = usePublications();

  useEffect(() => {
    fetchMyPublications();
  }, [fetchMyPublications]);

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
        <button className="btn btn-primary">
          Nueva Publicación
        </button>
      </div>

      {publications.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg text-[var(--gv-muted)]">
            Aún no tienes publicaciones
          </p>
          <button className="btn btn-primary mt-4">
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
                  <span className="text-xs text-[var(--gv-muted)]">
                    Estado: {pub.status}
                  </span>
                  <button className="text-sm text-[var(--gv-primary)] hover:underline">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
