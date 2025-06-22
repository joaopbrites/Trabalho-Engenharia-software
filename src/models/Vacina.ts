// models/VacinaAplicada.ts

/**
 * Contrato VacinaAplicada (histórico de vacinação)
 */
import crypto from 'crypto';
export interface IVacinaAplicada {
  id: string;
  animalId: string;
  consultaId: string;
  nome_vacina: string;
  data_aplicacao: Date;
}

/**
 * CRUD de VacinaAplicada (só pode ser cadastrada com animal e consulta válidos)
 */
export class VacinaAplicadaModel {
  private vacinas: Map<string, IVacinaAplicada> = new Map();

  /**
   * Cria VacinaAplicada.
   * @param data Dados
   * @param animalExistsFn Função para checar animal
   * @param consultaExistsFn Função para checar consulta
   */
  public create(
    data: Omit<IVacinaAplicada, "id">,
    animalExistsFn: (id: string) => boolean,
    consultaExistsFn: (id: string) => boolean
  ): IVacinaAplicada | undefined {
    if (!animalExistsFn(data.animalId) || !consultaExistsFn(data.consultaId)) return undefined;
    const id = crypto.randomUUID();
    const vacina: IVacinaAplicada = { ...data, id };
    this.vacinas.set(id, vacina);
    return vacina;
  }

  public read(id: string): IVacinaAplicada | undefined {
    return this.vacinas.get(id);
  }

  public list(): IVacinaAplicada[] {
    return Array.from(this.vacinas.values());
  }

  public update(id: string, data: Partial<Omit<IVacinaAplicada, "id" | "animalId" | "consultaId">>): IVacinaAplicada | undefined {
    const vacina = this.vacinas.get(id);
    if (!vacina) return undefined;
    const updated = { ...vacina, ...data };
    this.vacinas.set(id, updated);
    return updated;
  }

  public delete(id: string): boolean {
    return this.vacinas.delete(id);
  }

  /**
   * Lista vacinas aplicadas por animal.
   */
  public listByAnimal(animalId: string): IVacinaAplicada[] {
    return Array.from(this.vacinas.values()).filter(v => v.animalId === animalId);
  }
}
