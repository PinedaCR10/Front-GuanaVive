// src/sections/homepage/gallery-detail.tsx
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

type Foto = {
  id: string;
  url: string;
  alt: string;
  categoria: "Bailes" | "Eventos" | "Personas" | "Paisaje";
  canton: string;
};

// Lista de cantones disponibles
const CANTONES = [
  "Todos",
  "Liberia",
  "Nicoya",
  "Santa Cruz",
  "Cañas",
  "Bagaces",
  "Tilarán",
  "Hojancha",
  "Nandayure",
  "Carrillo",
  "La Cruz",
];

// ✅ Aquí defines tus fotos (locales o URLs externas)
const PHOTOS: Foto[] = [
  {
    id: "ph-1",
    url: "https://vozdeguanacaste.com/wp-content/uploads/2023/06/2023-JUNIO-Marcha-del-Orgullo-Nosara-Diversidad-LGBTIQ-Derechos-Humanos-Cesar-Arroyo-10.webp",
    alt: "Baile tradicional en el parque",
    categoria: "Eventos",
    canton: "Santa Cruz",
  },
  {
    id: "ph-2",
    url: "https://vozdeguanacaste.com/wp-content/uploads/2018/01/mg_5502_0.jpg",
    alt: "Retrato de artista local",
    categoria: "Personas",
    canton: "Nicoya",
  },
  {
    id: "ph-3",
    url: "https://www.periodicomensaje.com/images/topeliberia_correcto.jpg",
    alt: "Festival en Liberia",
    categoria: "Eventos",
    canton: "Liberia",
  },
  {
    id: "ph-4",
    url: "https://www.muniliberia.go.cr/muni/img/articles/detail/113_1_trajetpico2.jpg",
    alt: "Joven con traje típico",
    categoria: "Personas",
    canton: "La Cruz",
  },
  {
    id: "ph-5",
    url: "https://sicultura-live.s3.amazonaws.com/public/media/49204407_2226986824230665_1864653325639614464_o.jpg",
    alt: "Grupo de baile típico",
    categoria: "Bailes",
    canton: "Santa Cruz",
  },
  {
    id: "ph-6",
    url: "https://primeroennoticias.com/wp-content/uploads/2020/02/Fiestas.jpg",
    alt: "Desfile cultural",
    categoria: "Eventos",
    canton: "Carrillo",
  },
  {
    id: "ph-7",
    url: "https://assets-teletica.ray.media/Files/Sizes/2022/8/12/artesanos-guanacastecos-crean-el-primer-mercado-artesanal-y-cultu_1923806234_760x520.jpg",
    alt: "Artesano tallando madera",
    categoria: "Personas",
    canton: "Bagaces",
  },
  {
    id: "ph-8",
    url: "https://i.ytimg.com/vi/cz64x2n2_jo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDFYRIb7U5rUM-yaZgTT3EnSukm2w",
    alt: "Baile folclórico en Hojancha",
    categoria: "Bailes",
    canton: "Hojancha",
  },
  {
    id: "ph-9",
    url: "https://www.nacion.com/resizer/v2/M4PZRMBCVNFRHJEJD74A7CQ4DI.JPG?smart=true&auth=ded641a33c0ecef8ebf650a8fd8cf360fd11601c56487ac723c8a87ac4dddc1e&width=3648&height=2432",
    alt: "Celebración en Nicoya",
    categoria: "Eventos",
    canton: "Nicoya",
  },
  {
    id: "ph-10",
    url: "https://vozdeguanacaste.com/wp-content/uploads/2018/01/pilar.jpg",
    alt: "Cantante folclórico en Tilarán",
    categoria: "Personas",
    canton: "Tilarán",
  },
  {
    id: "ph-11",
    url: "https://sicultura-live.s3.amazonaws.com/public/media/68811416_641621039682343_7819470398864490496_n.jpg",
    alt: "Viaje por hacienda típica",
    categoria: "Bailes",
    canton: "Cañas",
  },
  {
    id: "ph-12",
    url: "https://image-tc.galaxy.tf/wijpeg-752y0142n8fallil0hjzgrlkz/tope-tradicion_wide.jpg?crop=0%2C20%2C960%2C540",
    alt: "Evento cultural en Liberia",
    categoria: "Eventos",
    canton: "Liberia",
  },
];

export default function GalleryDetail() {
  const { t } = useTranslation("galeria_detalle");

  const all = useMemo(() => PHOTOS, []);
  const [cat, setCat] = useState<Foto["categoria"] | "Todas">("Todas");
  const [canton, setCanton] = useState<string>("Todos");

  const filtered = all.filter(
    (p) =>
      (cat === "Todas" || p.categoria === cat) &&
      (canton === "Todos" || p.canton === canton)
  );

  const [preview, setPreview] = useState<Foto | null>(null);

  return (
    <section className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
        className="relative h-[46vh] w-full overflow-hidden"
      >
        <img
          src="https://vozdeguanacaste.com/wp-content/uploads/2018/01/marimba1.jpg"
          alt={t("HERO_ALT", { defaultValue: "Hero galería" })}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="px-6 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              {t("TITLE", { defaultValue: "Galería" })}
            </h1>
            <p className="mt-2 text-lg md:text-xl opacity-95">
              {t("SUBTITLE", {
                defaultValue:
                  "Donde el folclor guanacasteco cobra vida en imágenes",
              })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* FILTROS */}
      <div className="mx-auto mt-6 md:mt-8 mb-6 max-w-6xl px-4 sm:px-6">
        <div
          className="rounded-2xl shadow-lg p-4 flex flex-wrap gap-3"
          style={{
            background: "var(--card)",
            border: "1px solid var(--card-border)",
          }}
        >
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as any)}
            className="h-10 rounded-lg border px-3 text-sm"
            style={{
              background: "var(--bg-soft)",
              borderColor: "var(--card-border)",
              color: "var(--text)",
            }}
          >
            <option value="Todas">
              {t("FILTER_ALL", { defaultValue: "Todas" })}
            </option>
            <option>{t("FILTER_BAILES", { defaultValue: "Bailes" })}</option>
            <option>{t("FILTER_EVENTOS", { defaultValue: "Eventos" })}</option>
            <option>
              {t("FILTER_PERSONAS", { defaultValue: "Personas" })}
            </option>
            <option>{t("FILTER_PAISAJE", { defaultValue: "Paisaje" })}</option>
          </select>

          <select
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
            className="h-10 rounded-lg border px-3 text-sm"
            style={{
              background: "var(--bg-soft)",
              borderColor: "var(--card-border)",
              color: "var(--text)",
            }}
          >
            {CANTONES.map((c) => (
              <option key={c}>{t(`CANTON.${c}`, { defaultValue: c })}</option>
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
              whileHover={{
                y: -3,
                boxShadow: "0 18px 40px rgba(0,0,0,0.14)",
              }}
              className="group relative mb-6 break-inside-avoid rounded-2xl overflow-hidden shadow-md cursor-zoom-in"
              style={{
                background: "var(--card)",
                border: "1px solid var(--card-border)",
              }}
              onClick={() => setPreview(p)}
            >
              <img
                src={p.url}
                alt={p.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-red-600/95 text-white text-xs font-semibold px-3 py-1 shadow opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {t(`FILTER_${p.categoria.toUpperCase()}`, {
                  defaultValue: p.categoria,
                })}{" "}
                -{" "}
                {t(`CANTON.${p.canton}`, { defaultValue: p.canton })}
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
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl"
              style={{ background: "var(--card)" }}
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={preview.url}
                alt={preview.alt}
                className="w-full h-auto"
              />
              <figcaption
                className="flex flex-wrap items-center justify-between gap-2 p-3"
                style={{ color: "var(--text)" }}
              >
                <div className="text-sm">
                  <span className="font-semibold">
                    {t(`FILTER_${preview.categoria.toUpperCase()}`, {
                      defaultValue: preview.categoria,
                    })}
                  </span>{" "}
                  •{" "}
                  {t(`CANTON.${preview.canton}`, {
                    defaultValue: preview.canton,
                  })}
                </div>
                <button
                  onClick={() => setPreview(null)}
                  className="rounded-lg border px-4 py-1.5 text-sm"
                  style={{
                    borderColor: "var(--card-border)",
                    color: "var(--text)",
                  }}
                >
                  {t("CLOSE", { defaultValue: "Cerrar" })}
                </button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
