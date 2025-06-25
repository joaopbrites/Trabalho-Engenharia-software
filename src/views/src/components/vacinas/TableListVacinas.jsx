export default function TableListVacinaAplicada({
  data = [],
  animais = [],
  consultas = [],
  onOpen,
  onDelete
}) {
  const getAnimalName = id => animais.find(a => a.id === id)?.nome || '';
  const getConsultaInfo = id => {
    const consulta = consultas.find(c => c.id === id);
    return consulta ? `${consulta.data?.slice(0,10)} - ${consulta.motivo}` : '';
  };

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Animal</th>
            <th>Consulta</th>
            <th>Nome Vacina</th>
            <th>Data Aplicação</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="hover">
          {data.map((item, idx) => (
            <tr key={item.id}>
              <th>{idx + 1}</th>
              <td>{getAnimalName(item.animalId)}</td>
              <td>{getConsultaInfo(item.consultaId)}</td>
              <td>{item.nome_vacina}</td>
              <td>{item.data_aplicacao?.slice(0, 10)}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => onOpen('edit', item)}>Editar</button>
              </td>
              <td>
                <button className="btn btn-accent" onClick={() => onDelete(item.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
