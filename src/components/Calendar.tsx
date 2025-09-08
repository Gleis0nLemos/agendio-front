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
    return events.filter((e) => isSameDay(e.date, day));
  };

  const renderHeader = () => (
    <div className="flex justify-between mb-2 gap-2">
      <h2 className="text-xs text-gray-400 font-bold capitalize">
        {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
      </h2>
      <div className="flex">
        <button
          onClick={prevMonth}
          className="text-foreground px-1 rounded-md text-zinc-500 hover:bg-zinc-700 hover:text-zinc-400"
        >
          &lt;
        </button>
        <button
          onClick={() => setCurrentMonth(new Date())}
          className="px-1 rounded-md text-sm text-zinc-400 hover:bg-zinc-700"
        >
            Atual
        </button>
        <button
          onClick={nextMonth}
          className="text-foreground px-1 rounded-md text-zinc-500 hover:bg-zinc-700 hover:text-zinc-400"
        >
          &gt;
      </button>
      </div>
    </div>
  );

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
        className={`p-2 w-full h-28 text-left border-r border-b border-gray-700 cursor-pointer relative overflow-hidden flex flex-col
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
              className="truncate text-xs bg-blue-600 text-white px-2 py-1 rounded-md"
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
    <div className="grid grid-cols-5 md:grid-cols-7 border-l border-t border-gray-700">
      {days}
    </div>
  );
};


  return (
    <div className="bg-background rounded-2xl shadow-lg">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
