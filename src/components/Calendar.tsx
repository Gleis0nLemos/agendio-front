"use client";

import { JSX, useState } from "react";
import { addMonths, subMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">←</button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
        </h2>
        <button onClick={nextMonth} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">→</button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const date = startOfWeek(currentMonth, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-gray-600">
          {format(addDays(date, i), "EEEEEE", { locale: ptBR })}
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

    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, "d");

        days.push(
          <div
            key={day.toString()}
            onClick={() => setSelectedDate(cloneDay)}
            className={`p-2 text-center cursor-pointer rounded 
              ${!isSameMonth(day, monthStart) ? "text-gray-400" : ""}
              ${isSameDay(day, selectedDate ?? new Date()) ? "bg-blue-500 text-white" : "hover:bg-blue-100"}
            `}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {selectedDate && (
        <p className="mt-4 text-center">
          Data selecionada:{" "}
          <span className="font-semibold">
            {format(selectedDate, "dd 'de' MMMM yyyy", { locale: ptBR })}
          </span>
        </p>
      )}
    </div>
  );
}
