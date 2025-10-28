import React, { useState } from "react";
import type { Subscription } from "./SubscriptionType";


const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan1@gmail.com",
    plan: "Premium",
    status: "Activo",
    createdAt: "03-08-2025",
    lastAccess: "09-08-2025",
  },
  {
    id: "2",
    name: "María Gómez",
    email: "maria2@gmail.com",
    plan: "Básico",
    status: "Activo",
    createdAt: "02-08-2025",
    lastAccess: "09-08-2025",
  },
  {
    id: "3",
    name: "Carlos Soto",
    email: "carlos3@gmail.com",
    plan: "Plus",
    status: "Inactivo",
    createdAt: "03-08-2025",
    lastAccess: "05-08-2025",
  },
  {
    id: "4",
    name: "Ana Torres",
    email: "ana4@gmail.com",
    plan: "Premium",
    status: "Activo",
    createdAt: "01-08-2025",
    lastAccess: "09-08-2025",
  },
  {
    id: "5",
    name: "Luis Castro",
    email: "luis5@gmail.com",
    plan: "Básico",
    status: "Activo",
    createdAt: "28-07-2025",
    lastAccess: "06-08-2025",
  },
];

interface TableProps {
  search: string;
}

const SubscriptionTable: React.FC<TableProps> = ({ search }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const filtered = mockSubscriptions.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">Nombre</th>
            <th className="p-2">Correo</th>
            <th className="p-2">Plan</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Creado</th>
            <th className="p-2">Último acceso</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((sub) => (
            <tr key={sub.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{sub.name}</td>
              <td className="p-2 text-blue-600 hover:underline cursor-pointer">
                {sub.email}
              </td>
              <td className="p-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    sub.plan === "Premium"
                      ? "bg-gray-200"
                      : sub.plan === "Básico"
                      ? "bg-gray-300"
                      : "bg-indigo-200"
                  }`}
                >
                  {sub.plan}
                </span>
              </td>
              <td className="p-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    sub.status === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {sub.status}
                </span>
              </td>
              <td className="p-2">{sub.createdAt}</td>
              <td className="p-2">{sub.lastAccess}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className={`border rounded-md px-3 py-1 ${
            page === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 transition"
          }`}
        >
          &lt;
        </button>
        <span className="text-sm">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={`border rounded-md px-3 py-1 ${
            page === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 transition"
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SubscriptionTable;
