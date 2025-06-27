import { BaseCrudController } from "./BaseCrudController";
import { ITutor } from "../models/interfaces";
import { TutorModel } from "../models/Tutor";

type CreateTutorDTO = Omit<ITutor, "id" | "ativo"> & {
  endereco?: string; // Torna endereco opcional no DTO de criação
};
type UpdateTutorDTO = Partial<Omit<ITutor, "id" | "ativo">>;

export class TutorController extends BaseCrudController<ITutor, CreateTutorDTO, UpdateTutorDTO> {
    protected model = new TutorModel();

    /**
     * Inativa tutor (soft delete).
     * @param id ID do Tutor
     * @param hasAnimalsFn Função para verificar dependência
     */
    public async inactivate(id: string, hasAnimalsFn: (tutorId: string) => Promise<boolean>): Promise<{ success: boolean; error?: string }> {
        if (!id) return { success: false, error: "Invalid id" };
        try {
            const ok = await this.model.inactivate(id, hasAnimalsFn);
            if (!ok) return { success: false, error: "Cannot inactivate: tutor not found or has animals" };
            return { success: true };
        } catch (error) {
            return { success: false, error: `Inactivation failed: ${error}` };
        }
    }

    /**
     * Remove tutor definitivamente (hard delete).
     * @param id ID do Tutor
     * @param hasAnimalsFn Função para verificar dependência
     */
    public async delete(id: string, hasAnimalsFn: (tutorId: string) => Promise<boolean>): Promise<{ success: boolean; error?: string }> {
        if (!id) return { success: false, error: "Invalid id" };
        try {
            const ok = await this.model.delete(id, hasAnimalsFn);
            if (!ok) return { success: false, error: "Cannot delete: tutor not found or has animals" };
            return { success: true };
        } catch (error) {
            return { success: false, error: `Deletion failed: ${error}` };
        }
    }
}
