export default function TableListConsulta({
  data = [],
  animais = [],
  onOpen,
  onDelete,
  onToggleEncerrada // se implementar esse handler
}) {
  const getAnimalName = id => animais.find(a => a.id === id)?.nome || '';
  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Animal</th>
            <th>Data</th>
            <th>Motivo</th>
            <th>Observações</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="hover">
          {data.map((item, idx) => (
            <tr key={item.id}>
              <th>{idx + 1}</th>
              <td>{getAnimalName(item.animalId)}</td>
              <td>{item.data?.slice(0, 10)}</td>
              <td>{item.motivo}</td>
              <td>{item.observacoes}</td>
              <td>
                <button
                  className={`btn rounded-full w-20 ${item.encerrada ? 'btn-outline btn-primary' : 'btn-primary'}`}
                  onClick={onToggleEncerrada ? () => onToggleEncerrada(item.id, !item.encerrada) : undefined}
                >
                  {item.encerrada ? 'Encerrada' : 'Aberta'}
                </button>
              </td>
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
