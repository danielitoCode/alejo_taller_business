export interface ProductDTO {
    $id: string
    name: string
    description: string
    price: number
    photoUrl: string
    categoryId: string
    rating?: number
    $createdAt: string
    $updatedAt: string
}