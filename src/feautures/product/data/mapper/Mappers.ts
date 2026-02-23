import type {ProductDTO} from "../dto/ProductDTO";
import type {Product} from "../../domain/entity/Product";

export type ProductWriteDTO = Pick<
    ProductDTO,
    "$id" | "name" | "description" | "price" | "photoUrl" | "categoryId" | "rating"
>;

/**
 * DTO → Domain (create/update entity)
 * Se recupera el $id del proporcionado por AppWrite.
 */
export function productFromDTO(dto: ProductDTO): Product {
    return {
        id: dto.$id,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        photoUrl: dto.photoUrl,
        categoryId: dto.categoryId,
        rating: dto.rating ?? 0,
    };
}

/**
 * Domain → DTO (create/update payload)
 * El id de dominio se serializa en $id de Appwrite.
 */
export function productToDTO(product: Product): ProductWriteDTO {
    return {
        $id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        photoUrl: product.photoUrl,
        categoryId: product.categoryId,
        rating: product.rating,
    };
}