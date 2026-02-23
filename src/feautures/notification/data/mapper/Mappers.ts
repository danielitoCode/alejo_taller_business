import type {PromotionDTO} from "../dto/PromotionDTO";
import type {Promotion} from "../../domain/entity/Promotion";

export function promotionFromDTO(dto: PromotionDTO): Promotion {
    return {
        id: dto.$id,
        title: dto.title,
        message: dto.message,
        imageUrl: dto.imageUrl ?? null,
        oldPrice: dto.oldPrice ?? null,
        currentPrice: dto.currentPrice ?? null,
        validFromEpochMillis: dto.validFromEpochMillis,
        validUntilEpochMillis: dto.validUntilEpochMillis
    }
}

export function promotionToDTO(promotion: Promotion) {
    return {
        $id: promotion.id,
        title: promotion.title,
        message: promotion.message,
        imageUrl: promotion.imageUrl ?? null,
        oldPrice: promotion.oldPrice ?? null,
        currentPrice: promotion.currentPrice ?? null,
        validFromEpochMillis: promotion.validFromEpochMillis,
        validUntilEpochMillis: promotion.validUntilEpochMillis
    }
}