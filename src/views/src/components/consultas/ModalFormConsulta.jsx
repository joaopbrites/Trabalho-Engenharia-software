import { useState, useEffect } from "react";

export default function ModalFormConsulta({ isOpen, onClose, mode, onSubmit, initialData, animaisList = [] }) {
    const [animalId, setAnimalId] = useState('');
    const [data, setData] = useState('');
    const [motivo, setMotivo] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [encerrada, setEncerrada] = useState(false);

    useEffect(() => {
        if (initialData) {
            setAnimalId(initialData.animalId || '');
            setData(initialData.data ? initialData.data.slice(0, 10) : ''); // Assume ISO
            setMotivo(initialData.motivo || '');
            setObservacoes(initialData.observacoes || '');
            setEncerrada(initialData.encerrada || false);
        } else {
            setAnimalId(''); setData(''); setMotivo(''); setObservacoes(''); setEncerrada(false);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            animalId, data, motivo, observacoes, encerrada,
        });
    };

    return (
        <dialog className="modal bg-black/40" open={isOpen}>
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Editar Consulta' : 'Nova Consulta'}</h3>
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
                        Data
                        <input type="date" className="grow" required value={data} onChange={e => setData(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Motivo
                        <input type="text" className="grow" required value={motivo} onChange={e => setMotivo(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Observações
                        <textarea className="grow" rows={2} value={observacoes} onChange={e => setObservacoes(e.target.value)} />
                    </label>
                    <div className="flex my-4 items-center gap-4">
                        <label className="flex items-center gap-2">
                            Encerrada
                            <input type="checkbox" checked={encerrada} onChange={() => setEncerrada(a => !a)} className="checkbox" />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-success w-full">
                        {mode === 'edit' ? 'Salvar Alterações' : 'Cadastrar'}
                    </button>
                </form>
            </div>
        </dialog>
    );
}
