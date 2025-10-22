import React, { useEffect, useState } from "react";
import { adsService } from "./service";
import type {
  IPaginatedResponse,
  PublicationRow,
  PublicationStatus,
} from "./advetisementType";

type Props = {
  search: string;
  status: PublicationStatus | "ALL";
};

const statusBadge = (s: PublicationStatus) => {
  const base = "px-2 py-1 rounded-md text-xs";
  if (s === "APPROVED") return <span className={`${base} bg-green-100 text-green-700`}>Aprobado</span>;
  if (s === "REJECTED") return <span className={`${base} bg-red-100 text-red-700`}>Rechazado</span>;
  return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pendiente</span>;
};

const PER_PAGE = 3;

const AdvertisementTable: React.FC<Props> = ({ search, status }) => {
  const [page, setPage] = useState(1);
  const [resp, setResp] = useState<IPaginatedResponse<PublicationRow> | null>(
    null
  );

  const load = async () => {
    const result = await adsService.list({ page, limit: PER_PAGE });
    let data = result.data;

    // filtros en frontend por ahora
    if (status !== "ALL") data = data.filter((d) => d.status === status);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          (d.excerpt ?? "").toLowerCase().includes(q) ||
          d.userName.toLowerCase().includes(q)
      );
    }

    // Ajustar meta cuando filtramos en front
    const total = data.length + (result.meta.limit - result.data.length);
    setResp({
      data,
      meta: {
        ...result.meta,
        total,
        totalPages: Math.max(1, Math.ceil(total / PER_PAGE)),
        hasNextPage: page < Math.max(1, Math.ceil(total / PER_PAGE)),
        hasPreviousPage: page > 1,
      },
    });
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, status]);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () =>
    setPage((p) => Math.min(resp?.meta.totalPages ?? 1, p + 1));

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 overflow-x-auto">
      <div className="text-sm text-gray-600 mb-3">
        Anuncios ({resp?.meta.total ?? 0})
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-600 border-b">
          <tr>
            <th className="text-left p-2 w-[40%]">Título</th>
            <th className="text-left p-2">Usuario</th>
            <th className="text-left p-2">Categoría</th>
            <th className="text-left p-2">Estado</th>
            <th className="text-left p-2">Creado</th>
          </tr>
        </thead>
        <tbody>
          {(resp?.data ?? []).map((row) => (
            <tr key={row.id} className="border-b align-top">
              <td className="p-2">
                <div className="font-medium">{row.title}</div>
                {row.excerpt && (
                  <div className="text-gray-500 text-xs mt-1">
                    {row.excerpt}
                  </div>
                )}
              </td>
              <td className="p-2">{row.userName}</td>
              <td className="p-2 capitalize">{row.category}</td>
              <td className="p-2">{statusBadge(row.status)}</td>
              <td className="p-2">{row.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación < > */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={prev}
          disabled={!resp?.meta.hasPreviousPage}
          aria-label="Página anterior"
          className="h-9 w-9 grid place-items-center border rounded disabled:opacity-40 hover:bg-gray-100"
          title="Anterior"
        >
          {"<"}
        </button>
        <span className="text-sm text-gray-600">
          {resp?.meta.page ?? 1} / {resp?.meta.totalPages ?? 1}
        </span>
        <button
          onClick={next}
          disabled={!resp?.meta.hasNextPage}
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

export default AdvertisementTable;
