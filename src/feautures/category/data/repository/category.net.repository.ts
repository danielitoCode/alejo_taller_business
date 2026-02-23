import {infrastructureContainer} from "../../../../infrastructure/di/infrastructure.container";
import type {CategoryDTO} from "../dto/CategoryDTO";
import type {Databases, Models} from "appwrite";
import {ID} from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = "categories"

export class CategoryNetRepository {
    constructor(private readonly databases: Databases) {}

    async getAll(): Promise<CategoryDTO[]> {
        const response = await this.databases.listDocuments<CategoryDTO>(
            DATABASE_ID,
            COLLECTION_ID
        )

        return response.documents
    }

    async create(
        data: Omit<CategoryDTO, keyof Models.Document>
    ): Promise<CategoryDTO> {
        return await this.databases.createDocument<CategoryDTO>(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            data
        )
    }
}