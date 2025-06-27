import { ConsultaModel, IConsulta } from "../models/Consulta";

type CreateConsultaDTO = Omit<IConsulta, "id" | "encerrada">;
type UpdateConsultaDTO = Partial<Omit<IConsulta, "id" | "animalId">>;

export class ConsultaController {
    private model: ConsultaModel;

    constructor(model?: ConsultaModel) {
        this.model = model ?? new ConsultaModel();
    }

    public async create(
        data: CreateConsultaDTO,
        animalExistsFn: (id: string) => Promise<boolean>
    ): Promise<IConsulta | { error: string }> {
        if (!data || !data.animalId || !data.data_consulta) return { error: "Dados obrigatórios ausentes" };
        try {
            const animalExists = await animalExistsFn(data.animalId);
            if (!animalExists) return { error: "Animal não existe" };
            const consulta = await this.model.create(data, animalExistsFn);
            if (!consulta) return { error: "Não foi possível criar consulta" };
            return consulta;
        } catch (error) {
            return { error: `Creation failed: ${error}` };
        }
    }

    public async read(id: string): Promise<IConsulta | { error: string }> {
        if (!id) return { error: "Id ausente" };
        try {
            const consulta = await this.model.read(id);
            if (!consulta) return { error: "Consulta não encontrada" };
            return consulta;
        } catch (error) {
            return { error: `Read failed: ${error}` };
        }
    }

    public async list(): Promise<IConsulta[]> {
        try {
            return await this.model.list();
        } catch (error) {
            console.error('List failed:', error);
            return [];
        }
    }

    public async update(id: string, data: UpdateConsultaDTO): Promise<IConsulta | { error: string }> {
        if (!id) return { error: "Id ausente" };
        try {
            const updated = await this.model.update(id, data);
            if (!updated) return { error: "Consulta não encontrada ou não atualizada" };
            return updated;
        } catch (error) {
            return { error: `Update failed: ${error}` };
        }
    }

    public async delete(id: string): Promise<{ success: boolean; error?: string }> {
        if (!id) return { success: false, error: "Invalid id" };
        try {
            const ok = await this.model.delete(id);
            if (!ok) return { success: false, error: "Not found" };
            return { success: true };
        } catch (error) {
            return { success: false, error: `Deletion failed: ${error}` };
        }
    }

    public async listByAnimal(animalId: string): Promise<IConsulta[] | { error: string }> {
        if (!animalId) return { error: "animalId ausente" };
        try {
            return await this.model.listByAnimal(animalId);
        } catch (error) {
            return { error: `List by animal failed: ${error}` };
        }
    }
}
