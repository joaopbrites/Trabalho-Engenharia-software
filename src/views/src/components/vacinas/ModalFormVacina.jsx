import { useState, useEffect } from "react";

export default function ModalFormVacinaAplicada({ isOpen, onClose, mode, onSubmit, initialData, animaisList = [], consultasList = [] }) {
    const [animalId, setAnimalId] = useState('');
    const [consultaId, setConsultaId] = useState('');
    const [nome_vacina, setNomeVacina] = useState('');
    const [data_aplicacao, setDataAplicacao] = useState('');

    // Se quiser manter campos extras para o futuro:
    // const [lote, setLote] = useState('');
    // const [fabricante, setFabricante] = useState('');

    useEffect(() => {
        if (initialData) {
            setAnimalId(initialData.animalId || '');
            setConsultaId(initialData.consultaId || '');
            setNomeVacina(initialData.nome_vacina || initialData.nomeVacina || '');
            setDataAplicacao(
                initialData.data_aplicacao
                    ? initialData.data_aplicacao.slice(0, 10)
                    : (initialData.dataAplicacao ? initialData.dataAplicacao.slice(0, 10) : '')
            );
            // setLote(initialData.lote || '');
            // setFabricante(initialData.fabricante || '');
        } else {
            setAnimalId('');
            setConsultaId('');
            setNomeVacina('');
            setDataAplicacao('');
            // setLote('');
            // setFabricante('');
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            animalId,
            consultaId,
            nome_vacina,
            data_aplicacao
            // lote,
            // fabricante,
        });
    };

    return (
        <dialog className="modal bg-black/40" open={isOpen}>
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Editar Vacina' : 'Nova Vacina'}</h3>
                <form onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Animal
                        <select className="grow" required value={animalId} onChange={e => setAnimalId(e.target.value)}>
                            <option value="">Selecione o animal</option>
                            {animaisList.map(animal => (
                                <option key={animal.id} value={animal.id}>{animal.nome}</option>
                            ))}
                        </select>
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Consulta
                        <select className="grow" required value={consultaId} onChange={e => setConsultaId(e.target.value)}>
                            <option value="">Selecione a consulta</option>
                            {consultasList.map(consulta => (
                                <option key={consulta.id} value={consulta.id}>
                                    {consulta.data?.slice(0, 10)} - {consulta.motivo}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Nome da Vacina
                        <input
                            type="text"
                            className="grow"
                            required
                            value={nome_vacina}
                            onChange={e => setNomeVacina(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Data de Aplicação
                        <input
                            type="date"
                            className="grow"
                            required
                            value={data_aplicacao}
                            onChange={e => setDataAplicacao(e.target.value)}
                        />
                    </label>
                    {/* Campos extras, se quiser manter */}
                    {/* <label className="input input-bordered flex items-center my-2 gap-2">
                        Lote
                        <input type="text" className="grow" value={lote} onChange={e => setLote(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Fabricante
                        <input type="text" className="grow" value={fabricante} onChange={e => setFabricante(e.target.value)} />
                    </label> */}
                    <button type="submit" className="btn btn-success w-full">
                        {mode === 'edit' ? 'Salvar Alterações' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </dialog>
    );
}
