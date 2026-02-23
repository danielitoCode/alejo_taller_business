import type {Models} from "appwrite";

export interface ProductDTO extends Models.Document {
    id: string
    name: string
    description: string
    price: number
    photoUrl: string
    categoryId: string
    rating?: number
}