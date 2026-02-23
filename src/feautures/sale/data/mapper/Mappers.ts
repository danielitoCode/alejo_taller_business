import type {SaleDTO} from "../dto/SaleDTO";
import type {Sale} from "../../domain/entity/Sale";
import {type BuyState, DeliveryType} from "../../domain/entity/enums";

export function saleFromDTO(dto: SaleDTO): Sale {
    return {
        id: dto.$id,
        date: dto.date,
        amount: dto.amount,
        verified: dto.verified as BuyState,
        products: dto.products,
        userId: dto.userId,
        deliveryType: dto.deliveryType
            ? (dto.deliveryType as DeliveryType)
            : null
    }
}

export function saleToDTO(sale: Sale) {
    return {
        $id: sale.id,
        date: sale.date,
        amount: sale.amount,
        verified: sale.verified,
        products: sale.products,
        userId: sale.userId,
        deliveryType: sale.deliveryType ?? null
    }
}