import type {Category} from "../entity/Category";

export interface CategoryRepository {
    getAll(): Promise<Category[]>

    create(category: Category): Promise<Category>
}