// src/sections/homepage/gallery.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type Foto = {
  id: string;
  src: string;
  alt: string;     // texto por defecto si falta la traducción
  categoria?: string;
  canton?: string;
};

export default function Gallery() {
  const navigate = useNavigate();
  const { t } = useTranslation("galeria");

  // 6 imágenes (orden fijo)
  const fotos: Foto[] = useMemo(
    () => [
      { id: "f1", src: "https://picsum.photos/seed/gv-a/1600/1100", alt: "Artesanos" },
      { id: "f2", src: "https://picsum.photos/seed/gv-b/1500/1000", alt: "Baile en parque" },
      { id: "f3", src: "https://picsum.photos/seed/gv-c/1500/900",  alt: "Fiestas nocturnas" },
      { id: "f4", src: "https://picsum.photos/seed/gv-d/1600/900",  alt: "Paisaje verde" },
      { id: "f5", src: "https://picsum.photos/seed/gv-e/1600/1000", alt: "Plaza llena" },
      { id: "f6", src: "https://picsum.photos/seed/gv-f/1500/950",  alt: "Bandera Guanacaste" },
    ],
    []
  );

  return (
    <section
      className="py-10"
      style={{ background: "var(--bg)" }}   // ← modo oscuro/claro
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-12">
        <h2
          className="mb-6 text-center text-3xl md:text-4xl font-extrabold"
          style={{ color: "var(--text)" }}
        >
          {t("TITLE", { defaultValue: "Galería Cultural" })}
        </h2>

        {/* Masonry simple */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {fotos.map((f) => (
            <motion.figure
              key={f.id}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -3, boxShadow: "0 18px 40px rgba(0,0,0,0.14)" }}
              className="mb-6 break-inside-avoid rounded-2xl overflow-hidden shadow-md"
              style={{
                background: "var(--card)",
                border: "1px solid var(--card-border)"
              }}
            >
              <img
                src={f.src}
                alt={t(`items.${f.id}.alt`, { defaultValue: f.alt })}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </motion.figure>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -1 }}
            onClick={() => navigate("/galeria")}
            className="rounded-lg px-6 py-2.5 font-semibold shadow-md hover:brightness-110"
            style={{ background: "#1f6fb2", color: "#fff" }}
          >
            {t("SEE_MORE", { defaultValue: "Ver más" })}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
