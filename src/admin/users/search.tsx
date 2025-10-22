import React, { useState } from "react";

const cantones = [
  "Todos",
  "Bagaces",
  "Carrillo",
  "Cañas",
  "Hojancha",
  "La Cruz",
  "Liberia",
  "Nandayure",
  "Nicoya",
  "Santa Cruz",
  "Tilarán",
];

const ordenes = ["Nombre A–Z", "Nombre Z–A", "Más recientes", "Más antiguos"];

const Search: React.FC = () => {
  const [search, setSearch] = useState("");
  const [canton, setCanton] = useState("Todos");
  const [orden, setOrden] = useState("Nombre A–Z");

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar usuarios..."
        className="flex-1 border rounded-md p-2"
      />

      <div className="flex gap-3">
        <select
          value={canton}
          onChange={(e) => setCanton(e.target.value)}
          className="border rounded-md p-2"
        >
          {cantones.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="border rounded-md p-2"
        >
          {ordenes.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Search;
