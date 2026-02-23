import {container} from "../../../../infrastructure/di/container";
import type {PromotionDTO} from "../dto/PromotionDTO";
import {Query} from "appwrite";


const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = "promotions"

export class PromotionNetRepository {
    private databases = container.appwrite.databases

    async getAll(): Promise<PromotionDTO[]> {
        const response = await this.databases.listDocuments<PromotionDTO>(
            DATABASE_ID,
            COLLECTION_ID
        )

        return response.documents
    }

    async getActive(now: number): Promise<PromotionDTO[]> {
        const response = await this.databases.listDocuments<PromotionDTO>(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.lessThanEqual("validFromEpochMillis", now),
                Query.greaterThanEqual("validUntilEpochMillis", now)
            ]
        )

        return response.documents
    }
}