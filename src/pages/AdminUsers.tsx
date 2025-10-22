import React from "react";
import Search from "../admin/users/search";
import UserTable from "../admin/users/userTable";
import AddUsers from "../admin/users/addUsers";


const UsersPage: React.FC = () => {
  return (
    <section className="p-6 sm:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Gestión de usuarios</h1>
          <p className="text-gray-500">
            Administra cuentas de usuarios y permisos
          </p>
        </div>
        <AddUsers />
      </div>

      <Search />
      <UserTable />
    </section>
  );
};

export default UsersPage;
