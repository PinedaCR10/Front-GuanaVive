// src/accessusers/userHeader.tsx
import { useState } from "react";
import { Menu } from "lucide-react";
import UserSidebar from "./userSidebar";

export default function UserHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[var(--gv-primary)]">GuanaVive</h1>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border px-3 py-1 hover:bg-gray-100"
        >
          <img
            src="https://i.pravatar.cc/100"
            alt="Usuario"
            className="w-8 h-8 rounded-full"
          />
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Pasamos las props tipadas correctamente */}
      <UserSidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
