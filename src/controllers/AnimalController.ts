import { BaseCrudController } from "./BaseCrudController";
import { IAnimal } from "../models/interfaces";
import { AnimalModel } from "../models/Animal";

type CreateAnimalDTO = Omit<IAnimal, "id" | "ativo">;
type UpdateAnimalDTO = Partial<Omit<IAnimal, "id" | "tutorId" | "ativo">>;

export interface AnimalFilterStrategy {
    filter(animals: IAnimal[]): IAnimal[];
}

export class AnimalController extends BaseCrudController<IAnimal, CreateAnimalDTO, UpdateAnimalDTO> {
    protected model = new AnimalModel();
    private filterStrategy?: AnimalFilterStrategy;

    public setFilterStrategy(strategy: AnimalFilterStrategy): void {
        this.filterStrategy = strategy;
    }

    public create(data: CreateAnimalDTO, tutorExistsFn: (id: string) => boolean): IAnimal | { error: string } {
        if (!data || !data.tutorId) return { error: "Missing tutorId" };
        if (!tutorExistsFn(data.tutorId)) return { error: "Tutor does not exist" };
        const result = this.model.create(data, tutorExistsFn);
        if (!result) return { error: "Creation failed" };
        return result;
    }

    public list(): IAnimal[] {
        const animals = super.list();
        return this.filterStrategy ? this.filterStrategy.filter(animals) : animals;
    }


    public listByTutor(tutorId: string): IAnimal[] | { error: string } {
        if (!tutorId) return { error: "Missing tutorId" };
        return this.model.listByTutor(tutorId) || [];
    }
    public delete(id: string): { success: boolean; error?: string } {
        if (!id) return { success: false, error: "Invalid id" };
        const ok = this.model.delete(id);
        if (!ok) return { success: false, error: "Not found" };
        return { success: true };
    }

}
