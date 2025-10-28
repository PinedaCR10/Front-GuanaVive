// src/accessusers/UserHome.tsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CANTONES, CATEGORIES, FEED_DATA } from "./components/userFeedData";
import UserHeader from "./components/userHeader";


interface FeedItem {
  id: string;
  name: string;
  canton: string;
  category: string;
  description: string;
  image: string;
  references: { label: string; url: string }[];
}

export default function UserHome() {
  const [search, setSearch] = useState("");
  const [canton, setCanton] = useState("Todos");
  const [category, setCategory] = useState("Todos");
  const [order, setOrder] = useState<"az" | "za">("az");
  const [selected, setSelected] = useState<FeedItem | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  // 🔹 Filtrado con memoización
  const filtered = useMemo(() => {
    let arr: FeedItem[] = FEED_DATA.filter(
      (i) =>
        (!search ||
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.description.toLowerCase().includes(search.toLowerCase())) &&
        (canton === "Todos" || i.canton === canton) &&
        (category === "Todos" || i.category === category)
    );
    arr.sort((a, b) =>
      order === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    return arr;
  }, [search, canton, category, order]);

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
        {paginated.length === 0 ? (
          <p className="text-gray-600">No hay resultados.</p>
        ) : (
          <motion.ul
            layout
            className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {paginated.map((item: FeedItem) => (
              <motion.li
                key={item.id}
                className="flex flex-col border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition cursor-pointer"
                whileHover={{ y: -3 }}
                onClick={() => setSelected(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.category} • {item.canton}
                  </p>
                  <p className="mt-2 text-sm line-clamp-3 text-gray-700">
                    {item.description}
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
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold">{selected.name}</h2>
                <p className="text-gray-600 text-sm mt-1">
                  <b>Categoría:</b> {selected.category} • <b>Cantón:</b>{" "}
                  {selected.canton}
                </p>
                <p className="mt-4">{selected.description}</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Referencias</p>
                  <div className="mt-2 flex gap-3 flex-wrap">
                    {selected.references.map((r, i) => (
                      <a
                        key={i}
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {r.label}
                      </a>
                    ))}
                  </div>
                </div>
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
