import React, { useMemo, useState } from "react";

type Row = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "Premium" | "Básico";
  isActive: boolean;
  createdAt: string;
  lastAccess: string;
};

const ROWS: Row[] = [
  { id: "1", firstName: "Juan",  lastName: "Pérez", email: "juan1@gmail.com",  role: "Premium", isActive: true,  createdAt: "03-08-2025", lastAccess: "09-08-2025" },
  { id: "2", firstName: "María", lastName: "Gómez", email: "maria2@gmail.com", role: "Básico",  isActive: true,  createdAt: "02-08-2025", lastAccess: "09-08-2025" },
  { id: "3", firstName: "Carlos",lastName: "Soto",  email: "carlos3@gmail.com",role: "Premium", isActive: false, createdAt: "03-08-2025", lastAccess: "05-08-2025" },
  { id: "4", firstName: "Ana",   lastName: "Rojas", email: "ana4@gmail.com",   role: "Básico",  isActive: true,  createdAt: "01-08-2025", lastAccess: "08-08-2025" },
  { id: "5", firstName: "Diego", lastName: "Mora",  email: "diego5@gmail.com", role: "Premium", isActive: true,  createdAt: "04-08-2025", lastAccess: "09-08-2025" },
];

const PER_PAGE = 3;

const UserTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(ROWS.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const pageRows = useMemo(() => ROWS.slice(start, start + PER_PAGE), [start]);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-gray-600 border-b">
          <tr>
            <th className="text-left p-2">Nombre</th>
            <th className="text-left p-2">Correo</th>
            <th className="text-left p-2">Tipo</th>
            <th className="text-left p-2">Estado</th>
            <th className="text-left p-2">Creado</th>
            <th className="text-left p-2">Último acceso</th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{`${u.firstName} ${u.lastName}`}</td>
              <td className="p-2 text-blue-600 underline cursor-pointer">
                {u.email}
              </td>
              <td className="p-2">
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xs">
                  {u.role}
                </span>
              </td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-md text-xs ${
                    u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {u.isActive ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="p-2">{u.createdAt}</td>
              <td className="p-2">{u.lastAccess}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación < > */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={prev}
          disabled={page === 1}
          aria-label="Página anterior"
          className="h-9 w-9 grid place-items-center border rounded disabled:opacity-40 hover:bg-gray-100"
          title="Anterior"
        >
          {"<"}
        </button>
        <span className="text-sm text-gray-600">
          {page} / {totalPages}
        </span>
        <button
          onClick={next}
          disabled={page === totalPages}
          aria-label="Página siguiente"
          className="h-9 w-9 grid place-items-center border rounded disabled:opacity-40 hover:bg-gray-100"
          title="Siguiente"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default UserTable;
