import type {ProductDTO} from "../dto/ProductDTO";
import type {Product} from "../../domain/entity/Product";

/**
 * DTO → Domain
 */
export function productFromDTO(dto: ProductDTO): Product {
    return {
        id: dto.$id,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        photoUrl: dto.photoUrl,
        categoryId: dto.categoryId,
        rating: dto.rating ?? 0
    }
}

/**
 * Domain → DTO (para crear o actualizar)
 */
export function productToDTO(product: Product): Omit<ProductDTO, "$createdAt" | "$updatedAt"> {
    return {
        $id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        photoUrl: product.photoUrl,
        categoryId: product.categoryId,
        rating: product.rating
    }
}