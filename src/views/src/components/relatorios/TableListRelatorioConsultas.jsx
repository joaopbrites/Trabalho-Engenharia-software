import React, { useEffect, useState } from "react";
import { getRelatorioConsultasTodosTutores } from "../../api/relatorios";

export default function TableListRelatorioConsultas() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErro(null);
      try {
        const data = await getRelatorioConsultasTodosTutores();
        setDados(Array.isArray(data) ? data : []);
      } catch (e) {
        setErro("Erro ao buscar relatório de consultas");
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
            <th>Data Consulta</th>
            <th>Encerrada?</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((rel) =>
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
