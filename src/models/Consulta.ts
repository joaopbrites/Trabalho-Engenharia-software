// models/Consulta.ts

import crypto from 'crypto';
import DatabaseManager from '../config/database';

/**
 * Contrato Consulta
 */
export interface IConsulta {
  id: string;
  animalId: string;
  data_consulta: string; // ISO string para compatibilidade
  motivo?: string;
  observacoes?: string;
  encerrada: boolean;
}

/**
 * CRUD de Consulta, com storage em SQLite.
 */
export class ConsultaModel {
  private db = DatabaseManager.getInstance().getDatabase();

  /**
   * Cria Consulta.
   * @param data Dados (exceto ID)
   * @param animalExistsFn Função que valida existência do animal
   */
  public async create(data: Omit<IConsulta, "id" | "encerrada">, animalExistsFn: (id: string) => Promise<boolean>): Promise<IConsulta | undefined> {
    const animalExists = await animalExistsFn(data.animalId);
    if (!animalExists) return undefined;
    
    const id = crypto.randomUUID();
    const consulta: IConsulta = { ...data, id, encerrada: false };
    
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO consultas (id, animalId, data_consulta, motivo, observacoes, encerrada) VALUES (?, ?, ?, ?, ?, ?)`;
      this.db.run(sql, [id, data.animalId, data.data_consulta, data.motivo || null, data.observacoes || null, 0], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(consulta);
        }
      });
    });
  }

  public async read(id: string): Promise<IConsulta | undefined> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM consultas WHERE id = ?`;
      this.db.get(sql, [id], (err, row: any) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            resolve({
              id: row.id,
              animalId: row.animalId,
              data_consulta: row.data_consulta,
              motivo: row.motivo,
              observacoes: row.observacoes,
              encerrada: Boolean(row.encerrada)
            });
          } else {
            resolve(undefined);
          }
        }
      });
    });
  }

  public async list(): Promise<IConsulta[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM consultas ORDER BY data_consulta DESC`;
      this.db.all(sql, [], (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const consultas = rows.map(row => ({
            id: row.id,
            animalId: row.animalId,
            data_consulta: row.data_consulta,
            motivo: row.motivo,
            observacoes: row.observacoes,
            encerrada: Boolean(row.encerrada)
          }));
          resolve(consultas);
        }
      });
    });
  }

  public async update(id: string, data: Partial<Omit<IConsulta, "id" | "animalId">>): Promise<IConsulta | undefined> {
    const existingConsulta = await this.read(id);
    if (!existingConsulta) return undefined;

    return new Promise((resolve, reject) => {
      const updates: string[] = [];
      const values: any[] = [];
      
      if (data.data_consulta !== undefined) {
        updates.push('data_consulta = ?');
        values.push(data.data_consulta);
      }
      if (data.motivo !== undefined) {
        updates.push('motivo = ?');
        values.push(data.motivo);
      }
      if (data.observacoes !== undefined) {
        updates.push('observacoes = ?');
        values.push(data.observacoes);
      }
      if (data.encerrada !== undefined) {
        updates.push('encerrada = ?');
        values.push(data.encerrada ? 1 : 0);
      }
      
      if (updates.length === 0) {
        resolve(existingConsulta);
        return;
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);

      const sql = `UPDATE consultas SET ${updates.join(', ')} WHERE id = ?`;
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

  /**
   * Remove consulta (hard delete, pois não há dependentes diretos).
   */
  public async delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM consultas WHERE id = ?`;
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
   * Lista consultas de um Animal.
   */
  public async listByAnimal(animalId: string): Promise<IConsulta[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM consultas WHERE animalId = ? ORDER BY data_consulta DESC`;
      this.db.all(sql, [animalId], (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const consultas = rows.map(row => ({
            id: row.id,
            animalId: row.animalId,
            data_consulta: row.data_consulta,
            motivo: row.motivo,
            observacoes: row.observacoes,
            encerrada: Boolean(row.encerrada)
          }));
          resolve(consultas);
        }
      });
    });
  }
}
