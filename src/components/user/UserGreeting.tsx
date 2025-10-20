"use client";

export default function UserGreeting({ name = "Usuário" }: { name?: string }) {
  const today = new Date();

  // Extrai os componentes da data
  let dayWeek = today.toLocaleDateString("pt-BR", { weekday: "long" });
  const day = today.getDate();
  const month = today.toLocaleDateString("pt-BR", { month: "long" });

  // Remove "-feira" e capitaliza
  dayWeek = dayWeek.replace("-feira", "");
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const newDate = `${capitalize(dayWeek.trim())}, ${day} de ${capitalize(month)}`;

  return (
    <div>
      <h1 className="text-lg text-gray-300">
        Olá, <span className="font-semibold">{name}</span>!
      </h1>
      <p className="text-xs text-gray-400">{newDate}</p>
    </div>
  );
}