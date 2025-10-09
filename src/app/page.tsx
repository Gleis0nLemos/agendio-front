"use client";
import { useState } from "react";
import Calendar from "@/components/Calendar";
import AppointmentList, { events } from "@/components/AppointmentList";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentSection, setCurrentSection] = useState("agenda");

  return (
    <main>
      <div className="border-y border-zinc-800 mb-12">
        <Header
        />
      </div>
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-7xl">
          
          <div className="flex items-start gap-2">
            <div className="flex-none">
              <Sidebar onChangeSection={setCurrentSection} />
            </div>

            {/* Área principal (título + conteúdo) */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
              </div>

              {currentSection === "agenda" && (
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-none w-full md:w-[780px]">
                    <Calendar onSelectDate={setSelectedDate} events={events} />
                  </div>

                  <div className="flex-none w-full md:w-[360px]">
                    <AppointmentList date={selectedDate} />
                  </div>
                </div>
              )}

              {currentSection === "empresa" && (
                <div className="p-4 bg-neutral-900 rounded-xl text-center">
                  <h2 className="text-xl font-semibold mb-4">Dados da Empresa</h2>
                  <p className="text-gray-400">
                    Aqui ficará a futura seção de dados da empresa…
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
