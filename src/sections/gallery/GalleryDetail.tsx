import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Foto = {
  id: string;
  url: string;
  alt: string;
  categoria: "Bailes" | "Eventos" | "Personas" | "Paisaje";
  canton: string;
};

const CANTONES = ["Todos","Liberia","Nicoya","Santa Cruz","Cañas","Bagaces","Tilarán","Hojancha","Nandayure","Carrillo","La Cruz"];

const buildPhotos = (): Foto[] => {
  // Mezcla de horizontales y verticales para un masonry real
  const seeds = [
    { s: "a", w: 1600, h: 1100, cat: "Eventos",  can: "Santa Cruz" },
    { s: "b", w: 900,  h: 1400, cat: "Personas", can: "Nicoya" },     // VERTICAL
    { s: "c", w: 1500, h: 1000, cat: "Eventos",  can: "Liberia" },
    { s: "d", w: 950,  h: 1400, cat: "Personas", can: "La Cruz" },    // VERTICAL
    { s: "e", w: 1600, h: 1000, cat: "Bailes",   can: "Santa Cruz" },
    { s: "f", w: 900,  h: 1350, cat: "Eventos",  can: "Carrillo" },   // VERTICAL
    { s: "g", w: 1600, h: 950,  cat: "Personas", can: "Bagaces" },
    { s: "h", w: 1000, h: 1500, cat: "Bailes",   can: "Hojancha" },   // VERTICAL
    { s: "i", w: 1500, h: 1000, cat: "Eventos",  can: "Nicoya" },
    { s: "j", w: 1000, h: 1500, cat: "Personas", can: "Tilarán" },    // VERTICAL
    { s: "k", w: 1600, h: 1000, cat: "Bailes",   can: "Cañas" },
    { s: "l", w: 950,  h: 1400, cat: "Eventos",  can: "Liberia" },    // VERTICAL
  ];

  return seeds.map((o, i) => ({
    id: `ph-${i}`,
    url: `https://picsum.photos/seed/gv-${o.s}/${o.w}/${o.h}`,
    alt: `Foto ${i + 1}`,
    categoria: o.cat as Foto["categoria"],
    canton: o.can,
  }));
};

export default function GalleryDetail() {
  const all = useMemo(buildPhotos, []);

  // Filtros
  const [cat, setCat] = useState<Foto["categoria"] | "Todas">("Todas");
  const [canton, setCanton] = useState<string>("Todos");

  const filtered = all.filter(
    (p) => (cat === "Todas" || p.categoria === cat) && (canton === "Todos" || p.canton === canton)
  );

  // Preview
  const [preview, setPreview] = useState<Foto | null>(null);

  return (
    <section className="min-h-screen bg-white">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
        className="relative h-[46vh] w-full overflow-hidden"
      >
        <img
          src="https://picsum.photos/seed/gv-hero-gal/2000/1200"
          alt="Hero galería"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="px-6 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold">Galería</h1>
            <p className="mt-2 text-lg md:text-xl opacity-95">
              Donde el folclor guanacasteco cobra vida en imágenes
            </p>
          </div>
        </div>
      </motion.div>

      {/* FILTROS */}
      <div className="mx-auto -mt-10 mb-6 max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl bg-white/90 backdrop-blur shadow-lg p-4 flex flex-wrap gap-3">
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as any)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm"
          >
            <option value="Todas">Todas</option>
            <option>Bailes</option>
            <option>Eventos</option>
            <option>Personas</option>
            <option>Paisaje</option>
          </select>

          <select
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm"
          >
            {CANTONES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* MASONRY */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {filtered.map((p, idx) => (
            <motion.figure
              key={p.id}
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: (idx % 6) * 0.03 }}
              whileHover={{ y: -3, boxShadow: "0 18px 40px rgba(0,0,0,0.14)" }}
              className="group relative mb-6 break-inside-avoid rounded-2xl overflow-hidden shadow-md bg-white cursor-zoom-in"
              onClick={() => setPreview(p)}
            >
              <img src={p.url} alt={p.alt} className="w-full h-auto object-cover" loading="lazy" />

              {/* Badge rojo SOLO en hover */}
              <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-red-600/95 text-white text-xs font-semibold px-3 py-1 shadow opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {p.categoria} - {p.canton}
              </span>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
          >
            <motion.div className="absolute inset-0 bg-black/70" />
            <motion.figure
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={preview.url} alt={preview.alt} className="w-full h-auto" />
              <figcaption className="flex flex-wrap items-center justify-between gap-2 p-3 text-white/90">
                <div className="text-sm">
                  <span className="font-semibold">{preview.categoria}</span> • {preview.canton}
                </div>
                <button
                  onClick={() => setPreview(null)}
                  className="rounded-lg border border-white/30 px-4 py-1.5 text-sm hover:bg-white/10"
                >
                  Cerrar
                </button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
