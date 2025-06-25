import React from "react";

// Exemplo de dados mockados. Substitua por fetch real depois.
const mockData = [
  {
    tutor: { id: "1", nome: "João" },
    animais: [
      {
        id: "a1",
        nome: "Rex",
        consultas: [
          { id: "c1", data: "2024-02-10", encerrada: true },
          { id: "c2", data: "2024-04-20", encerrada: false },
        ],
      },
    ],
  },
];

export default function TableListRelatorioConsultas() {
  // Troque mockData por dados vindos da API futuramente
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Tutor</th>
            <th>Animal</th>
            <th>Data Consulta</th>
            <th>Encerrada?</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((rel) =>
            rel.animais.map((animal) =>
              animal.consultas.map((consulta) => (
                <tr key={consulta.id}>
                  <td>{rel.tutor.nome}</td>
                  <td>{animal.nome}</td>
                  <td>{consulta.data}</td>
                  <td>{consulta.encerrada ? "Sim" : "Não"}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
