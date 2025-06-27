import React, { useEffect, useState } from "react";
import { getRelatorioVacinasTodosTutores } from "../../api/relatorios";

export default function TableListRelatorioVacinas() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErro(null);
      try {
        const data = await getRelatorioVacinasTodosTutores();
        setDados(Array.isArray(data) ? data : []);
      } catch (e) {
        setErro("Erro ao buscar relatório de vacinas");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;
  if (!dados.length) return <div>Nenhum dado encontrado.</div>;

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
          {dados.map((rel) =>
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
