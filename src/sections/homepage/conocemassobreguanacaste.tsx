import React, { useState } from 'react';
import { motion } from 'framer-motion';

const cantones = [
  {
    nombre: 'Liberia',
    poblacion: '62,000',
    fundacion: '1836',
    descripcion: 'Capital de la provincia, conocida como la “Ciudad Blanca”, puerta de entrada a playas y parques nacionales como Rincón de la Vieja. Rica en historia y cultura.',
    actividad: 'Senderismo en Rincón de la Vieja',
    imagenes: ['/images/homepage/CARD1.jpg', '/images/homepage/CARD2.jpg'],
  },
  {
    nombre: 'Nicoya',
    poblacion: '50,000',
    fundacion: '1523',
    descripcion: 'Centro cultural e histórico, famosa por su iglesia colonial, tradiciones chorotegas y playas como Sámara y Nosara. Zona Azul de longevidad.',
    actividad: 'Surf en Playa Nosara',
    imagenes: ['/images/homepage/CARD3.jpg', '/images/homepage/CARD4.jpg'],
  },
  {
    nombre: 'Santa Cruz',
    poblacion: '60,000',
    fundacion: '1834',
    descripcion: 'Capital folclórica, reconocida por sus fiestas típicas, mascaradas y playas como Tamarindo, Conchal y Avellanas.',
    actividad: 'Fiestas y mascaradas típicas',
    imagenes: ['/images/homepage/CARD5.jpg', '/images/homepage/CARD6.jpg'],
  },
  {
    nombre: 'Bagaces',
    poblacion: '20,000',
    fundacion: '1543',
    descripcion: 'Destino de aguas termales y cascadas, como Llanos de Cortés. Rica en historia y naturaleza.',
    actividad: 'Baños termales en Llanos de Cortés',
    imagenes: ['/images/homepage/CARD2.jpg', '/images/homepage/CARD3.jpg'],
  },
  {
    nombre: 'Carrillo',
    poblacion: '40,000',
    fundacion: '1877',
    descripcion: 'Hogar de Playas del Coco y Hermosa, ideal para turismo de playa, pesca deportiva y vida nocturna.',
    actividad: 'Pesca deportiva en Playas del Coco',
    imagenes: ['/images/homepage/CARD1.jpg', '/images/homepage/CARD5.jpg'],
  },
  {
    nombre: 'Cañas',
    poblacion: '27,000',
    fundacion: '1878',
    descripcion: 'Conocida por su cercanía al volcán Tenorio y el Río Celeste, así como por su agricultura y ganadería.',
    actividad: 'Visita al Río Celeste',
    imagenes: ['/images/homepage/CARD4.jpg', '/images/homepage/CARD6.jpg'],
  },
  {
    nombre: 'Abangares',
    poblacion: '18,000',
    fundacion: '1915',
    descripcion: 'Famosa por su historia minera y el Parque Minero, además de ríos y montañas.',
    actividad: 'Turismo minero en el Parque Minero',
    imagenes: ['/images/homepage/CARD2.jpg', '/images/homepage/CARD5.jpg'],
  },
  {
    nombre: 'Tilarán',
    poblacion: '20,000',
    fundacion: '1923',
    descripcion: 'Zona de montañas, lagos y viento, ideal para deportes acuáticos, eólicos y paisajes del Lago Arenal.',
    actividad: 'Deportes acuáticos en el Lago Arenal',
    imagenes: ['/images/homepage/CARD3.jpg', '/images/homepage/CARD1.jpg'],
  },
  {
    nombre: 'Nandayure',
    poblacion: '12,000',
    fundacion: '1961',
    descripcion: 'Paisajes rurales, playas tranquilas como Coyote y San Miguel, y tradiciones agrícolas.',
    actividad: 'Senderismo y ecoturismo en playas tranquilas',
    imagenes: ['/images/homepage/CARD6.jpg', '/images/homepage/CARD2.jpg'],
  },
  {
    nombre: 'La Cruz',
    poblacion: '20,000',
    fundacion: '1969',
    descripcion: 'Puerta al Refugio Bahía Junquillal y playas vírgenes del norte, frontera con Nicaragua.',
    actividad: 'Observación de aves en Bahía Junquillal',
    imagenes: ['/images/homepage/CARD5.jpg', '/images/homepage/CARD4.jpg'],
  },
  {
    nombre: 'Hojancha',
    poblacion: '8,000',
    fundacion: '1971',
    descripcion: 'Cantón agrícola y forestal, con playas como Carrillo y reservas naturales. Destaca por su desarrollo humano.',
    actividad: 'Senderismo en las reservas naturales',
    imagenes: ['/images/homepage/CARD1.jpg', '/images/homepage/CARD3.jpg'],
  },
];

const ConoceMasSobreGuanacaste: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const canton = cantones[selected];

  return (
    <section
      className="w-full relative py-16 px-4 md:px-12 text-[#181818]"
      style={{
        backgroundImage: `url(${canton.imagenes[0]})`,  // Imagen de fondo dinámica según el cantón
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-white drop-shadow-lg">
          Conoce más sobre Guanacaste
        </h2>
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <label
            className="block mb-2 text-2xl font-extrabold text-white px-6 py-2 rounded-lg bg-black/60 shadow-lg drop-shadow-lg tracking-wide border-2 border-[#ffe066]"
            style={{ letterSpacing: '0.04em' }}
          >
            Cantón
          </label>
          <select
            className="w-full bg-white/80 border border-[#1c7ab9] rounded-lg px-4 py-3 text-[#181818] text-lg focus:outline-none focus:ring-2 focus:ring-[#1c7ab9] transition"
            value={selected}
            onChange={e => setSelected(Number(e.target.value))}
          >
            {cantones.map((c, idx) => (
              <option key={c.nombre} value={idx}>
                {c.nombre}
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
              Fundación: {canton.fundacion} &nbsp;|&nbsp; Población: {canton.poblacion}
            </div>
            <p className="text-lg text-white drop-shadow max-w-xl mx-auto">
              {canton.descripcion}
            </p>

            {/* Aquí mostramos la actividad más conocida */}
            <div className="mt-4 text-lg font-semibold text-[#ffe066]">
              Actividad más conocida: <span className="italic">{canton.actividad}</span>
            </div>
          </motion.div>
        </div>

        {/* Galería de imágenes con más margen arriba */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {canton.imagenes.map((img, idx) => (
            <motion.img
              key={img}
              src={img}
              alt={`Imagen de ${canton.nombre} ${idx + 1}`}
              className="w-full h-full object-cover rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConoceMasSobreGuanacaste;
