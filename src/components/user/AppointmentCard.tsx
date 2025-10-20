"use client";

import Image from "next/image";
import { useState } from "react";
import { User } from "lucide-react";

interface AppointmentCardProps {
  service: string;
  date: string; // Ex: "Sexta, 20 de Outubro"
  time: string; // Ex: "14:30"
  professional: string;
  status: "confirmado" | "pendente" | "cancelado";
  barbershopLogo?: string | null; // pode vir null do backend
}

export default function AppointmentCard({
  service,
  date,
  time,
  professional,
  status,
  barbershopLogo,
}: AppointmentCardProps) {
  // controla se houve falha no carregamento da imagem
  const [imageError, setImageError] = useState(false);

  const statusStyles =
    status === "confirmado"
      ? "text-violet-400 bg-violet-900/30"
      : status === "pendente"
      ? "text-yellow-400 bg-yellow-900/30"
      : "text-red-300 bg-red-900/30";

  // formatações de data
  const day = date.split(",")[1]?.trim().split(" ")[0] || "??";
  const month = date.split("de ")[1] || "";

  return (
    <div className="flex items-center justify-between bg-zinc-800/60 rounded-xl py-3 px-4 hover:border-zinc-700 transition border border-transparent">
      {/* Coluna da esquerda (informações do serviço) */}
      <div className="flex flex-col justify-center flex-1 space-y-1">
        {/* Status */}
        <span
          className={`self-start text-[10px] font-medium px-2 py-0.5 rounded-lg ${statusStyles}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>

        {/* Serviço */}
        <h3 className="pt-2 text-gray-200 font-medium text-sm">{service}</h3>

        {/* Barbearia / Profissional */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="relative w-5 h-5 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center">
            {barbershopLogo && !imageError ? (
              <Image
                src={barbershopLogo}
                alt="Logo da barbearia"
                fill
                className="object-cover"
                unoptimized
                onLoadingComplete={(img) => {
                  // se a imagem falhar no carregamento, dispara fallback
                  if (img.naturalWidth === 0) setImageError(true);
                }}
                onError={() => setImageError(true)}
              />
            ) : (
              <User size={14} className="text-gray-400" />
            )}
          </div>
          <span className="text-gray-300 text-sm">{professional}</span>
        </div>
      </div>

      <div className="h-12 w-px bg-zinc-700/60 mx-4" />
{/* Coluna da data */}
      <div className="flex flex-col items-center justify-center w-16 text-gray-300">
        <span className="text-2xl font-medium leading-none">{day}</span>
        <span className="text-xs text-gray-500 capitalize">{month}</span>
        <span className="text-xs text-gray-400 mt-1">{time}</span>
      </div>

      {/* Linha divisória */}
    </div>
  );
}
