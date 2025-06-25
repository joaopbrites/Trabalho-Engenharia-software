import './App.css'
import Navbar from './components/Navbar'

// IMPORTES PERSONALIZADOS
import TableListTutor from './components/tutor/TableListTutor';
import TableListAnimal from './components/animais/TableListAnimal';
import TableListConsulta from './components/consultas/TableListConsulta';
import TableListVacinaAplicada from './components/vacinas/TableListVacinas';

import ModalFormTutor from './components/tutor/ModalFormTutor';
import ModalFormAnimal from './components/animais/ModalFormAnimal';
import ModalFormConsulta from './components/consultas/ModalFormConsulta';
import ModalFormVacinaAplicada from './components/vacinas/ModalFormVacina';

import RelatoriosPage from './components/relatorios/RelatoriosPage';

import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// IMPORTES DE API
import {
    getAnimais, createAnimal, updateAnimal, deleteAnimal
} from './api/animais';
import {
    getConsultas, createConsulta, updateConsulta, deleteConsulta
} from './api/consultas';
import {
    getVacinas, createVacina, updateVacina, deleteVacina
} from './api/vacinas';
import {
    getTutores, createTutor, updateTutor, deleteTutor, toggleAtivoTutor // <--- adicionado aqui
} from './api/tutores';

// COMPONENTE PRINCIPAL COM NAVBAR + ESTADO DE MODAL E DADOS
function MainContentWithNavbar() {
    const location = useLocation();

    // --- Estados de dados
    const [tutores, setTutores] = useState([]);
    const [animais, setAnimais] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [vacinas, setVacinas] = useState([]);

    // --- Estado da modal
    const [isOpen, setIsOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedItem, setSelectedItem] = useState(null);

    // --- Busca dados ao entrar na tela ou ao atualizar (simplificado)
    const refreshTutores = useCallback(() => getTutores().then(setTutores), []);
    const refreshAnimais = useCallback(() => getAnimais().then(setAnimais), []);
    const refreshConsultas = useCallback(() => getConsultas().then(setConsultas), []);
    const refreshVacinas = useCallback(() => getVacinas().then(setVacinas), []);

    useEffect(() => { refreshTutores(); }, []);
    useEffect(() => { refreshAnimais(); }, []);
    useEffect(() => { refreshConsultas(); }, []);
    useEffect(() => { refreshVacinas(); }, []);

    // --- Centraliza open/close
    const handleOpen = (mode = 'add', item = null) => {
        setModalMode(mode);
        setSelectedItem(item);
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };

    // --- Submits integrando API/backend
    const handleSubmitTutor = async (data) => {
        if (modalMode === 'add') await createTutor(data); // CORRIGIDO
        else if (modalMode === 'edit' && selectedItem) await updateTutor(selectedItem.id, data);
        await refreshTutores();
        handleClose();
    };
    const handleDeleteTutor = async (id) => {
        await deleteTutor(id);
        await refreshTutores();
    };
    const handleToggleAtivoTutor = async (id, novoAtivo) => {
        await toggleAtivoTutor(id, novoAtivo);
        await refreshTutores();
    };


    const handleSubmitAnimal = async (data) => {
        if (modalMode === 'add') await createAnimal(data);
        else if (modalMode === 'edit' && selectedItem) await updateAnimal(selectedItem.id, data);
        await refreshAnimais();
        handleClose();
    };
    const handleToggleAtivoAnimal = async (id) => {
        // Encontre o animal atual para saber o status
        const animal = animais.find(a => a.id === id);
        if (!animal) return;
        // PATCH alternando o ativo (ajuste conforme sua API)
        await updateAnimal(id, { ativo: !animal.ativo }); // ou toggleAtivoAnimal(id)
        await refreshAnimais();
    };
    const handleDeleteAnimal = async (id) => {
        await deleteAnimal(id);
        await refreshAnimais();
    };

    const handleSubmitConsulta = async (data) => {
        if (modalMode === 'add') await createConsulta(data);
        else if (modalMode === 'edit' && selectedItem) await updateConsulta(selectedItem.id, data);
        await refreshConsultas();
        handleClose();
    };
    const handleToggleEncerrada = async (id) => {
        const consulta = consultas.find(c => c.id === id);
        if (!consulta) return;
        await updateConsulta(id, { encerrada: !consulta.encerrada });
        await refreshConsultas();
    };

    const handleDeleteConsulta = async (id) => {
        await deleteConsulta(id);
        await refreshConsultas();
    };

    const handleSubmitVacina = async (data) => {
        if (modalMode === 'add') await createVacina(data);
        else if (modalMode === 'edit' && selectedItem) await updateVacina(selectedItem.id, data);
        await refreshVacinas();
        handleClose();
    };
    const handleDeleteVacina = async (id) => {
        await deleteVacina(id);
        await refreshVacinas();
    };

    // --- Switch para Tabela/Form conforme entidade
    let Table = null, Modal = null, propsTable = {}, propsModal = {};
    if (location.pathname.startsWith('/tutores')) {
        Table = TableListTutor;
        Modal = ModalFormTutor;
        propsTable = {
            data: tutores,
            onOpen: handleOpen,
            onDelete: handleDeleteTutor,
            onToggleAtivo: handleToggleAtivoTutor, // <--- agora está ativo!
        };

        propsModal = {
            isOpen,
            onClose: handleClose,
            mode: modalMode,
            onSubmit: handleSubmitTutor,
            initialData: selectedItem
        };
    } else if (location.pathname.startsWith('/animais')) {
        Table = TableListAnimal;
        Modal = ModalFormAnimal;
        propsTable = {
        data: animais,
        onOpen: handleOpen,
        onDelete: handleDeleteAnimal,
        onToggleAtivo: handleToggleAtivoAnimal,  // <-- novo!
        tutores,
    };
        propsModal = {
            isOpen,
            onClose: handleClose,
            mode: modalMode,
            onSubmit: handleSubmitAnimal,
            initialData: selectedItem,
            tutoresList: tutores
        };
    } else if (location.pathname.startsWith('/consultas')) {
        Table = TableListConsulta;
        Modal = ModalFormConsulta;
        propsTable = {
        data: consultas,
        onOpen: handleOpen,
        onDelete: handleDeleteConsulta,
        onToggleEncerrada: handleToggleEncerrada, // <-- opcional
        animais,
    };
        propsModal = {
            isOpen,
            onClose: handleClose,
            mode: modalMode,
            onSubmit: handleSubmitConsulta,
            initialData: selectedItem,
            animaisList: animais
        };
    } else if (location.pathname.startsWith('/vacinas-aplicadas')) {
        Table = TableListVacinaAplicada;
        Modal = ModalFormVacinaAplicada;
         propsTable = {
        data: vacinas,
        onOpen: handleOpen,
        onDelete: handleDeleteVacina,
        animais,
        consultas
    };
        propsModal = {
            isOpen,
            onClose: handleClose,
            mode: modalMode,
            onSubmit: handleSubmitVacina,
            initialData: selectedItem,
            animaisList: animais,
            consultasList: consultas
        };
    }

    return (
        <>
            <Navbar onOpen={() => handleOpen('add')} />
            {Table && <Table {...propsTable} />}
            {Modal && <Modal {...propsModal} />}
            {!Table && <div>Escolha uma entidade no menu.</div>}
        </>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/relatorios"
                    element={
                        <div className="py-5 px-5 ">
                            <Navbar />
                            <RelatoriosPage />
                        </div>
                    }
                />
                <Route
                    path="*"
                    element={
                        <div className="py-5 px-5 ">
                            <MainContentWithNavbar />
                        </div>
                    }
                />
            </Routes>
        </Router>
    )
}
