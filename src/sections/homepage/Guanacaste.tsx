// src/sections/homepage/guanacaste.tsx
import { motion } from "framer-motion";

export default function Guanacaste() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: "#1f6fb2", textShadow: "0 2px 0 rgba(0,0,0,0.12)" }}
          >
            Esto es Guanacaste
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-800">
            Guanacaste es la provincia del sol, la cultura y la naturaleza exuberante de Costa
            Rica. Con una población de <span className="font-bold">354,154 (2022)</span>, es famosa por sus{" "}
            <span className="font-bold">Más de 70 playas reconocidas</span> de arena dorada y aguas cristalinas.
          </p>

          <div className="mt-4 space-y-2 text-gray-800 text-lg leading-8">
            <p>
              <span className="font-bold">¿Qué se puede hacer?</span>{" "}
              Surf, avistamiento de tortugas, cabalgatas, senderismo, fiestas típicas, gastronomía,
              tours de hacienda, deportes acuáticos y más.
            </p>
            <p>
              <span className="font-bold">Fauna:</span>{" "}
              Monos, iguanas, venados, tortugas marinas, aves exóticas, cocodrilos, jaguares.
            </p>
            <p>
              <span className="font-bold">Flora:</span>{" "}
              Guanacaste (árbol nacional), ceibas, pochotes, manglares, bosques secos y tropicales.
            </p>
          </div>

          <p className="mt-6 text-lg leading-8 text-gray-700">
            Un destino donde la tradición y la biodiversidad se encuentran bajo el sol del Pacífico.
          </p>
        </motion.div>

        {/* Tarjeta con mapa */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="rounded-3xl bg-white shadow-xl ring-1 ring-black/5"
        >
          <div className="p-4 sm:p-6">
            <div className="rounded-2xl bg-gray-50/40 p-3 sm:p-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/61/Mapa_de_Guanacaste.JPG"
                alt="Mapa de Costa Rica con Guanacaste destacada"
                className="mx-auto h-[360px] w-full max-w-[760px] object-contain"
              />
            </div>

            {/* Línea decorativa inferior */}
            <div className="mt-6 border-b-2 border-gray-200" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
