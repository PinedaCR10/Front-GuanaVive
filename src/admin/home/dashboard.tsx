import React from "react";
import RequestList from "./requests";


const Dashboard: React.FC = () => {
  const stats = [
    { title: "Total de usuarios", value: 3 },
    { title: "Total de anuncios", value: 3 },
    { title: "Categorías", value: 3 },
    { title: "Ingresos", value: "$1000" },
  ];

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Panel principal</h1>
        <p className="text-gray-500">
          ¡Bienvenido de nuevo! Esto es lo que está pasando en tu plataforma
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-4 rounded-xl shadow-sm border text-center"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Solicitudes / Actividades */}
      <RequestList />
    </section>
  );
};

export default Dashboard;
