"use client";

import Image from "next/image";
import sloganImg from "@/assets/barber.png";

export default function SloganSection() {
  return (
    <section className="bg-[#2D1B69] text-white rounded-2xl flex items-center justify-between overflow-hidden">
      {/* Texto: flex-1 + min-w-0 importante */}
      <div className="flex-1 min-w-0 pl-6 py-4">
        <h2 className="text-xl font-semibold leading-none">
          <span className="block">Agende</span>

          {/* evita quebra entre "nas melhores" */}
          <span className="block whitespace-nowrap">nas melhores</span>

          <span className="block">Barbearias</span>
        </h2>

        <span className="block font-normal text-gray-300 text-xs mt-2">
          com agendio
        </span>
      </div>

      {/* Imagem à direita */}
      <div className="flex-shrink-0 w-60 md:w-64 lg:w-72 self-end">
        <Image
          src={sloganImg}
          alt="Barbeiro cortando cabelo"
          className="object-contain w-full h-auto translate-x-[10%]"
          priority
        />
      </div>
    </section>
  );
}
