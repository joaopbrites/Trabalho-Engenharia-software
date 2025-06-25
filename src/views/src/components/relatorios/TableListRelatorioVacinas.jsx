import React from "react";

// Exemplo de dados mockados. Substitua por fetch real depois.
const mockData = [
  {
    tutor: { id: "1", nome: "João" },
    animais: [
      {
        id: "a1",
        nome: "Rex",
        vacinas: [
          { id: "v1", nome_vacina: "Raiva", data_aplicacao: "2024-01-10" },
          { id: "v2", nome_vacina: "V10", data_aplicacao: "2024-03-15" },
        ],
      },
    ],
  },
];

export default function TableListRelatorioVacinas() {
  // Troque mockData por dados vindos da API futuramente
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Tutor</th>
            <th>Animal</th>
            <th>Vacina</th>
            <th>Data Aplicação</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((rel) =>
            rel.animais.map((animal) =>
              animal.vacinas.map((vacina) => (
                <tr key={vacina.id}>
                  <td>{rel.tutor.nome}</td>
                  <td>{animal.nome}</td>
                  <td>{vacina.nome_vacina}</td>
                  <td>{vacina.data_aplicacao}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
