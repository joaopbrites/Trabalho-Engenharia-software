import { useState, useEffect } from "react";

export default function ModalFormAnimal({ isOpen, onClose, mode, onSubmit, initialData, tutoresList = [] }) {
    const [nome, setNome] = useState('');
    const [especie, setEspecie] = useState('');
    const [raca, setRaca] = useState('');
    const [sexo, setSexo] = useState('M');
    const [idade, setIdade] = useState('');
    const [tutorId, setTutorId] = useState('');
    const [ativo, setAtivo] = useState(true);

    useEffect(() => {
        if (initialData) {
            setNome(initialData.nome || '');
            setEspecie(initialData.especie || '');
            setRaca(initialData.raca || '');
            setSexo(initialData.sexo || 'M');
            setIdade(initialData.idade !== undefined ? String(initialData.idade) : '');
            setTutorId(initialData.tutorId || '');
            setAtivo(initialData.ativo !== undefined ? initialData.ativo : true);
        } else {
            setNome(''); setEspecie(''); setRaca(''); setSexo('M'); setIdade(''); setTutorId(''); setAtivo(true);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            nome, especie, raca, sexo, idade: Number(idade), tutorId, ativo,
        });
    };

    return (
        <dialog className="modal bg-black/40" open={isOpen}>
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Editar Animal' : 'Novo Animal'}</h3>
                <form onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Nome
                        <input type="text" className="grow" required value={nome} onChange={e => setNome(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Espécie
                        <input type="text" className="grow" required value={especie} onChange={e => setEspecie(e.target.value)} />
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Raça
                        <input type="text" className="grow" required value={raca} onChange={e => setRaca(e.target.value)} />
                    </label>
                    <div className="flex my-2 gap-2">
                        <label className="input input-bordered flex items-center gap-2">
                            Idade
                            <input type="number" className="grow" required min="0" value={idade} onChange={e => setIdade(e.target.value)} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Sexo
                            <select className="grow" value={sexo} onChange={e => setSexo(e.target.value)}>
                                <option value="M">Macho</option>
                                <option value="F">Fêmea</option>
                            </select>
                        </label>
                    </div>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Tutor
                        <select className="grow" required value={tutorId} onChange={e => setTutorId(e.target.value)}>
                            <option value="">Selecione o tutor</option>
                            {tutoresList.map(tutor => (
                                <option key={tutor.id} value={tutor.id}>{tutor.nome}</option>
                            ))}
                        </select>
                    </label>
                    <div className="flex my-4 items-center gap-4">
                        <label className="flex items-center gap-2">
                            Ativo
                            <input type="checkbox" checked={ativo} onChange={() => setAtivo(a => !a)} className="checkbox" />
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
