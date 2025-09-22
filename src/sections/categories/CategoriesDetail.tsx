import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type Item = {
  id: string;
  name: string;
  canton: string;
  category: string;
  description: string;
  references: { label: string; url: string }[];
  image: string;
};

const TITLES: Record<string, string> = {
  bailes: "Bailes Folklóricos",
  musica: "Músicos Folklóricos",
  retahileros: "Retahileros",
  eventos: "Eventos",
  artesanos: "Artesanos",
  haciendas: "Haciendas",
};

const CANTONES = [
  "Liberia","Nicoya","Santa Cruz","Cañas","Bagaces",
  "Tilarán","Hojancha","Nandayure","Carrillo","La Cruz",
];

function generateItems(slug: string): Item[] {
  return Array.from({ length: 10 }).map((_, i) => {
    const canton = CANTONES[i % CANTONES.length];
    const nameBase: Record<string, string> = {
      bailes: "Grupo de Baile",
      musica: "Artista",
      retahileros: "Retahilero",
      eventos: "Evento",
      artesanos: "Artesano",
      haciendas: "Hacienda",
    };
    const catName = nameBase[slug as keyof typeof nameBase] ?? "Elemento";

    return {
      id: `${slug}-${i + 1}`,
      name: `${catName} ${i + 1}`,
      canton,
      category: TITLES[slug] ?? slug,
      description:
        "Descripción breve del elemento con enfoque cultural guanacasteco. Información mock para la fase inicial de UI.",
      references: [
        { label: "Referencia 1", url: "https://es.wikipedia.org/wiki/Guanacaste" },
        { label: "Referencia 2", url: "https://www.museosdecostarica.go.cr/" },
      ],
      image: `https://picsum.photos/seed/gv-${slug}-${i}/640/420`,
    };
  });
}

const MOCK: Record<string, Item[]> = {
  musica: generateItems("musica"),
  bailes: generateItems("bailes"),
  retahileros: generateItems("retahileros"),
  eventos: generateItems("eventos"),
  artesanos: generateItems("artesanos"),
  haciendas: generateItems("haciendas"),
};

const listVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const rowVariants: Variants = {
  hidden: { y: 14, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

export default function CategoriesDetail() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();

  const title = TITLES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
  const allItems = useMemo<Item[]>(
    () => (MOCK[slug as keyof typeof MOCK] ?? []),
    [slug]
  );

  // filtros
  const [q, setQ] = useState("");
  const cantones = useMemo(
    () => Array.from(new Set(allItems.map((i) => i.canton))).sort(),
    [allItems]
  );
  const [canton, setCanton] = useState<string>("Todos");
  const [order, setOrder] = useState<"az" | "za">("az");

  // modal
  const [selected, setSelected] = useState<Item | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    let arr = allItems.filter(
      (i) =>
        (!q ||
          i.name.toLowerCase().includes(q.toLowerCase()) ||
          i.description.toLowerCase().includes(q.toLowerCase())) &&
        (canton === "Todos" || i.canton === canton)
    );
    arr.sort((a, b) =>
      order === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    return arr;
  }, [allItems, q, canton, order]);

  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold">{title}</h1>

        <div className="flex flex-wrap items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre..."
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gray-200"
          />
          <select
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm"
          >
            <option>Todos</option>
            {cantones.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as "az" | "za")}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm"
          >
            <option value="az">Nombre A–Z</option>
            <option value="za">Nombre Z–A</option>
          </select>
          <button
            onClick={() => navigate(-1)}
            className="h-10 rounded-lg border border-gray-300 px-3 text-sm font-medium hover:bg-gray-50"
          >
            Regresar
          </button>
        </div>
      </div>

      <hr className="mb-6 border-gray-200" />

      {filtered.length === 0 ? (
        <p className="text-gray-600">No hay resultados.</p>
      ) : (
        // 1 col en móvil, 2 en md, 3 en lg: aprovecha costados en desktop
        <motion.ul
          className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {filtered.map((item) => (
            <motion.li
              key={item.id}
              variants={rowVariants}
              whileHover={{ y: -2, boxShadow: "0 10px 18px rgba(0,0,0,0.06)" }}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer"
              onClick={() => setSelected(item)}
              role="button"
            >
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold">{item.name}</h3>

                <dl className="mt-1 text-xs text-gray-600">
                  <div className="flex gap-2">
                    <dt className="font-medium">Categoría:</dt>
                    <dd className="truncate">{item.category}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium">Cantón:</dt>
                    <dd>{item.canton}</dd>
                  </div>
                </dl>

                <p className="mt-2 line-clamp-2 text-sm text-gray-700">
                  {item.description}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs font-semibold text-gray-700">Referencias:</span>
                  {item.references.map((r, idx) => (
                    <Link
                      key={idx}
                      to={r.url}
                      target="_blank"
                      className="text-xs text-blue-700 underline-offset-2 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
         <motion.div
  className="relative z-10 w-full max-w-3xl rounded-2xl bg-white shadow-xl"
  initial={{ scale: 0.95, y: 10, opacity: 0 }}
  animate={{ scale: 1, y: 0, opacity: 1 }}
  exit={{ scale: 0.98, y: 8, opacity: 0 }}
  transition={{ type: "spring", stiffness: 260, damping: 22 }}
  onClick={(e) => e.stopPropagation()}
  role="dialog"
  aria-modal="true"
>
  {/* Imagen */}
  <div className="overflow-hidden rounded-t-2xl">
    <img
      src={selected.image}
      alt={selected.name}
      className="h-72 w-full object-cover"
    />
  </div>

  {/* Contenido */}
  <div className="p-5 sm:p-6">
    <div className="mb-3">
      <h3 className="text-lg font-semibold">{selected.name}</h3>
      <p className="text-sm text-gray-600">
        <span className="font-medium">Categoría:</span> {selected.category} &nbsp;•&nbsp;
        <span className="font-medium">Cantón:</span> {selected.canton}
      </p>
    </div>

    <p className="text-sm text-gray-700">{selected.description}</p>

    <div className="mt-4">
      <p className="text-sm font-semibold text-gray-800">Referencias</p>
      <div className="mt-1 flex flex-wrap gap-3">
        {selected.references.map((r, i) => (
          <a
            key={i}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-700 underline-offset-2 hover:underline"
          >
            {r.label}
          </a>
        ))}
      </div>
    </div>

    {/* Botón abajo a la derecha */}
    <div className="mt-6 flex justify-end">
      <button
        onClick={() => setSelected(null)}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        Cerrar
      </button>
    </div>
  </div>
</motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
