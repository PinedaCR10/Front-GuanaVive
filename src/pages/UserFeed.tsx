import { useEffect, useState, useCallback } from 'react';
import { usePublications } from '../features/publications';
import type { Publication } from '../features/publications';
import { useAuth } from '../features/auth';
import { useNavigate } from 'react-router-dom';

export default function UserFeed() {
  const { publications, isLoading, fetchPublished } = usePublications();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  const loadPublications = useCallback(async () => {
    try {
      await fetchPublished({ page, limit: 9, status: 'publicado' });
      // Si obtenemos menos de 9, no hay más
      if (publications.length < 9) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading publications:', error);
    }
  }, [page, fetchPublished, publications.length]);

  useEffect(() => {
    loadPublications();
  }, [loadPublications]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 100
      && hasMore
      && !isLoading
    ) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isLoading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (isLoading && publications.length === 0) {
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
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 py-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--gv-text)]">
              Descubre Guanacaste
            </h1>
            <p className="mt-2 text-[var(--gv-muted)]">
              Explora la cultura, gastronomía y tradiciones de nuestra región
            </p>
          </div>
          {user && (
            <button
              onClick={() => navigate('/my-publications/create')}
              className="btn btn-primary"
            >
              Nueva Publicación
            </button>
          )}
        </div>

        {/* Grid de publicaciones */}
        {publications.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-lg text-[var(--gv-muted)]">
              No hay publicaciones disponibles
            </p>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="card overflow-hidden cursor-pointer hover:shadow-lg transition"
                onClick={() => setSelectedPublication(pub)}
              >
                {pub.imageUrl && (
                  <img
                    src={pub.imageUrl}
                    alt={pub.title}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate">{pub.title}</h3>
                  {pub.author && (
                    <p className="text-sm text-[var(--gv-muted)] mt-1">
                      Por {pub.author.firstName} {pub.author.lastName}
                    </p>
                  )}
                  {pub.category && (
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-[var(--gv-primary-100)] text-[var(--gv-primary)]">
                      {pub.category.name}
                    </span>
                  )}
                  <p className="mt-3 text-sm text-[var(--gv-muted)] line-clamp-3">
                    {pub.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading más publicaciones */}
        {isLoading && publications.length > 0 && (
          <div className="text-center py-4">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-[var(--gv-primary)] border-r-transparent"></div>
          </div>
        )}

        {!hasMore && publications.length > 0 && (
          <p className="text-center text-[var(--gv-muted)] py-4">
            No hay más publicaciones
          </p>
        )}
      </main>

      {/* Modal de detalle */}
      {selectedPublication && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelectedPublication(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedPublication.imageUrl && (
              <img
                src={selectedPublication.imageUrl}
                alt={selectedPublication.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold">{selectedPublication.title}</h2>
              {selectedPublication.author && (
                <p className="text-[var(--gv-muted)] mt-2">
                  Por {selectedPublication.author.firstName} {selectedPublication.author.lastName}
                </p>
              )}
              {selectedPublication.category && (
                <span className="inline-block mt-3 text-sm px-3 py-1 rounded bg-[var(--gv-primary-100)] text-[var(--gv-primary)]">
                  {selectedPublication.category.name}
                </span>
              )}
              <div className="mt-4 prose max-w-none">
                {selectedPublication.content}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedPublication(null)}
                  className="btn btn-outline"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
