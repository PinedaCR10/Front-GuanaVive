// src/accessusers/UserHome.tsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CANTONES, CATEGORIES } from "./components/userFeedData";
import UserHeader from "./components/userHeader";
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
  const itemsPerPage = 9;

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UserHeader />

      <main className="flex-1 mx-auto max-w-7xl px-4 py-10 space-y-6">
        {/* 🔹 FILTROS */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="h-10 rounded-lg border px-3 text-sm outline-none focus:ring-2 w-full sm:w-1/3"
          />

          <div className="flex gap-2 flex-wrap">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-10 rounded-lg border px-3 text-sm"
            >
              <option>Todos</option>
              {CATEGORIES.map((c: string) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={canton}
              onChange={(e) => setCanton(e.target.value)}
              className="h-10 rounded-lg border px-3 text-sm"
            >
              <option>Todos</option>
              {CANTONES.map((c: string) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as "az" | "za")}
              className="h-10 rounded-lg border px-3 text-sm"
            >
              <option value="az">Nombre A–Z</option>
              <option value="za">Nombre Z–A</option>
            </select>
          </div>
        </div>

        {/* 🔹 GRID DE CARDS */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando publicaciones...</p>
          </div>
        ) : paginated.length === 0 ? (
          <p className="text-gray-600">No hay resultados.</p>
        ) : (
          <motion.ul
            layout
            className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {paginated.map((pub: Publication) => (
              <motion.li
                key={pub.id}
                className="flex flex-col border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition cursor-pointer"
                whileHover={{ y: -3 }}
                onClick={() => setSelected(pub)}
              >
                {pub.imageUrl && (
                  <img
                    src={pub.imageUrl}
                    alt={pub.title}
                    className="h-40 w-full object-cover"
                  />
                )}
                {!pub.imageUrl && (
                  <div className="h-40 w-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <span className="text-4xl text-blue-600">📄</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate">{pub.title}</h3>
                  <p className="text-sm text-gray-500">
                    {pub.categoryId}
                  </p>
                  <p className="mt-2 text-sm line-clamp-3 text-gray-700">
                    {pub.content}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {/* 🔹 PAGINACIÓN */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className={`px-3 py-1 border rounded-md text-sm ${
                page === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => goToPage(num)}
                className={`px-3 py-1 border rounded-md text-sm ${
                  num === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
              className={`px-3 py-1 border rounded-md text-sm ${
                page === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Siguiente
            </button>
          </div>
        )}
      </main>

      {/* 🔹 MODAL DETALLE */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-xl max-w-3xl w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {selected.imageUrl && (
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="w-full h-64 object-cover"
                />
              )}
              {!selected.imageUrl && (
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-6xl text-blue-600">📄</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold">{selected.title}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  <b>Categoría:</b> {selected.categoryId}
                </p>
                {selected.author && (
                  <p className="text-gray-500 text-sm">
                    <b>Autor:</b> {selected.author.firstName} {selected.author.lastName}
                  </p>
                )}
                <p className="mt-4 whitespace-pre-wrap">{selected.content}</p>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelected(null)}
                    className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
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
