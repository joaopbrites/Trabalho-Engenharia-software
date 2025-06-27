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

    public async create(data: CreateAnimalDTO, tutorExistsFn: (id: string) => Promise<boolean>): Promise<IAnimal | { error: string }> {
        if (!data || !data.tutorId) return { error: "Missing tutorId" };
        try {
            const tutorExists = await tutorExistsFn(data.tutorId);
            if (!tutorExists) return { error: "Tutor does not exist" };
            const result = await this.model.create(data, tutorExistsFn);
            if (!result) return { error: "Creation failed" };
            return result;
        } catch (error) {
            return { error: `Creation failed: ${error}` };
        }
    }

    public async list(): Promise<IAnimal[]> {
        try {
            const animals = await super.list();
            return this.filterStrategy ? this.filterStrategy.filter(animals) : animals;
        } catch (error) {
            console.error('List failed:', error);
            return [];
        }
    }

    public async listByTutor(tutorId: string): Promise<IAnimal[] | { error: string }> {
        if (!tutorId) return { error: "Missing tutorId" };
        try {
            return await this.model.listByTutor(tutorId) || [];
        } catch (error) {
            return { error: `List by tutor failed: ${error}` };
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
}
