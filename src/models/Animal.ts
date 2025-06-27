// models/Animal.ts

import type { ITutor } from "./Tutor";
import crypto from 'crypto';
import DatabaseManager from '../config/database';

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
 * CRUD e armazenamento em SQLite de Animal.
 */
export class AnimalModel {
  private db = DatabaseManager.getInstance().getDatabase();

  /**
   * Cria novo Animal.
   * @param data Dados do animal (exceto ID)
   * @param tutorExistsFn Função que valida existência do tutor
   * @returns Promise com Animal criado ou undefined se Tutor não existir
   */
  public async create(data: Omit<IAnimal, "id" | "ativo">, tutorExistsFn: (id: string) => Promise<boolean>): Promise<IAnimal | undefined> {
    const tutorExists = await tutorExistsFn(data.tutorId);
    if (!tutorExists) return undefined;
    
    const id = crypto.randomUUID();
    const animal: IAnimal = { ...data, id, ativo: true };
    
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO animais (id, nome, especie, sexo, tutorId, ativo) VALUES (?, ?, ?, ?, ?, ?)`;
      this.db.run(sql, [id, data.nome, data.especie, data.sexo, data.tutorId, 1], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(animal);
        }
      });
    });
  }

  /**
   * Consulta Animal por ID.
   */
  public async read(id: string): Promise<IAnimal | undefined> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM animais WHERE id = ?`;
      this.db.get(sql, [id], (err, row: any) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            resolve({
              id: row.id,
              nome: row.nome,
              especie: row.especie,
              sexo: row.sexo,
              tutorId: row.tutorId,
              ativo: Boolean(row.ativo)
            });
          } else {
            resolve(undefined);
          }
        }
      });
    });
  }

  /**
   * Lista todos os Animais.
   */
  public async list(): Promise<IAnimal[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM animais ORDER BY nome`;
      this.db.all(sql, [], (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const animais = rows.map(row => ({
            id: row.id,
            nome: row.nome,
            especie: row.especie,
            sexo: row.sexo,
            tutorId: row.tutorId,
            ativo: Boolean(row.ativo)
          }));
          resolve(animais);
        }
      });
    });
  }

  /**
   * Atualiza Animal.
   * @param id ID
   * @param data Campos a atualizar
   */
  public async update(id: string, data: Partial<Omit<IAnimal, "id" | "tutorId" | "ativo">>): Promise<IAnimal | undefined> {
    const existingAnimal = await this.read(id);
    if (!existingAnimal) return undefined;

    return new Promise((resolve, reject) => {
      const updates: string[] = [];
      const values: any[] = [];
      
      if (data.nome !== undefined) {
        updates.push('nome = ?');
        values.push(data.nome);
      }
      if (data.especie !== undefined) {
        updates.push('especie = ?');
        values.push(data.especie);
      }
      if (data.sexo !== undefined) {
        updates.push('sexo = ?');
        values.push(data.sexo);
      }
      
      if (updates.length === 0) {
        resolve(existingAnimal);
        return;
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);

      const sql = `UPDATE animais SET ${updates.join(', ')} WHERE id = ?`;
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
   * Remove Animal (hard delete).
   * @param id Animal
   */
  public async delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM animais WHERE id = ?`;
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
   * Inativa Animal (soft delete).
   * @param id Animal
   */
  public async inactivate(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE animais SET ativo = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
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
   * Lista animais por Tutor.
   */
  public async listByTutor(tutorId: string): Promise<IAnimal[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM animais WHERE tutorId = ? AND ativo = 1 ORDER BY nome`;
      this.db.all(sql, [tutorId], (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const animais = rows.map(row => ({
            id: row.id,
            nome: row.nome,
            especie: row.especie,
            sexo: row.sexo,
            tutorId: row.tutorId,
            ativo: Boolean(row.ativo)
          }));
          resolve(animais);
        }
      });
    });
  }
}
