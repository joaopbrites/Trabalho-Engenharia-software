export abstract class BaseCrudController<T, CreateDTO, UpdateDTO> {
    protected abstract model: any;

    public async create(data: CreateDTO, ...args: any[]): Promise<T | { error: string }> {
        if (!this.validateCreate(data, ...args)) return { error: "Invalid data" };
        try {
            const result = await this.model.create(data, ...args);
            if (!result) return { error: "Creation failed" };
            return result;
        } catch (error) {
            return { error: `Creation failed: ${error}` };
        }
    }

    public async read(id: string): Promise<T | { error: string }> {
        if (!id) return { error: "Invalid id" };
        try {
            const result = await this.model.read(id);
            if (!result) return { error: "Not found" };
            return result;
        } catch (error) {
            return { error: `Read failed: ${error}` };
        }
    }

    public async list(...args: any[]): Promise<T[]> {
        try {
            return await this.model.list(...args) || [];
        } catch (error) {
            console.error('List failed:', error);
            return [];
        }
    }

    public async update(id: string, data: UpdateDTO): Promise<T | { error: string }> {
        if (!id || !this.validateUpdate(data)) return { error: "Invalid data" };
        try {
            const result = await this.model.update(id, data);
            if (!result) return { error: "Update failed" };
            return result;
        } catch (error) {
            return { error: `Update failed: ${error}` };
        }
    }

    protected validateCreate(data: CreateDTO, ...args: any[]): boolean {
        return !!data;
    }

    protected validateUpdate(data: UpdateDTO): boolean {
        return !!data;
    }
}
