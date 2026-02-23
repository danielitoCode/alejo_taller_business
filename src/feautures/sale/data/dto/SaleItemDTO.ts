import type {Models} from "appwrite";

export interface SaleItemDTO extends Models.Document{
    productId: string
    quantity: number
    price: number
}