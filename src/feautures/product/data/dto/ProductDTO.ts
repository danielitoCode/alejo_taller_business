import type {Models} from "appwrite";

export interface ProductDTO extends Models.Document {
    name: string
    description: string
    price: number
    photoUrl: string
    categoryId: string
    rating?: number
}