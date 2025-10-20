"use client";

export default function UserPage() {
  const hoje = new Date();

  // Extrai os componentes da data
  let diaSemana = hoje.toLocaleDateString("pt-BR", { weekday: "long" });
  const dia = hoje.getDate();
  const mes = hoje.toLocaleDateString("pt-BR", { month: "long" });

  // Remove "-feira" e capitaliza
  diaSemana = diaSemana.replace("-feira", "");
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const dataBonita = `${capitalize(diaSemana.trim())}, ${dia} de ${capitalize(mes)}`;

  return (
    <div className="">
      <h1 className="text-lg text-gray-300">Olá, <span className="font-semibold">Usuário</span>!</h1>
      <p className="text-xs text-gray-400">{dataBonita}</p>
    </div>
  );
}
