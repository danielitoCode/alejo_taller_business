
import type {ProductDTO} from "../dto/ProductDTO";
import {ID, Query} from "appwrite";
import {container} from "../../../../infrastructure/di/container";
import type {ProductWriteDTO} from "../mapper/Mappers";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = "products"

export class ProductNetRepository {
    private databases = container.appwrite.databases

    async getAll(): Promise<ProductDTO[]> {
        const response = await this.databases.listDocuments<ProductDTO>(
            DATABASE_ID,
            COLLECTION_ID
        )

        return response.documents
    }

    async getById(id: string): Promise<ProductDTO> {
        return await this.databases.getDocument<ProductDTO>(
            DATABASE_ID,
            COLLECTION_ID,
            id
        )
    }

    async update(id: string, data: Partial<ProductWriteDTO>): Promise<ProductDTO> {
        return await this.databases.updateDocument<ProductDTO>(
            DATABASE_ID,
            COLLECTION_ID,
            id,
            data
        )
    }

    async getByCategory(categoryId: string): Promise<ProductDTO[]> {
        const response = await this.databases.listDocuments<ProductDTO>(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("categoryId", categoryId)]
        )

        return response.documents
    }

    async create(product: ProductWriteDTO): Promise<ProductDTO> {
        return await this.databases.createDocument<ProductDTO>(
            DATABASE_ID,
            COLLECTION_ID,
            product.$id || ID.unique(),
            product
        )
    }

    async delete(id: string): Promise<void> {
        await this.databases.deleteDocument(
            DATABASE_ID,
            COLLECTION_ID,
            id
        )
    }
}