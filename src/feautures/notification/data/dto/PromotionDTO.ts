export interface PromotionDTO {
    $id: string
    title: string
    message: string
    imageUrl?: string | null
    oldPrice?: number | null
    currentPrice?: number | null
    validFromEpochMillis: number
    validUntilEpochMillis: number
    $createdAt: string
    $updatedAt: string
}