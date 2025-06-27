import { VacinaAplicadaModel, IVacinaAplicada } from "../models/Vacina";

type CreateVacinaDTO = Omit<IVacinaAplicada, "id">;
type UpdateVacinaDTO = Partial<Omit<IVacinaAplicada, "id" | "animalId" | "consultaId">>;

export class VacinaAplicadaController {
    private model: VacinaAplicadaModel;

    constructor(model?: VacinaAplicadaModel) {
        this.model = model ?? new VacinaAplicadaModel();
    }

    public async create(
        data: CreateVacinaDTO,
        animalExistsFn: (id: string) => Promise<boolean>,
        consultaExistsFn: (id: string) => Promise<boolean>
    ): Promise<IVacinaAplicada | { error: string }> {
        if (!data || !data.animalId || !data.consultaId || !data.nome_vacina || !data.data_aplicacao) {
            return { error: "Dados obrigatórios ausentes" };
        }
        try {
            const animalExists = await animalExistsFn(data.animalId);
            const consultaExists = await consultaExistsFn(data.consultaId);
            if (!animalExists) return { error: "Animal não existe" };
            if (!consultaExists) return { error: "Consulta não existe" };
            const vacina = await this.model.create(data, animalExistsFn, consultaExistsFn);
            if (!vacina) return { error: "Não foi possível cadastrar vacina" };
            return vacina;
        } catch (error) {
            return { error: `Creation failed: ${error}` };
        }
    }

    public async read(id: string): Promise<IVacinaAplicada | { error: string }> {
        if (!id) return { error: "Id ausente" };
        try {
            const vacina = await this.model.read(id);
            if (!vacina) return { error: "VacinaAplicada não encontrada" };
            return vacina;
        } catch (error) {
            return { error: `Read failed: ${error}` };
        }
    }

    public async list(): Promise<IVacinaAplicada[]> {
        try {
            return await this.model.list();
        } catch (error) {
            console.error('List failed:', error);
            return [];
        }
    }

    public async update(id: string, data: UpdateVacinaDTO): Promise<IVacinaAplicada | { error: string }> {
        if (!id) return { error: "Id ausente" };
        try {
            const updated = await this.model.update(id, data);
            if (!updated) return { error: "Vacina não encontrada ou não atualizada" };
            return updated;
        } catch (error) {
            return { error: `Update failed: ${error}` };
        }
    }

    public async delete(id: string): Promise<{ success: boolean; error?: string }> {
        if (!id) return { success: false, error: "Id ausente" };
        try {
            const ok = await this.model.delete(id);
            if (!ok) return { success: false, error: "Vacina não encontrada" };
            return { success: true };
        } catch (error) {
            return { success: false, error: `Deletion failed: ${error}` };
        }
    }

    public async listByAnimal(animalId: string): Promise<IVacinaAplicada[] | { error: string }> {
        if (!animalId) return { error: "animalId ausente" };
        try {
            return await this.model.listByAnimal(animalId);
        } catch (error) {
            return { error: `List by animal failed: ${error}` };
        }
    }
}
