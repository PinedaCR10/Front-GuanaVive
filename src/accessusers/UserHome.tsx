// src/accessusers/UserHome.tsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CANTONES, CATEGORIES } from "./components/userFeedData";
import { usePublications } from "../features/publications";
import type { Publication } from "../features/publications";

export default function UserHome() {
  const { publications, isLoading, fetchPublished } = usePublications();
  const [search, setSearch] = useState("");
  const [canton, setCanton] = useState("Todos");
  const [category, setCategory] = useState("Todos");
  const [order, setOrder] = useState<"az" | "za">("az");
  const [selected, setSelected] = useState<Publication | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Cargar publicaciones del backend
  useEffect(() => {
    fetchPublished({ status: 'publicado', limit: 100 });
  }, [fetchPublished]);

  // 🔹 Filtrado con memoización - ahora usando publicaciones reales
  const filtered = useMemo(() => {
    const arr: Publication[] = publications.filter(
      (pub) =>
        (!search ||
          pub.title.toLowerCase().includes(search.toLowerCase()) ||
          pub.content.toLowerCase().includes(search.toLowerCase())) &&
        (category === "Todos" || pub.categoryId === category.toLowerCase())
    );
    arr.sort((a, b) =>
      order === "az" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    return arr;
  }, [publications, search, category, order]);

  // 🔹 Paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const goToPage = (num: number) => {
    if (num >= 1 && num <= totalPages) setPage(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--gv-bg)]">
      <div className="container py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--gv-text)]">
                🔍 Explorar Publicaciones
              </h1>
              <p className="text-[var(--gv-muted)] mt-2">
                Descubre contenido increíble de toda la comunidad de GuanaVive
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 text-sm text-[var(--gv-muted)]">
              <span className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                {filtered.length} publicaciones encontradas
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--gv-primary)]"></span>
                Página {page} de {totalPages || 1}
              </span>
            </div>
          </div>

          {/* Filtros mejorados */}
          <div className="card p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                  🔎 Buscar
                </label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por título o contenido..."
                  className="w-full h-11 rounded-lg border border-[var(--gv-border)] px-4 text-sm outline-none focus:ring-2 focus:ring-[var(--gv-primary)] focus:border-transparent transition"
                />
              </div>

              <div className="flex gap-3 flex-wrap lg:flex-nowrap">
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                    📂 Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 rounded-lg border border-[var(--gv-border)] px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--gv-primary)] focus:border-transparent transition bg-white"
                  >
                    <option>Todos</option>
                    {CATEGORIES.map((c: string) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                    📍 Cantón
                  </label>
                  <select
                    value={canton}
                    onChange={(e) => setCanton(e.target.value)}
                    className="w-full h-11 rounded-lg border border-[var(--gv-border)] px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--gv-primary)] focus:border-transparent transition bg-white"
                  >
                    <option>Todos</option>
                    {CANTONES.map((c: string) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                    ⬇️ Ordenar
                  </label>
                  <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value as "az" | "za")}
                    className="w-full h-11 rounded-lg border border-[var(--gv-border)] px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--gv-primary)] focus:border-transparent transition bg-white"
                  >
                    <option value="az">A → Z</option>
                    <option value="za">Z → A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de publicaciones */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--gv-primary)] border-r-transparent"></div>
              <p className="mt-4 text-[var(--gv-muted)] font-medium">Cargando publicaciones...</p>
            </div>
          ) : paginated.length === 0 ? (
            <div className="card p-12 text-center">
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-xl font-semibold text-[var(--gv-text)] mb-2">
                No se encontraron publicaciones
              </h3>
              <p className="text-[var(--gv-muted)]">
                Intenta ajustar tus filtros de búsqueda
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {paginated.map((pub: Publication) => (
                <motion.div
                  key={pub.id}
                  className="card overflow-hidden cursor-pointer group"
                  whileHover={{ y: -4 }}
                  onClick={() => setSelected(pub)}
                >
                  <div className="relative overflow-hidden">
                    {pub.imageUrl ? (
                      <img
                        src={pub.imageUrl}
                        alt={pub.title}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-48 w-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
                        <span className="text-5xl">📄</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--gv-primary-100)] text-[var(--gv-primary)]">
                        {pub.categoryId}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-lg text-[var(--gv-text)] mb-2 line-clamp-1 group-hover:text-[var(--gv-primary)] transition">
                      {pub.title}
                    </h3>
                    
                    <p className="text-sm text-[var(--gv-muted)] line-clamp-2">
                      {pub.content}
                    </p>

                    {pub.author && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--gv-border)]">
                        <div className="h-6 w-6 rounded-full bg-[var(--gv-primary)] flex items-center justify-center text-white text-xs font-semibold">
                          {pub.author.firstName?.[0]}
                        </div>
                        <span className="text-xs text-[var(--gv-muted)]">
                          {pub.author.firstName} {pub.author.lastName}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Paginación mejorada */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                  page === 1
                    ? "text-[var(--gv-muted)] bg-gray-100 cursor-not-allowed"
                    : "text-[var(--gv-text)] bg-white border border-[var(--gv-border)] hover:bg-[var(--gv-primary-100)] hover:border-[var(--gv-primary)]"
                }`}
              >
                ← Anterior
              </button>

              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let num: number;
                  if (totalPages <= 7) {
                    num = i + 1;
                  } else if (page <= 4) {
                    num = i + 1;
                  } else if (page >= totalPages - 3) {
                    num = totalPages - 6 + i;
                  } else {
                    num = page - 3 + i;
                  }
                  
                  return (
                    <button
                      key={num}
                      onClick={() => goToPage(num)}
                      className={`min-w-[40px] h-10 rounded-lg font-medium text-sm transition ${
                        num === page
                          ? "bg-[var(--gv-primary)] text-white"
                          : "text-[var(--gv-text)] bg-white border border-[var(--gv-border)] hover:bg-[var(--gv-primary-100)] hover:border-[var(--gv-primary)]"
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                  page === totalPages
                    ? "text-[var(--gv-muted)] bg-gray-100 cursor-not-allowed"
                    : "text-[var(--gv-text)] bg-white border border-[var(--gv-border)] hover:bg-[var(--gv-primary-100)] hover:border-[var(--gv-primary)]"
                }`}
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalle mejorado */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagen */}
              <div className="relative">
                {selected.imageUrl ? (
                  <img
                    src={selected.imageUrl}
                    alt={selected.title}
                    className="w-full h-80 object-cover"
                  />
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
                    <span className="text-8xl">📄</span>
                  </div>
                )}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition shadow-lg"
                >
                  <span className="text-xl">✕</span>
                </button>
              </div>

              {/* Contenido */}
              <div className="p-8">
                {/* Header con categoría */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-[var(--gv-primary-100)] text-[var(--gv-primary)]">
                    {selected.categoryId}
                  </span>
                  <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                    ✓ Publicado
                  </span>
                </div>

                {/* Título */}
                <h2 className="text-3xl font-bold text-[var(--gv-text)] mb-4">
                  {selected.title}
                </h2>

                {/* Info del autor */}
                {selected.author && (
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[var(--gv-border)]">
                    <div className="h-12 w-12 rounded-full bg-[var(--gv-primary)] flex items-center justify-center text-white text-lg font-semibold">
                      {selected.author.firstName?.[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--gv-text)]">
                        {selected.author.firstName} {selected.author.lastName}
                      </p>
                      <p className="text-sm text-[var(--gv-muted)]">
                        {selected.author.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Contenido */}
                <div className="prose max-w-none">
                  <p className="text-[var(--gv-text)] leading-relaxed whitespace-pre-wrap">
                    {selected.content}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-[var(--gv-border)] flex justify-end gap-3">
                  <button
                    onClick={() => setSelected(null)}
                    className="btn btn-outline"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
