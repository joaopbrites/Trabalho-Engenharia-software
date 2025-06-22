import { ConsultaModel, IConsulta } from "../models/Consulta";

type CreateConsultaDTO = Omit<IConsulta, "id" | "encerrada">;
type UpdateConsultaDTO = Partial<Omit<IConsulta, "id" | "animalId">>;

export class ConsultaController {
    private model: ConsultaModel;

    constructor(model?: ConsultaModel) {
        this.model = model ?? new ConsultaModel();
    }

    public create(
        data: CreateConsultaDTO,
        animalExistsFn: (id: string) => boolean
    ): IConsulta | { error: string } {
        if (!data || !data.animalId || !data.data) return { error: "Dados obrigatórios ausentes" };
        if (!animalExistsFn(data.animalId)) return { error: "Animal não existe" };
        const consulta = this.model.create(data, animalExistsFn);
        if (!consulta) return { error: "Não foi possível criar consulta" };
        return consulta;
    }

    public read(id: string): IConsulta | { error: string } {
        if (!id) return { error: "Id ausente" };
        const consulta = this.model.read(id);
        if (!consulta) return { error: "Consulta não encontrada" };
        return consulta;
    }

    public list(): IConsulta[] {
        return this.model.list();
    }

    public update(id: string, data: UpdateConsultaDTO): IConsulta | { error: string } {
        if (!id) return { error: "Id ausente" };
        const updated = this.model.update(id, data);
        if (!updated) return { error: "Consulta não encontrada ou não atualizada" };
        return updated;
    }

    public delete(id: string): { success: boolean; error?: string } {
        if (!id) return { success: false, error: "Invalid id" };
        const ok = this.model.delete(id);
        if (!ok) return { success: false, error: "Not found" };
        return { success: true };
    }

    public listByAnimal(animalId: string): IConsulta[] | { error: string } {
        if (!animalId) return { error: "animalId ausente" };
        return this.model.listByAnimal(animalId);
    }
}
