import crypto from 'crypto';

export interface ITutor {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  ativo: boolean; // usado para "inativar" sem deletar hard
}

/**
 * CRUD e armazenamento em memória de Tutor.
 */
export class TutorModel {
  private tutors: Map<string, ITutor> = new Map();

  /**
   * Cria novo Tutor.
   * @param data Objeto com dados do tutor (exceto ID).
   * @returns Tutor criado (com ID).
   */
  public create(data: Omit<ITutor, "id" | "ativo">): ITutor {
    const id = crypto.randomUUID();
    const tutor: ITutor = { ...data, id, ativo: true };
    this.tutors.set(id, tutor);
    return tutor;
  }

  /**
   * Consulta Tutor por ID.
   * @param id ID do Tutor
   * @returns Tutor ou undefined
   */
  public read(id: string): ITutor | undefined {
    return this.tutors.get(id);
  }

  /**
   * Lista todos os Tutores.
   * @returns Array de Tutores
   */
  public list(): ITutor[] {
    return Array.from(this.tutors.values());
  }

  /**
   * Atualiza dados de Tutor.
   * @param id ID do Tutor
   * @param data Campos a atualizar
   * @returns Tutor atualizado ou undefined
   */
  public update(id: string, data: Partial<Omit<ITutor, "id" | "ativo">>): ITutor | undefined {
    const tutor = this.tutors.get(id);
    if (!tutor) return undefined;
    const updated = { ...tutor, ...data };
    this.tutors.set(id, updated);
    return updated;
  }

  /**
   * Inativa Tutor (soft delete). Só permite se não houver Animais ativos.
   * @param id ID do Tutor
   * @param hasAnimalsFn Função para verificar se tutor possui animais vinculados.
   * @returns true se inativado, false se bloqueado por dependência.
   */
  public inactivate(id: string, hasAnimalsFn: (tutorId: string) => boolean): boolean {
    const tutor = this.tutors.get(id);
    if (!tutor || !tutor.ativo) return false;
    if (hasAnimalsFn(id)) return false; // Não pode inativar se há animais
    this.tutors.set(id, { ...tutor, ativo: false });
    return true;
  }

  /**
   * Remove Tutor definitivamente (hard delete). Só permite se não houver Animais vinculados.
   * @param id ID do Tutor
   * @param hasAnimalsFn Função para verificar se tutor possui animais vinculados.
   * @returns true se removido, false se bloqueado por dependência ou não existe.
   */
  public delete(id: string, hasAnimalsFn: (tutorId: string) => boolean): boolean {
    const tutor = this.tutors.get(id);
    if (!tutor) return false;
    if (hasAnimalsFn(id)) return false; // Não pode remover se há animais
    return this.tutors.delete(id);
  }
}
