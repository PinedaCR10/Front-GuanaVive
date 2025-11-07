import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CANTONES_KEYS = [
  'Liberia', 'Nicoya', 'Santa Cruz', 'Bagaces', 'Carrillo',
  'Cañas', 'Abangares', 'Tilarán', 'Nandayure', 'La Cruz', 'Hojancha'
];

const IMAGENES_BY_CANTON: Record<string, string[]> = {
  'Liberia': ['/images/homepage/CARD1.jpg', '/images/homepage/CARD2.jpg'],
  'Nicoya': ['/images/homepage/CARD3.jpg', '/images/homepage/CARD4.jpg'],
  'Santa Cruz': ['/images/homepage/CARD5.jpg', '/images/homepage/CARD6.jpg'],
  'Bagaces': ['/images/homepage/CARD2.jpg', '/images/homepage/CARD3.jpg'],
  'Carrillo': ['/images/homepage/CARD1.jpg', '/images/homepage/CARD5.jpg'],
  'Cañas': ['/images/homepage/CARD4.jpg', '/images/homepage/CARD6.jpg'],
  'Abangares': ['/images/homepage/CARD2.jpg', '/images/homepage/CARD5.jpg'],
  'Tilarán': ['/images/homepage/CARD3.jpg', '/images/homepage/CARD1.jpg'],
  'Nandayure': ['/images/homepage/CARD6.jpg', '/images/homepage/CARD2.jpg'],
  'La Cruz': ['/images/homepage/CARD5.jpg', '/images/homepage/CARD4.jpg'],
  'Hojancha': ['/images/homepage/CARD1.jpg', '/images/homepage/CARD3.jpg'],
};

const ConoceMasSobreGuanacaste: React.FC = () => {
  const { t } = useTranslation("conocemas");
  const [selected, setSelected] = useState(0);
  
  const cantonKey = CANTONES_KEYS[selected];
  const canton = useMemo(() => ({
    nombre: t(`cantones.${cantonKey}.nombre`, { defaultValue: cantonKey }),
    poblacion: t(`cantones.${cantonKey}.poblacion`, { defaultValue: "" }),
    fundacion: t(`cantones.${cantonKey}.fundacion`, { defaultValue: "" }),
    descripcion: t(`cantones.${cantonKey}.descripcion`, { defaultValue: "" }),
    actividad: t(`cantones.${cantonKey}.actividad`, { defaultValue: "" }),
    imagenes: IMAGENES_BY_CANTON[cantonKey] || IMAGENES_BY_CANTON['Liberia'],
  }), [selected, t, cantonKey]);

  return (
    <section
      className="w-full relative h-screen px-4 md:px-12 text-[#181818] flex items-center justify-center"
      style={{
        backgroundImage: `url(${canton.imagenes[0]})`,  // Imagen de fondo dinámica según el cantón
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-white drop-shadow-lg text-center">
          {t("TITLE", { defaultValue: "Conoce más sobre Guanacaste" })}
        </h2>
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <label
            className="block mb-2 text-2xl font-extrabold text-white px-6 py-2 rounded-lg bg-black/60 shadow-lg drop-shadow-lg tracking-wide border-2 border-[#ffe066]"
            style={{ letterSpacing: '0.04em' }}
          >
            {t("CANTON_LABEL", { defaultValue: "Cantón" })}
          </label>
          <select
            className="w-full bg-white/80 border border-[#1c7ab9] rounded-lg px-4 py-3 text-[#181818] text-lg focus:outline-none focus:ring-2 focus:ring-[#1c7ab9] transition"
            value={selected}
            onChange={e => setSelected(Number(e.target.value))}
          >
            {CANTONES_KEYS.map((c, idx) => (
              <option key={c} value={idx}>
                {t(`cantones.${c}.nombre`, { defaultValue: c })}
              </option>
            ))}
          </select>

          <motion.div
            className="w-full min-h-[220px] rounded-2xl bg-black/40 p-8 flex flex-col items-center justify-center text-center"
            key={canton.nombre}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ minHeight: 240 }}
          >
            <h3 className="text-3xl font-extrabold mb-2 text-white drop-shadow-lg">
              {canton.nombre}
            </h3>
            <div className="mb-2 text-base text-[#ffe066] font-semibold drop-shadow">
              {t("FOUNDATION", { defaultValue: "Fundación" })}: {canton.fundacion} &nbsp;|&nbsp; {t("POPULATION", { defaultValue: "Población" })}: {canton.poblacion}
            </div>
            <p className="text-lg text-white drop-shadow max-w-xl mx-auto">
              {canton.descripcion}
            </p>

            {/* Aquí mostramos la actividad más conocida */}
            <div className="mt-4 text-lg font-semibold text-[#ffe066]">
              {t("MOST_KNOWN_ACTIVITY", { defaultValue: "Actividad más conocida:" })} <span className="italic">{canton.actividad}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConoceMasSobreGuanacaste;
