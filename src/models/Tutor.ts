import crypto from 'crypto';
import DatabaseManager from '../config/database';

export interface ITutor {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  ativo: boolean; // usado para "inativar" sem deletar hard
}

/**
 * CRUD e armazenamento em SQLite de Tutor.
 */
export class TutorModel {
  private db = DatabaseManager.getInstance().getDatabase();

  /**
   * Cria novo Tutor.
   * @param data Objeto com dados do tutor (exceto ID).
   * @returns Promise com Tutor criado (com ID).
   */
  public async create(data: Omit<ITutor, "id" | "ativo"> & { endereco?: string }): Promise<ITutor> {
    const id = crypto.randomUUID();
    // Garante que endereco tenha um valor padrão se não fornecido
    const endereco = data.endereco || '';
    const tutor: ITutor = { ...data, endereco, id, ativo: true };
    
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO tutores (id, nome, telefone, email, endereco, ativo) VALUES (?, ?, ?, ?, ?, ?)`;
      this.db.run(sql, [id, data.nome, data.telefone, data.email, endereco, 1], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(tutor);
        }
      });
    });
  }

  /**
   * Consulta Tutor por ID.
   * @param id ID do Tutor
   * @returns Promise com Tutor ou undefined
   */
  public async read(id: string): Promise<ITutor | undefined> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM tutores WHERE id = ?`;
      this.db.get(sql, [id], (err, row: any) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            resolve({
              id: row.id,
              nome: row.nome,
              telefone: row.telefone,
              email: row.email,
              endereco: row.endereco,
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
   * Lista todos os Tutores.
   * @returns Promise com Array de Tutores
   */
  public async list(): Promise<ITutor[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM tutores ORDER BY nome`;
      this.db.all(sql, [], (err, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          const tutores = rows.map(row => ({
            id: row.id,
            nome: row.nome,
            telefone: row.telefone,
            email: row.email,
            endereco: row.endereco,
            ativo: Boolean(row.ativo)
          }));
          resolve(tutores);
        }
      });
    });
  }

  /**
   * Atualiza dados de Tutor.
   * @param id ID do Tutor
   * @param data Campos a atualizar
   * @returns Promise com Tutor atualizado ou undefined
   */
  public async update(id: string, data: Partial<Omit<ITutor, "id" | "ativo">>): Promise<ITutor | undefined> {
    const existingTutor = await this.read(id);
    if (!existingTutor) return undefined;

    return new Promise((resolve, reject) => {
      const updates: string[] = [];
      const values: any[] = [];
      
      if (data.nome !== undefined) {
        updates.push('nome = ?');
        values.push(data.nome);
      }
      if (data.telefone !== undefined) {
        updates.push('telefone = ?');
        values.push(data.telefone);
      }
      if (data.email !== undefined) {
        updates.push('email = ?');
        values.push(data.email);
      }
      if (data.endereco !== undefined) {
        updates.push('endereco = ?');
        values.push(data.endereco);
      }
      
      if (updates.length === 0) {
        resolve(existingTutor);
        return;
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);

      const sql = `UPDATE tutores SET ${updates.join(', ')} WHERE id = ?`;
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
   * Inativa Tutor (soft delete). Só permite se não houver Animais ativos.
   * @param id ID do Tutor
   * @param hasAnimalsFn Função para verificar se tutor possui animais vinculados.
   * @returns Promise com true se inativado, false se bloqueado por dependência.
   */
  public async inactivate(id: string, hasAnimalsFn: (tutorId: string) => Promise<boolean>): Promise<boolean> {
    const tutor = await this.read(id);
    if (!tutor || !tutor.ativo) return false;
    
    const hasAnimals = await hasAnimalsFn(id);
    if (hasAnimals) return false; // Não pode inativar se há animais

    return new Promise((resolve, reject) => {
      const sql = `UPDATE tutores SET ativo = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
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
   * Remove Tutor definitivamente (hard delete). Só permite se não houver Animais vinculados.
   * @param id ID do Tutor
   * @param hasAnimalsFn Função para verificar se tutor possui animais vinculados.
   * @returns Promise com true se removido, false se bloqueado por dependência ou não existe.
   */
  public async delete(id: string, hasAnimalsFn: (tutorId: string) => Promise<boolean>): Promise<boolean> {
    const tutor = await this.read(id);
    if (!tutor) return false;
    
    const hasAnimals = await hasAnimalsFn(id);
    if (hasAnimals) return false; // Não pode remover se há animais

    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM tutores WHERE id = ?`;
      this.db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }
}
