"use client";

import { JSX, useState } from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface Event {
  id: number;
  title: string;
  date: Date;
}

interface CalendarProps {
  onSelectDate?: (date: Date) => void;
  events?: Event[];
}

export default function Calendar({ onSelectDate, events = [] }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleSelect = (day: Date) => {
    setSelectedDate(day);
    if (onSelectDate) onSelectDate(day);
  };

  const getEventsForDay = (day: Date) => {
  return events.filter((ev) => isSameDay(ev.date, day));
};

  const renderHeader = () => {
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Gerar anos (por exemplo, ±10 anos do atual)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

    return (
      <div className="flex justify-between mb-2 gap-2 items-center">
        {/* Dropdown mês e ano */}
        <div className="flex gap-1 items-center">
          <select
            value={currentMonth.getMonth()}
            onChange={(e) => {
              const newMonth = Number(e.target.value);
              setCurrentMonth(new Date(currentMonth.getFullYear(), newMonth, 1));
            }}
            className="bg-zinc-900 text-zinc-200 px-2 py-1 rounded-md text-sm  scrollbar-none
              focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-50
            "
          >
            {months.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>

          <select
            value={currentMonth.getFullYear()}
            onChange={(e) => {
              const newYear = Number(e.target.value);
              setCurrentMonth(new Date(newYear, currentMonth.getMonth(), 1));
            }}
            className="bg-zinc-900 text-zinc-200 px-2 py-1 rounded-md text-sm
              focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-opacity-50
            "
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Botões de navegação */}
        <div className="flex">
          <button
            onClick={prevMonth}
            className="px-2 rounded-md text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400"
          >
            &lt;
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-2 rounded-md text-sm text-zinc-400 hover:bg-zinc-800"
          >
            Atual
          </button>
          <button
            onClick={nextMonth}
            className="px-2 rounded-md text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400"
          >
            &gt;
          </button>
        </div>
      </div>
    );
  };


  const renderDays = () => {
    const days = [];
    const date = startOfWeek(currentMonth, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center font-semibold text-gray-700 text-xs first-letter:uppercase"
        >
          {format(addDays(date, i), "EEE", { locale: ptBR }).slice(0, 3)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

const renderCells = () => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days: JSX.Element[] = [];
  let day = startDate;
  const today = new Date();

  while (day <= endDate) {
    const cloneDay = day;
    const formattedDate = format(day, "d");
    const dayEvents = getEventsForDay(day);

    const isToday = isSameDay(day, today);

    days.push(
      <div
        key={day.toString()}
        onClick={() => handleSelect(cloneDay)}
        className={`p-2 w-full h-28 text-left border-r border-b border-zinc-800 cursor-pointer relative overflow-hidden flex flex-col
          ${!isSameMonth(day, monthStart) ? "bg-neutral-900 text-gray-400" : "bg-background text-gray-400"}
          ${
            selectedDate && isSameDay(day, selectedDate)
              ? "ring-1 ring-yellow-400 ring-inset"
              : "hover:bg-stone-900 duration-200"
          }
          ${isToday ? "bg-yellow-600 text-white font-bold" : ""}
        `}
      >
        <div className="font-bold text-sm mb-1">{formattedDate}</div>

        {/* Render eventos do dia */}
        <div className="flex-1 space-y-1 overflow-hidden">
          {dayEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className="truncate text-xs bg-zinc-600 text-white px-1 py-1 rounded-md"
            >
              {event.title}
            </div>
          ))}

          {dayEvents.length > 3 && (
            <button
              className="text-xs text-blue-600 mt-1"
              onClick={(e) => {
                e.stopPropagation();
                alert(
                  `Eventos em ${format(cloneDay, "dd/MM/yyyy")}: \n` +
                    dayEvents.map((ev) => `- ${ev.title}`).join("\n")
                );
              }}
            >
              +{dayEvents.length - 3} more
            </button>
          )}
        </div>
      </div>
    );

    day = addDays(day, 1);
  }

  return (
    <div className="grid grid-cols-5 md:grid-cols-7 border-l border-t border-zinc-800">
      {days}
    </div>
  );
};


  return (
    <div className="bg-background w-full rounded-2xl shadow-lg">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
