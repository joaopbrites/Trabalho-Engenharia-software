import { useState, useEffect } from "react";

// Props esperadas:
// isOpen: boolean
// onClose: () => void
// mode: 'edit' | 'add'
// onSubmit: (tutor: { nome, telefone, email, ativo }) => void
// initialData: { nome, telefone, email, ativo } (opcional, só em modo edição)

export default function ModalFormTutor({ isOpen, onClose, mode, onSubmit, initialData }) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [ativo, setAtivo] = useState(true);

    useEffect(() => {
        if (initialData) {
            setNome(initialData.nome || '');
            setTelefone(initialData.telefone || '');
            setEmail(initialData.email || '');
            setAtivo(initialData.ativo !== undefined ? initialData.ativo : true);
        } else {
            setNome('');
            setTelefone('');
            setEmail('');
            setAtivo(true);
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            nome,
            telefone,
            email,
            ativo,
        });
    };

    return (
        <dialog id="modal_tutor" className="modal bg-black/40" open={isOpen}>
            <div className="modal-box">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}
                    type="button"
                >
                    ✕
                </button>
                <h3 className="font-bold text-lg py-4">
                    {mode === 'edit' ? 'Editar Tutor' : 'Novo Tutor'}
                </h3>

                <form onSubmit={handleSubmit}>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Nome
                        <input
                            type="text"
                            className="grow"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Telefone
                        <input
                            type="tel"
                            className="grow"
                            required
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        Email
                        <input
                            type="email"
                            className="grow"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <div className="flex my-4 items-center gap-4">
                        <label className="flex items-center gap-2">
                            Ativo
                            <input
                                type="checkbox"
                                checked={ativo}
                                onChange={() => setAtivo((a) => !a)}
                                className="checkbox"
                            />
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
