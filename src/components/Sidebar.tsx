// src/components/Sidebar.tsx
"use client";
import { useState } from "react";
interface SidebarProps {
  onChangeSection?: (section: string) => void;
}

export default function Sidebar({ onChangeSection }: SidebarProps) {
  const [active, setActive] = useState("agenda");

  const handleClick = (section: string) => {
    setActive(section);
    if (onChangeSection) onChangeSection(section);
  };

  return (
    <aside className="w-auto min-h-screen text-zinc-500 p-4 rounded-xl shadow-md">
      <nav className="flex flex-col space-y-2">
        <button
          onClick={() => handleClick("agenda")}
          className={`flex items-center gap-2 rounded-lg text-sm 
            ${active === "agenda" ? "text-zinc-200" : "hover:text-zinc-400"}
          `}
        >
          Agenda
        </button>

        <button
          onClick={() => handleClick("empresa")}
          className={`flex items-center gap-2 rounded-lg text-sm
            ${active === "empresa" ? "text-zinc-200" : "hover:text-zinc-400"}
          `}
        >
          Em construção
        </button>
      </nav>
    </aside>
  );
}
