import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type Foto = {
  id: string;
  src: string;
  alt: string;
  categoria?: string;
  canton?: string;
};

export default function Gallery() {
  const navigate = useNavigate();

  // Orden y estilo como tu ejemplo (6 imágenes)
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
    <section className="py-10 bg-gray-50">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-12">
        <h2 className="mb-6 text-center text-3xl md:text-4xl font-extrabold">Galería Cultural</h2>

        {/* Masonry simple por columnas (mantiene el orden visual de tu referencia) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {fotos.map((f) => (
            <motion.figure
              key={f.id}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -3, boxShadow: "0 18px 40px rgba(0,0,0,0.14)" }}
              className="mb-6 break-inside-avoid rounded-2xl overflow-hidden shadow-md bg-white"
            >
              <img src={f.src} alt={f.alt} className="w-full h-auto object-cover" loading="lazy" />
            </motion.figure>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -1 }}
            onClick={() => navigate("/galeria")}
            className="rounded-lg bg-[#1f6fb2] px-6 py-2.5 text-white font-semibold shadow-md hover:brightness-110"
          >
            Ver más
          </motion.button>
        </div>
      </div>
    </section>
  );
}
