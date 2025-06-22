// RelatorioDTO.ts

export interface RelatorioVacinasPorTutorDTO {
  tutor: {
    id: string;
    nome: string;
  };
  animais: {
    id: string;
    nome: string;
    vacinas: {
      id: string;
      nome_vacina: string;
      data_aplicacao: Date;
    }[];
  }[];
}

export interface RelatorioConsultasPorTutorDTO {
  tutor: {
    id: string;
    nome: string;
  };
  animais: {
    id: string;
    nome: string;
    consultas: {
      id: string;
      data: Date;
      encerrada: boolean;
    }[];
  }[];
}
