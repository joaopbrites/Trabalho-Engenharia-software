// models/Animal.ts

import type { ITutor } from "./Tutor";
import crypto from 'crypto';
/**
 * Contrato Animal
 */
export interface IAnimal {
  id: string;
  nome: string;
  especie: string;
  sexo: string;
  tutorId: string;
  ativo: boolean;
}

/**
 * CRUD e armazenamento em memória de Animal.
 */
export class AnimalModel {
  private animals: Map<string, IAnimal> = new Map();

  /**
   * Cria novo Animal.
   * @param data Dados do animal (exceto ID)
   * @param tutorExistsFn Função que valida existência do tutor
   * @returns Animal criado ou undefined se Tutor não existir
   */
  public create(data: Omit<IAnimal, "id" | "ativo">, tutorExistsFn: (id: string) => boolean): IAnimal | undefined {
    if (!tutorExistsFn(data.tutorId)) return undefined;
    const id = crypto.randomUUID();
    const animal: IAnimal = { ...data, id, ativo: true };
    this.animals.set(id, animal);
    return animal;
  }

  /**
   * Consulta Animal por ID.
   */
  public read(id: string): IAnimal | undefined {
    return this.animals.get(id);
  }

  /**
   * Lista todos os Animais.
   */
  public list(): IAnimal[] {
    return Array.from(this.animals.values());
  }

  /**
   * Atualiza Animal.
   * @param id ID
   * @param data Campos a atualizar
   */
  public update(id: string, data: Partial<Omit<IAnimal, "id" | "tutorId" | "ativo">>): IAnimal | undefined {
    const animal = this.animals.get(id);
    if (!animal) return undefined;
    const updated = { ...animal, ...data };
    this.animals.set(id, updated);
    return updated;
  }

  /**
   * Inativa Animal (soft delete).
   * @param id Animal
   */
  public delete(id: string): boolean {
    const animal = this.animals.get(id);
    if (!animal || !animal.ativo) return false;
    return this.animals.delete(id);
  }

  /**
   * Lista animais por Tutor.
   */
  public listByTutor(tutorId: string): IAnimal[] {
    return Array.from(this.animals.values()).filter(a => a.tutorId === tutorId && a.ativo);
  }
}
