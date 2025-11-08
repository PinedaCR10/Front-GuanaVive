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
    <div className="card p-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b-2 border-[var(--gv-border)]">
          <tr>
            <th className="text-left p-3 font-semibold text-[var(--gv-text)]">Nombre</th>
            <th className="text-left p-3 font-semibold text-[var(--gv-text)]">Correo</th>
            <th className="text-left p-3 font-semibold text-[var(--gv-text)]">Tipo</th>
            <th className="text-left p-3 font-semibold text-[var(--gv-text)]">Estado</th>
            <th className="text-left p-3 font-semibold text-[var(--gv-text)]">Creado</th>
            <th className="text-left p-3 font-semibold text-[var(--gv-text)]">Último acceso</th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((u) => (
            <tr key={u.id} className="border-b border-[var(--gv-border)] hover:bg-[var(--gv-primary-100)] transition-colors">
              <td className="p-3 text-[var(--gv-text)] font-medium">{`${u.firstName} ${u.lastName}`}</td>
              <td className="p-3 text-[var(--gv-primary)] cursor-pointer hover:underline">
                {u.email}
              </td>
              <td className="p-3">
                <span className="bg-[var(--gv-primary-100)] text-[var(--gv-primary)] px-3 py-1 rounded-full text-xs font-semibold">
                  {u.role}
                </span>
              </td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {u.isActive ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="p-3 text-[var(--gv-muted)]">{u.createdAt}</td>
              <td className="p-3 text-[var(--gv-muted)]">{u.lastAccess}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          disabled={page === 1}
          aria-label="Página anterior"
          className="px-4 py-2 border border-[var(--gv-border)] rounded-lg disabled:opacity-40 hover:bg-[var(--gv-primary)] hover:text-white hover:border-[var(--gv-primary)] transition-colors font-medium text-[var(--gv-text)]"
          title="Anterior"
        >
          Anterior
        </button>
        <span className="text-sm font-medium text-[var(--gv-text)]">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={next}
          disabled={page === totalPages}
          aria-label="Página siguiente"
          className="px-4 py-2 border border-[var(--gv-border)] rounded-lg disabled:opacity-40 hover:bg-[var(--gv-primary)] hover:text-white hover:border-[var(--gv-primary)] transition-colors font-medium text-[var(--gv-text)]"
          title="Siguiente"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default UserTable;
