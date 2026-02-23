import Dexie, {type Table} from "dexie";
import type {ProductDTO} from "../../feautures/product/data/dto/ProductDTO";
import type {CategoryDTO} from "../../feautures/category/data/dto/CategoryDTO";
import type {PromotionDTO} from "../../feautures/notification/data/dto/PromotionDTO";
import type {SaleDTO} from "../../feautures/sale/data/dto/SaleDTO";

class AppDatabase extends Dexie {
    products!: Table<ProductDTO>
    categories!: Table<CategoryDTO>
    promotions!: Table<PromotionDTO>
    sales!: Table<SaleDTO>

    constructor() {
        super("alejo-taller-business-db")

        this.version(1).stores({
            products: "$id, name, categoryId",
            categories: "$id, name",
            promotions: "$id, validUntilEpochMillis",
            sales: "$id, userId, verified"
        })
    }
}

export const db = new AppDatabase()