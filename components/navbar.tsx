"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <aside
      className={`fixed md:static bg-[#0f172a] text-white h-full transition-all ${
        open ? "w-64" : "w-0 md:w-64"
      } overflow-hidden`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="font-bold text-lg">DevToolsHub</h1>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="p-4 flex flex-col gap-4">
        <Link href="/dashboard" className="hover:text-blue-400">
          Inicio
        </Link>
        <Link href="/dashboard/profile" className="hover:text-blue-400">
          Mi Perfil
        </Link>
        <Link href="/dashboard/plans" className="hover:text-blue-400">
          Suscripción
        </Link>
      </nav>

      <button className="absolute bottom-4 left-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
        Cerrar sesión
      </button>
    </aside>
  );
}
