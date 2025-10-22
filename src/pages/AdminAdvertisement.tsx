import React, { useState } from "react";
import AdvertisementTable from "../admin/advertisement/AdvertisementTable";
import Search from "../admin/advertisement/search";
import type { PublicationStatus } from "../admin/advertisement/advetisementType";
    

const AdminAdvertisement: React.FC = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PublicationStatus | "ALL">("ALL");

  return (
    <section className="space-y-8 p-6 sm:p-8">
      {/* Título y subtítulo (mismo estilo que Users) */}
      <div>
        <h1 className="text-2xl font-semibold">Gestión de anuncios</h1>
        <p className="text-gray-500">Revisar y gestionar anuncios de usuarios</p>
      </div>

      {/* Filtros */}
      <Search
        search={search}
        onSearch={setSearch}
        status={status}
        onStatus={setStatus}
      />

      {/* Tabla */}
      <AdvertisementTable search={search} status={status} />
    </section>
  );
};

export default AdminAdvertisement;
