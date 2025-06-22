export abstract class BaseCrudController<T, CreateDTO, UpdateDTO> {
    protected abstract model: any;

    public create(data: CreateDTO, ...args: any[]): T | { error: string } {
        if (!this.validateCreate(data, ...args)) return { error: "Invalid data" };
        const result = this.model.create(data, ...args);
        if (!result) return { error: "Creation failed" };
        return result;
    }

    public read(id: string): T | { error: string } {
        if (!id) return { error: "Invalid id" };
        const result = this.model.read(id);
        if (!result) return { error: "Not found" };
        return result;
    }

    public list(...args: any[]): T[] {
        return this.model.list(...args) || [];
    }

    public update(id: string, data: UpdateDTO): T | { error: string } {
        if (!id || !this.validateUpdate(data)) return { error: "Invalid data" };
        const result = this.model.update(id, data);
        if (!result) return { error: "Update failed" };
        return result;
    }

    protected validateCreate(data: CreateDTO, ...args: any[]): boolean {
        return !!data;
    }

    protected validateUpdate(data: UpdateDTO): boolean {
        return !!data;
    }
}
