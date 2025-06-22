// models/Consulta.ts

/**
 * Contrato Consulta
 */
import crypto from 'crypto';
export interface IConsulta {
  id: string;
  animalId: string;
  data: Date;
  encerrada: boolean;
}

/**
 * CRUD de Consulta, com storage em memória.
 */
export class ConsultaModel {
  private consultas: Map<string, IConsulta> = new Map();

  /**
   * Cria Consulta.
   * @param data Dados (exceto ID)
   * @param animalExistsFn Função que valida existência do animal
   */
  public create(data: Omit<IConsulta, "id" | "encerrada">, animalExistsFn: (id: string) => boolean): IConsulta | undefined {
    if (!animalExistsFn(data.animalId)) return undefined;
    const id = crypto.randomUUID();
    const consulta: IConsulta = { ...data, id, encerrada: false };
    this.consultas.set(id, consulta);
    return consulta;
  }

  public read(id: string): IConsulta | undefined {
    return this.consultas.get(id);
  }

  public list(): IConsulta[] {
    return Array.from(this.consultas.values());
  }

  public update(id: string, data: Partial<Omit<IConsulta, "id" | "animalId">>): IConsulta | undefined {
    const consulta = this.consultas.get(id);
    if (!consulta) return undefined;
    const updated = { ...consulta, ...data };
    this.consultas.set(id, updated);
    return updated;
  }

  /**
   * Remove consulta (hard delete, pois não há dependentes diretos).
   */
  public delete(id: string): boolean {
    return this.consultas.delete(id);
  }

  /**
   * Lista consultas de um Animal.
   */
  public listByAnimal(animalId: string): IConsulta[] {
    return Array.from(this.consultas.values()).filter(c => c.animalId === animalId);
  }
}
