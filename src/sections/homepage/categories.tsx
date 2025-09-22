// src/sections/homepage/categories.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

type Category = { slug: string; title: string; description: string; image: string };

const BASE: Omit<Category, "image">[] = [
  { slug: "bailes", title: "Bailes", description: "Expresiones de identidad y tradición a través del movimiento." },
  { slug: "musica", title: "Música", description: "Sonidos que cuentan la historia viva del folclor guanacasteco." },
  { slug: "retahileros", title: "Retahileros", description: "Narradores populares que preservan nuestras raíces." },
  { slug: "eventos", title: "Eventos", description: "Escenarios donde se vive la historia y tradición." },
  { slug: "artesanos", title: "Artesanos", description: "Manos que transforman cultura en piezas únicas." },
  { slug: "haciendas", title: "Haciendas", description: "Arquitectura y tradición de la pampa." },
];

const gridV: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const cardV: Variants = { hidden: { y: 14, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.28 } } };

export default function Categories() {
  const navigate = useNavigate();

  const categories: Category[] = useMemo(
    () => BASE.map((c, i) => ({ ...c, image: `https://picsum.photos/seed/gv-cat-${i}/1200/750` })),
    []
  );

  const go = (slug: string) => navigate(`/categorias/${slug}`);

  return (
    <section className="py-8">
      {/* ⬇️ CONTENEDOR: centra y separa de bordes, sin perder ancho */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <header className="mb-7">
          <h1 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight">Categorías</h1>
        </header>

        {/* 2 en móvil, 3 fijas en desktop */}
        <motion.div
          variants={gridV}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {categories.map((cat) => (
            <motion.article
              key={cat.slug}
              variants={cardV}
              onClick={() => go(cat.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  go(cat.slug);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Abrir ${cat.title}`}
              className="group rounded-xl border border-gray-200 bg-white shadow-sm outline-none transition
                         hover:-translate-y-0.5 hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
            >
              {/* Imagen corta */}
              <div className="w-full overflow-hidden rounded-t-xl bg-gray-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-[120px] sm:h-[135px] md:h-[150px] lg:h-[160px] w-full object-cover transition group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Contenido compacto */}
              <div className="space-y-2 p-3">
                <div>
                  <h2 className="text-sm md:text-base font-semibold">{cat.title}</h2>
                  <p className="text-xs md:text-sm text-gray-600">{cat.description}</p>
                </div>

                {/* Botón visual (todo el card es clickeable) */}
                <div className="pointer-events-none">
                  <span className="inline-flex w-full items-center justify-center rounded-md bg-[#1f6fb2] text-white px-3 py-1.5 text-xs md:text-sm font-semibold">
                    Ver más
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
