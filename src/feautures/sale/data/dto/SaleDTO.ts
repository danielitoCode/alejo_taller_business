import type {SaleItemDTO} from "./SaleItemDTO";

export interface SaleDTO {
    $id: string
    date: string
    amount: number
    verified: string
    products: SaleItemDTO[]
    userId: string
    deliveryType?: string | null
    $createdAt: string
    $updatedAt: string
}