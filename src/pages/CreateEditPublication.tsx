import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePublications } from '../features/publications';
import type { CreatePublicationDto } from '../features/publications';

export default function CreateEditPublication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications, isLoading, createPublication, updatePublication, fetchById } = usePublications();
  
  const [form, setForm] = useState<CreatePublicationDto>({
    title: '',
    content: '',
    categoryId: '',
    imageUrl: '',
    status: 'borrador',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  // Cargar publicación si estamos editando
  useEffect(() => {
    if (id) {
      const loadPublication = async () => {
        try {
          await fetchById(id);
          const pub = publications.find(p => p.id === id);
          if (pub) {
            setForm({
              title: pub.title,
              content: pub.content,
              categoryId: pub.categoryId,
              imageUrl: pub.imageUrl || '',
              status: pub.status,
            });
          }
        } catch {
          setFormError('Error al cargar la publicación');
        }
      };
      loadPublication();
    }
  }, [id, fetchById, publications]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    // Validaciones
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = 'El título es requerido';
    if (!form.content.trim()) newErrors.content = 'El contenido es requerido';
    if (!form.categoryId) newErrors.categoryId = 'Selecciona una categoría';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (id) {
        await updatePublication(id, form);
      } else {
        await createPublication(form);
      }
      navigate('/my-publications');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error al guardar';
      setFormError(errorMessage);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/my-publications')}
            className="text-[var(--gv-primary)] hover:underline mb-4"
          >
            ← Volver a mis publicaciones
          </button>
          <h1 className="text-3xl font-bold text-[var(--gv-text)]">
            {id ? 'Editar Publicación' : 'Nueva Publicación'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-6">
          {formError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {formError}
            </div>
          )}

          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
              Título *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${
                errors.title ? 'border-red-400' : 'border-gray-300'
              }`}
              placeholder="Ej: Tradiciones de Guanacaste"
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
              Contenido *
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={8}
              className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${
                errors.content ? 'border-red-400' : 'border-gray-300'
              }`}
              placeholder="Describe tu publicación..."
            />
            {errors.content && <p className="mt-1 text-xs text-red-600">{errors.content}</p>}
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
              Categoría *
            </label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className={`w-full rounded-lg border px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)] ${
                errors.categoryId ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona una categoría</option>
              <option value="danza">Danza</option>
              <option value="gastronomia">Gastronomía</option>
              <option value="retahilero">Retahílero</option>
              <option value="artista_local">Artista Local</option>
              <option value="grupo_musica">Grupo de Música</option>
            </select>
            {errors.categoryId && <p className="mt-1 text-xs text-red-600">{errors.categoryId}</p>}
          </div>

          {/* URL de imagen */}
          <div>
            <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
              URL de imagen (opcional)
            </label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)]"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
              Estado
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as 'borrador' | 'publicado' | 'archivado' | 'pendiente_revision' })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[var(--gv-primary)] focus:ring-1 focus:ring-[var(--gv-primary)]"
            >
              <option value="borrador">Borrador</option>
              <option value="pendiente_revision">Enviar a revisión</option>
            </select>
            <p className="mt-1 text-xs text-[var(--gv-muted)]">
              Los borradores solo tú puedes verlos. Las publicaciones en revisión serán evaluadas por un administrador.
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate('/my-publications')}
              className="btn btn-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? 'Guardando...' : id ? 'Actualizar' : 'Crear Publicación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
