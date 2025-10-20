"use client";

import AppointmentCard from "./AppointmentCard";

export default function AppointmentsSection() {
  const appointments = [
    {
      service: "Corte de cabelo",
      date: "Sexta, 4 de Fevereiro",
      time: "09:40",
      professional: "BarberTop",
      status: "confirmado" as const,
      barbershopLogo: "/barbertob-logo.png",
    },
    {
      service: "Manicure e Pedicure",
      date: "Segunda, 23 de Outubro",
      time: "10:00",
      professional: "Maria Souza",
      status: "pendente" as const,
      barbershopLogo: "/barbershop-placeholder.png",
    },
  ];

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold uppercase text-gray-400">
        Agendamentos
      </h2>

      {appointments.length === 0 ? (
        <div className="bg-zinc-900 rounded-xl p-4 text-gray-400 text-sm">
          <p>Você ainda não possui agendamentos.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {appointments.map((a, i) => (
            <AppointmentCard key={i} {...a} />
          ))}
        </div>
      )}
    </section>
  );
}
