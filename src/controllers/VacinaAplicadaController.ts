import { VacinaAplicadaModel, IVacinaAplicada } from "../models/Vacina";

type CreateVacinaDTO = Omit<IVacinaAplicada, "id">;
type UpdateVacinaDTO = Partial<Omit<IVacinaAplicada, "id" | "animalId" | "consultaId">>;

export class VacinaAplicadaController {
    private model: VacinaAplicadaModel;

    constructor(model?: VacinaAplicadaModel) {
        this.model = model ?? new VacinaAplicadaModel();
    }

    public create(
        data: CreateVacinaDTO,
        animalExistsFn: (id: string) => boolean,
        consultaExistsFn: (id: string) => boolean
    ): IVacinaAplicada | { error: string } {
        if (!data || !data.animalId || !data.consultaId || !data.nome_vacina || !data.data_aplicacao) {
            return { error: "Dados obrigatórios ausentes" };
        }
        if (!animalExistsFn(data.animalId)) return { error: "Animal não existe" };
        if (!consultaExistsFn(data.consultaId)) return { error: "Consulta não existe" };
        const vacina = this.model.create(data, animalExistsFn, consultaExistsFn);
        if (!vacina) return { error: "Não foi possível cadastrar vacina" };
        return vacina;
    }

    public read(id: string): IVacinaAplicada | { error: string } {
        if (!id) return { error: "Id ausente" };
        const vacina = this.model.read(id);
        if (!vacina) return { error: "VacinaAplicada não encontrada" };
        return vacina;
    }

    public list(): IVacinaAplicada[] {
        return this.model.list();
    }

    public update(id: string, data: UpdateVacinaDTO): IVacinaAplicada | { error: string } {
        if (!id) return { error: "Id ausente" };
        const updated = this.model.update(id, data);
        if (!updated) return { error: "Vacina não encontrada ou não atualizada" };
        return updated;
    }

    public delete(id: string): { success: boolean; error?: string } {
        if (!id) return { success: false, error: "Id ausente" };
        const ok = this.model.delete(id);
        if (!ok) return { success: false, error: "Vacina não encontrada" };
        return { success: true };
    }

    public listByAnimal(animalId: string): IVacinaAplicada[] | { error: string } {
        if (!animalId) return { error: "animalId ausente" };
        return this.model.listByAnimal(animalId);
    }
}
