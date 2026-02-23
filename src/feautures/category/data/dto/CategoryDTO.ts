import type {Models} from "appwrite";

export interface CategoryDTO extends Models.Document {
    name: string
    photoUrl?: string | null
    $createdAt: string
    $updatedAt: string
}