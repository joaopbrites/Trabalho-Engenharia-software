// RelatorioController.ts
import { Request, Response } from 'express';
import { TutorModel } from "../models/Tutor";
import { AnimalModel } from "../models/Animal";
import { VacinaAplicadaModel } from "../models/Vacina";
import { ConsultaModel } from "../models/Consulta";
import { RelatorioVacinasPorTutorDTO, RelatorioConsultasPorTutorDTO } from '../models/RelatorioDTO';

export class RelatorioController {
  static async vacinasPorTutor(req: Request, res: Response) {
    const tutorId = req.params.tutorId;

    const tutorModel = new TutorModel();
    const tutor = tutorModel.read(tutorId);
    if (!tutor || !tutor.ativo) return res.status(404).json({ erro: 'Tutor não encontrado' });

    const animalModel = new AnimalModel();
    const animais = animalModel.listByTutor(tutorId);

    const vacModel = new VacinaAplicadaModel();
    const animaisDTO = await Promise.all(
      animais.map(async (animal) => {
        const vacinas = vacModel.listByAnimal(animal.id);
        return {
          id: animal.id,
          nome: animal.nome,
          vacinas: vacinas.map((v) => ({
            id: v.id,
            nome_vacina: v.nome_vacina,
            data_aplicacao: v.data_aplicacao
          }))
        };
      })
    );

    const relatorio: RelatorioVacinasPorTutorDTO = {
      tutor: { id: tutor.id, nome: tutor.nome },
      animais: animaisDTO
    };
    return res.json(relatorio);
  }

  static async consultasPorTutor(req: Request, res: Response) {
    const tutorId = req.params.tutorId;

    const tutorModel = new TutorModel();
    const tutor = tutorModel.read(tutorId);
    if (!tutor || !tutor.ativo) return res.status(404).json({ erro: 'Tutor não encontrado' });

    const animalModel = new AnimalModel();
    const animais = animalModel.listByTutor(tutorId);

    const consultaModel = new ConsultaModel();
    const animaisDTO = await Promise.all(
      animais.map(async (animal) => {
        const consultas = consultaModel.listByAnimal(animal.id);
        return {
          id: animal.id,
          nome: animal.nome,
          consultas: consultas.map((c) => ({
            id: c.id,
            data: c.data,
            encerrada: c.encerrada
          }))
        };
      })
    );

    const relatorio: RelatorioConsultasPorTutorDTO = {
      tutor: { id: tutor.id, nome: tutor.nome },
      animais: animaisDTO
    };
    return res.json(relatorio);
  }
}
