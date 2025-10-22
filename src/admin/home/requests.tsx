import React, { useState, useMemo } from "react";

type Request = {
  id: number;
  title: string;
  status: "pending" | "approved" | "denied";
};

const MOCK_REQUESTS: Request[] = [
  { id: 1, title: "Nuevo anuncio aprobado #1", status: "approved" },
  { id: 2, title: "Nuevo anuncio aprobado #2", status: "approved" },
  { id: 3, title: "Nuevo anuncio aprobado #3", status: "approved" },
  { id: 4, title: "Nuevo anuncio aprobado #4", status: "approved" },
  { id: 5, title: "Nuevo anuncio aprobado #5", status: "approved" },
];

const PER_PAGE = 3;

const RequestList: React.FC = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(MOCK_REQUESTS.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const data = useMemo(
    () => MOCK_REQUESTS.slice(start, start + PER_PAGE),
    [start]
  );

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <section className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      <h2 className="text-lg font-medium mb-4">Actividades recientes</h2>

      <ul className="space-y-3">
        {data.map((req) => (
          <li
            key={req.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span className="mb-2 sm:mb-0">{req.title}</span>

            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                Aprobar
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                Denegar
              </button>
            </div>
          </li>
        ))}
      </ul>

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
    </section>
  );
};

export default RequestList;
