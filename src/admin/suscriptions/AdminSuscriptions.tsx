import React, { useState } from "react";
import Search from "./search";
import SubscriptionTable from "./SuscriptionTable";


const AdminSubscriptions: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <section className="space-y-8 p-6 sm:p-8">
      <div>
        <h1 className="text-2xl font-semibold">Gestión de suscripciones</h1>
        <p className="text-gray-500">
          Administra las suscripciones activas de los usuarios y sus planes.
        </p>
      </div>

      <Search search={search} onSearch={setSearch} />

      <SubscriptionTable search={search} />
    </section>
  );
};

export default AdminSubscriptions;
