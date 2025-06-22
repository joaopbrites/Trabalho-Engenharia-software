// /models/interfaces.ts

export interface ITutor {
    id: string;
    nome: string;
    telefone: string;
    endereco: string;
    ativo: boolean;
}

export interface IAnimal {
    id: string;
    nome: string;
    especie: string;
    sexo: string;
    tutorId: string;
    ativo: boolean;
}

export interface IConsulta {
    id: string;
    animalId: string;
    data_consulta: string; // ou Date, dependendo da sua implementação
    encerrada: boolean;
}

export interface IVacinaAplicada {
    id: string;
    animalId: string;
    consultaId: string;
    nome_vacina: string;
    data_aplicacao: string; // ou Date
}
