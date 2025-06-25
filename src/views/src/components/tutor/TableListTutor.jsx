export default function TableListTutor({
  data = [],
  onOpen,
  onDelete,
  onToggleAtivo,
}) {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
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
              <td>{item.telefone}</td>
              <td>{item.email}</td>
              <td>
                <button
                  className={`btn rounded-full w-20 ${item.ativo ? 'btn-primary' : 'btn-outline btn-primary'}`}
                  // Agora passa o valor novo para o handler!
                  onClick={onToggleAtivo ? () => onToggleAtivo(item.id, !item.ativo) : undefined}
                >
                  {item.ativo ? 'Ativo' : 'Inativo'}
                </button>
              </td>
              <td>
                <button className="btn btn-secondary" onClick={() => onOpen('edit', item)}>
                  Editar
                </button>
              </td>
              <td>
                <button className="btn btn-accent" onClick={() => onDelete(item.id)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
