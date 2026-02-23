import type {CategoryRepository} from "../../domain/repository/CategoryRepository";
import {CategoryNetRepository} from "./category.net.repository";
import type {Category} from "../../domain/entity/Category";
import {db} from "../../../../infrastructure/di/dexie.db";
import {categoryFromDTO, categoryToDTO} from "../mapper/Mappers";

export class CategoryOfflineFirstRepository implements CategoryRepository {
    constructor(private readonly net: CategoryNetRepository) {}

    async getAll(): Promise<Category[]> {
        try {
            const remote = await this.net.getAll()
            await db.categories.bulkPut(remote)
            return remote.map(categoryFromDTO)
        } catch {
            const local = await db.categories.toArray()
            return local.map(categoryFromDTO)
        }
    }

    async create(category: Category): Promise<Category> {
        try {
            const created = await this.net.create({
                name: category.name,
                photoUrl: category.photoUrl ?? null
            })
            await db.categories.put(created)
            return categoryFromDTO(created)
        } catch {
            const localDTO = categoryToDTO(category)
            await db.categories.put({
                ...localDTO,
                $collectionId: "",
                $databaseId: "",
                $createdAt: new Date().toISOString(),
                $updatedAt: new Date().toISOString(),
                $permissions: [],
                $sequence: 0
            })
            return category
        }
    }

    async sync(): Promise<void> {
        const remote = await this.net.getAll()
        await db.categories.clear()
        await db.categories.bulkPut(remote)
    }
}