"use client";
import { FaBeerMugEmpty } from "react-icons/fa6";
import { IoIosPerson } from "react-icons/io";

// interface HeaderProps {
// }

export default function Header() {
  return (
    <header className="w-full bg-background px-44 flex items-center justify-between rounded-xl my-2">
      {/* Logo lado esquerdo */}
      <div className="flex items-center gap-2">
        <FaBeerMugEmpty size={32} />
        <span className="text-white text-lg font-bold">Agendio</span>
      </div>

      {/* Foto perfil lado direito */}
      <div className="flex items-center gap-3">
        <IoIosPerson size={32} color="#fff"/>
      </div>
    </header>
  )
} 
