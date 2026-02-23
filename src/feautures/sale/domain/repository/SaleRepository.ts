import type {Sale} from "../entity/Sale";

export interface SaleRepository {
    create(sale: Sale): Promise<Sale>

    getByUser(userId: string): Promise<Sale[]>
}