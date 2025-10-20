"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function UserHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 border-b border-zinc-800 bg-background relative">
      <h1 className="text-lg font-semibold text-white">agendio</h1>

      {/* Botão Hamburguer (só aparece em telas pequenas) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-gray-400 hover:text-gray-300 lg:hidden" 
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu de navegação */}
      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute top-full left-0 w-full flex-col bg-zinc-900 border-t border-zinc-800 p-4 lg:static lg:flex lg:flex-row lg:items-center lg:gap-4 lg:w-auto lg:p-0`}
      >
        <a href="/user" className="py-2 text-gray-300 hover:text-white transition">
          Início
        </a>
        <a href="/user/profile" className="py-2 text-gray-300 hover:text-white transition">
          Perfil
        </a>
        <a href="/user/appointments" className="py-2 text-gray-300 hover:text-white transition">
          Meus Agendamentos
        </a>
      </nav>
    </header>
  );
}
