// RelatorioController.ts
import { Request, Response } from 'express';
import { TutorModel } from "../models/Tutor";
import { AnimalModel } from "../models/Animal";
import { VacinaAplicadaModel } from "../models/Vacina";
import { ConsultaModel } from "../models/Consulta";
import { RelatorioVacinasPorTutorDTO, RelatorioConsultasPorTutorDTO } from '../models/RelatorioDTO';

export class RelatorioController {
  static async vacinasPorTutor(req: Request, res: Response) {
    try {
      const tutorId = req.params.tutorId;

      const tutorModel = new TutorModel();
      const tutor = await tutorModel.read(tutorId);
      if (!tutor || !tutor.ativo) return res.status(404).json({ erro: 'Tutor não encontrado' });

      const animalModel = new AnimalModel();
      const animais = await animalModel.listByTutor(tutorId);

      const vacModel = new VacinaAplicadaModel();
      const animaisDTO = await Promise.all(
        animais.map(async (animal) => {
          const vacinas = await vacModel.listByAnimal(animal.id);
          return {
            id: animal.id,
            nome: animal.nome,
            vacinas: vacinas.map((v) => ({
              id: v.id,
              nome_vacina: v.nome_vacina,
              data_aplicacao: new Date(v.data_aplicacao)
            }))
          };
        })
      );

      const relatorio: RelatorioVacinasPorTutorDTO = {
        tutor: { id: tutor.id, nome: tutor.nome },
        animais: animaisDTO
      };
      return res.json(relatorio);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno do servidor', detalhes: error });
    }
  }

  static async consultasPorTutor(req: Request, res: Response) {
    try {
      const tutorId = req.params.tutorId;

      const tutorModel = new TutorModel();
      const tutor = await tutorModel.read(tutorId);
      if (!tutor || !tutor.ativo) return res.status(404).json({ erro: 'Tutor não encontrado' });

      const animalModel = new AnimalModel();
      const animais = await animalModel.listByTutor(tutorId);

      const consultaModel = new ConsultaModel();
      const animaisDTO = await Promise.all(
        animais.map(async (animal) => {
          const consultas = await consultaModel.listByAnimal(animal.id);
          return {
            id: animal.id,
            nome: animal.nome,
            consultas: consultas.map((c) => ({
              id: c.id,
              data: new Date(c.data_consulta), // Convertendo string para Date
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
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno do servidor', detalhes: error });
    }
  }

  static async vacinasPorTodosTutores(req: Request, res: Response) {
    try {
      const tutorModel = new TutorModel();
      const todosTutores = await tutorModel.list();
      const tutores = todosTutores.filter((t) => t.ativo);
      
      const animalModel = new AnimalModel();
      const vacModel = new VacinaAplicadaModel();
      
      const relatorios = await Promise.all(
        tutores.map(async (tutor) => {
          const animais = await animalModel.listByTutor(tutor.id);
          const animaisDTO = await Promise.all(
            animais.map(async (animal) => {
              const vacinas = await vacModel.listByAnimal(animal.id);
              return {
                id: animal.id,
                nome: animal.nome,
                vacinas: vacinas.map((v) => ({
                  id: v.id,
                  nome_vacina: v.nome_vacina,
                  data_aplicacao: new Date(v.data_aplicacao)
                }))
              };
            })
          );
          return {
            tutor: { id: tutor.id, nome: tutor.nome },
            animais: animaisDTO
          };
        })
      );
      
      return res.json(relatorios);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno do servidor', detalhes: error });
    }
  }

  static async consultasPorTodosTutores(req: Request, res: Response) {
    try {
      const tutorModel = new TutorModel();
      const todosTutores = await tutorModel.list();
      const tutores = todosTutores.filter((t) => t.ativo);
      
      const animalModel = new AnimalModel();
      const consultaModel = new ConsultaModel();
      
      const relatorios = await Promise.all(
        tutores.map(async (tutor) => {
          const animais = await animalModel.listByTutor(tutor.id);
          const animaisDTO = await Promise.all(
            animais.map(async (animal) => {
              const consultas = await consultaModel.listByAnimal(animal.id);
              return {
                id: animal.id,
                nome: animal.nome,
                consultas: consultas.map((c) => ({
                  id: c.id,
                  data: new Date(c.data_consulta), // Convertendo string para Date
                  encerrada: c.encerrada
                }))
              };
            })
          );
          return {
            tutor: { id: tutor.id, nome: tutor.nome },
            animais: animaisDTO
          };
        })
      );
      
      return res.json(relatorios);
    } catch (error) {
      return res.status(500).json({ erro: 'Erro interno do servidor', detalhes: error });
    }
  }
}
