import React from "react";

interface SearchProps {
  search: string;
  onSearch: (v: string) => void;
}

const Search: React.FC<SearchProps> = ({ search, onSearch }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 border rounded-md p-2"
      />

      {/* Filtros */}
      <div className="flex gap-3">
        <select className="border rounded-md p-2 text-sm">
          <option value="">Todos los planes</option>
          <option value="basic">Básico</option>
          <option value="premium">Premium</option>
          <option value="plus">Plus</option>
        </select>

        <select className="border rounded-md p-2 text-sm">
          <option value="az">Nombre A–Z</option>
          <option value="za">Nombre Z–A</option>
          <option value="recent">Más recientes</option>
          <option value="oldest">Más antiguos</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
