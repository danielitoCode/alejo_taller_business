import type {CategoryDTO} from "../dto/CategoryDTO";
import type {Category} from "../../domain/entity/Category";

export type CategoryWriteDTO = Pick<CategoryDTO, "$id" | "name" | "photoUrl">;

export function categoryFromDTO(dto: CategoryDTO): Category {
    return {
        id: dto.$id,
        name: dto.name,
        photoUrl: dto.photoUrl ?? null,
    };
}

/**
 * Domain → DTO (create/update payload)
 * El id de dominio se serializa en $id de Appwrite.
 */
export function categoryToDTO(category: Category): CategoryWriteDTO {
    return {
        $id: category.id,
        name: category.name,
        photoUrl: category.photoUrl ?? null,
    };
}