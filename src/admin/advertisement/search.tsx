import React from "react";
import type { PublicationStatus } from "./advetisementType";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  status: PublicationStatus | "ALL";
  onStatus: (v: PublicationStatus | "ALL") => void;
};

const Search: React.FC<Props> = ({ search, onSearch, status, onStatus }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
      <input
        type="text"
        placeholder="Buscar anuncios"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 border rounded-md p-2"
      />

      <div className="flex gap-3">
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value as any)}
          className="border rounded-md p-2"
        >
          <option value="ALL">Todos los estados</option>
          <option value="APPROVED">Aprobado</option>
          <option value="REJECTED">Rechazado</option>
          <option value="PENDING">Pendiente</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
