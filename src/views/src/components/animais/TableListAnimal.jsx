export default function TableListAnimal({
  data = [],
  tutores = [],
  onOpen,
  onDelete,
  onToggleAtivo
}) {
  const getTutorName = (id) => tutores.find(t => t.id === id)?.nome || '';
  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Raça</th>
            <th>Sexo</th>
            <th>Idade</th>
            <th>Tutor</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="hover">
          {data.map((item, idx) => (
            <tr key={item.id}>
              <th>{idx + 1}</th>
              <td>{item.nome}</td>
              <td>{item.especie}</td>
              <td>{item.raca}</td>
              <td>{item.sexo}</td>
              <td>{item.idade}</td>
              <td>{getTutorName(item.tutorId)}</td>
              <td>
                <button
                  className={`btn rounded-full w-20 ${item.ativo ? 'btn-primary' : 'btn-outline btn-primary'}`}
                  onClick={onToggleAtivo ? () => onToggleAtivo(item.id) : undefined}
                >
                  {item.ativo ? 'Ativo' : 'Inativo'}
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
