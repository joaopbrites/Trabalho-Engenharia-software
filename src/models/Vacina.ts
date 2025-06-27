// models/VacinaAplicada.ts

import crypto from 'crypto';
import DatabaseManager from '../config/database';

/**
 * Contrato VacinaAplicada (histórico de vacinação)
 */
export interface IVacinaAplicada {
  id: string;
  animalId: string;
  consultaId: string;
  nome_vacina: string;
  data_aplicacao: string; // ISO string para compatibilidade
}

/**
 * CRUD de VacinaAplicada (só pode ser cadastrada com animal e consulta válidos)
 */
export class VacinaAplicadaModel {
  private db = DatabaseManager.getInstance().getDatabase();

  /**
   * Cria VacinaAplicada.
   * @param data Dados
   * @param animalExistsFn Função para checar animal
   * @param consultaExistsFn Função para checar consulta
   */
  public async create(
    data: Omit<IVacinaAplicada, "id">,
    animalExistsFn: (id: string) => Promise<boolean>,
    consultaExistsFn: (id: string) => Promise<boolean>
  ): Promise<IVacinaAplicada | undefined> {
    const animalExists = await animalExistsFn(data.animalId);
    const consultaExists = await consultaExistsFn(data.consultaId);
    
    if (!animalExists || !consultaExists) return undefined;
    
    const id = crypto.randomUUID();
    const vacina: IVacinaAplicada = { ...data, id };
    
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO vacinas_aplicadas (id, animalId, consultaId, nome_vacina, data_aplicacao) VALUES (?, ?, ?, ?, ?)`;
      this.db.run(sql, [id, data.animalId, data.consultaId, data.nome_vacina, data.data_aplicacao], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(vacina);
        }
      });
    });
  }

  public async read(id: string): Promise<IVacinaAplicada | undefined> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM vacinas_aplicadas WHERE id = ?`;
      this.db.get(sql, [id], (err, row: any) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            resolve({
              id: row.id,
              animalId: row.animalId,
              consultaId: row.consultaId,
              nome_vacina: row.nome_vacina,
              data_aplicacao: row.data_aplicacao
            });
          } else {
            resolve(undefined);
          }
        }
      });
    });
  }

  public async list(): Promise<IVacinaAplicada[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM vacinas_aplicadas ORDER BY data_aplicacao DESC`;
      this.db.all(sql, [], (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const vacinas = rows.map(row => ({
            id: row.id,
            animalId: row.animalId,
            consultaId: row.consultaId,
            nome_vacina: row.nome_vacina,
            data_aplicacao: row.data_aplicacao
          }));
          resolve(vacinas);
        }
      });
    });
  }

  public async update(id: string, data: Partial<Omit<IVacinaAplicada, "id" | "animalId" | "consultaId">>): Promise<IVacinaAplicada | undefined> {
    const existingVacina = await this.read(id);
    if (!existingVacina) return undefined;

    return new Promise((resolve, reject) => {
      const updates: string[] = [];
      const values: any[] = [];
      
      if (data.nome_vacina !== undefined) {
        updates.push('nome_vacina = ?');
        values.push(data.nome_vacina);
      }
      if (data.data_aplicacao !== undefined) {
        updates.push('data_aplicacao = ?');
        values.push(data.data_aplicacao);
      }
      
      if (updates.length === 0) {
        resolve(existingVacina);
        return;
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);

      const sql = `UPDATE vacinas_aplicadas SET ${updates.join(', ')} WHERE id = ?`;
      this.db.run(sql, values, async (err) => {
        if (err) {
          reject(err);
        } else {
          const updated = await this.read(id);
          resolve(updated);
        }
      });
    });
  }

  public async delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM vacinas_aplicadas WHERE id = ?`;
      this.db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  /**
   * Lista vacinas aplicadas por animal.
   */
  public async listByAnimal(animalId: string): Promise<IVacinaAplicada[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM vacinas_aplicadas WHERE animalId = ? ORDER BY data_aplicacao DESC`;
      this.db.all(sql, [animalId], (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const vacinas = rows.map(row => ({
            id: row.id,
            animalId: row.animalId,
            consultaId: row.consultaId,
            nome_vacina: row.nome_vacina,
            data_aplicacao: row.data_aplicacao
          }));
          resolve(vacinas);
        }
      });
    });
  }
}
