import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { FaWhatsapp } from "react-icons/fa";
import { User2 } from "lucide-react";
import { GoKebabHorizontal } from "react-icons/go";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";


interface Appointment {
  id: number;
  client: string;
  time: string; // início
  endTime?: string; // fim
  price: number;
  service: string;
  phone: string;
  status?: "concluído" | "cancelado" | "pendente";
  userPhoto?: string;
  professional: string; // novo campo
}


interface AppointmentListProps {
  date: Date | null;
}

const mockAppointments: Record<string, Appointment[]> = {
  "2025-09-02": [
    {
      id: 1,
      client: "João Silva",
      time: "09:00",
      endTime: "10:00",
      price: 100,
      service: "Corte de cabelo + barba",
      phone: "(85) 9123456789",
      status: "pendente",
      professional: "Maria Silva",
    },
    {
      id: 2,
      client: "Maria Souza",
      time: "11:30",
      endTime: "12:30",
      price: 80,
      service: "Coloração",
      phone: "987654321",
      status: "concluído",
      professional: "Carlos Pereira",
    },
    {
      id: 3,
      client: "João Silva",
      time: "09:00",
      endTime: "10:00",
      price: 100,
      service: "Corte de cabelo + barba",
      phone: "(85) 9123456789",
      status: "pendente",
      professional: "Maria Silva",
    },
    {
      id: 4,
      client: "Maria Souza",
      time: "11:30",
      endTime: "12:30",
      price: 80,
      service: "Coloração",
      phone: "987654321",
      status: "concluído",
      professional: "Carlos Pereira",
    },
    {
      id: 55,
      client: "João Silva",
      time: "09:00",
      endTime: "10:00",
      price: 100,
      service: "Corte de cabelo + barba",
      phone: "(85) 9123456789",
      status: "pendente",
      professional: "Maria Silva",
    }
  ],
  "2025-09-05": [
    {
      id: 3,
      client: "Carlos Pereira",
      time: "14:00",
      endTime: "15:00",
      price: 120,
      service: "Barba",
      phone: "456123789",
      status: "cancelado",
      professional: "Ana Costa",
    },
  ],
};

export default function AppointmentList({ date }: AppointmentListProps) {

  const [selectedProfessional, setSelectedProfessional] = useState<string>("");

  const dateKey = date ? format(date, "yyyy-MM-dd") : "";
  const appointments = date ? mockAppointments[dateKey] || [] : [];
  const professionals = Array.from(
    new Set(appointments.map((a) => a.professional))
  );

  useEffect(() => {
    if (
      professionals.length > 0 &&
      !professionals.includes(selectedProfessional)
    ) {
      setSelectedProfessional(professionals[0]);
    }
  }, [dateKey, professionals, selectedProfessional]);

  if (!date) {
    return (
      <p className="text-gray-500 text-sm">
        Selecione uma data no calendário.
      </p>
    );
  }

  const filteredAppointments = appointments.filter(
    (a) => a.professional === selectedProfessional
  );


  return (
    <div className="lg:rounded-xl shadow">
      <h2 className="text-lg text-zinc-400 font-semibold">
        {format(date, "dd 'de' MMMM yyyy", { locale: ptBR })}
      </h2>
    {/* Menu de profissionais */}
    <div className="flex items-center gap-1 mb-1">
      {/* Lista de profissionais */}
      <div className="flex gap-1">
        {professionals.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedProfessional(p)}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedProfessional === p
                ? "bg-foreground text-zinc-800 font-medium"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Botão adicionar profissional */}
      <button className="flex items-center bg-background hover:bg-zinc-800 text-white px-1 py-1 rounded-md">
        <IoIosAdd className="w-4 h-4" />
      </button>
    </div>
      
      {appointments.length > 0 ? (
        <ul className="space-y-2">
          {filteredAppointments.map((a) => (
            <li
              key={a.id}
              className="border bg-zinc-950 rounded-md border-zinc-800 flex"
            >
              <div className="flex flex-col items-center justify-center border-r border-zinc-800 px-4 text-center">
                {/* Hora inicial */}
                <span className="text-foreground text-sm">{a.time}</span>

                {/* Linha com bolinhas nas pontas */}
                {a.endTime && (
                  <div className="flex flex-col items-center">
                    {/* bolinha superior */}
                    <span className="w-1 h-1 rounded-full bg-zinc-400"></span>

                    {/* linha */}
                    <span className="block w-px h-6 bg-zinc-600"></span>

                    {/* bolinha inferior */}
                    <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                  </div>
                )}

                {/* Hora final */}
                {a.endTime && (
                  <span className="text-foreground text-sm">{a.endTime}</span>
                )}
              </div>


              <div className="flex flex-col flex-1 ml-3">
                
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center pt-3">

                  <span className="font-semibold text-base text-foreground">
                    {a.service}
                  </span>
                  <button className="flex hover:bg-zinc-800 hover:rounded-md justify-end px-1 py-1 mr-2 mb-3">
                    <GoKebabHorizontal className="text-zinc-400"/>
                  </button>
                  </div>
                  <div className="flex justify-between items-center">

                  {/* Nome + foto ou ícone */}
                  <span className="flex items-center gap-2 text-sm font-semibold text-zinc-500">
                    {a.userPhoto ? (
                      <Image
                        src={a.userPhoto}
                        alt={a.client}
                        width={20}
                        height={20}
                        className="w-6 h-6 rounded-full bg-white object-cover"
                      />
                    ) : (
                      <User2 className="w-10 h-10 text-zinc-500 bg-zinc-800 rounded-full" />
                    )}
                    {a.client}
                  {/* Telefone + link do WhatsApp */}
                  </span>
                  <a
                    href={`https://wa.me/${a.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex text-sm items-center gap-1 pr-3 text-gray-500 hover:underline hover:text-gray-400"
                  >
                    {a.phone}
                    <FaWhatsapp className="w-5 h-5 text-foreground" />
                  </a>
                  </div>


                </div>

                <div className="pr-3 pb-3 flex justify-between items-center gap-2">
                  {a.status && (
                    <span
                      className={`text-xs font-medium inline-flex items-center gap-1`}
                    >
                    {/* bolinha colorida */}
                    <span
                      className={`w-2 h-2 rounded-full ${
                        a.status === "concluído"
                          ? "bg-green-500"
                          : a.status === "cancelado"
                          ? "bg-red-400"
                          : "bg-yellow-400"
                      }`}
                    ></span>
                    <span
                      className={`text-xs items-center font-medium justify-self-end ${
                        a.status === "concluído"
                          ? "text-green-500"
                          : a.status === "cancelado"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </span>
                    </span>
                  )}
                  <span className="text-foreground text-xs font-medium rounded-xl border px-2 pb-1 border-blue-900 bg-blue-900">
                      R$ {a.price},00
                    </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">Nenhum agendamento.</p>
      )}
    </div>
  );
}
