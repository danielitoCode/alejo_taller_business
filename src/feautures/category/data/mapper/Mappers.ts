import type {CategoryDTO} from "../dto/CategoryDTO";
import type {Category} from "../../domain/entity/Category";

export function categoryFromDTO(dto: CategoryDTO): Category {
    return {
        id: dto.$id,
        name: dto.name,
        photoUrl: dto.photoUrl ?? null
    }
}

export function categoryToDTO(category: Category) {
    return {
        $id: category.id,
        name: category.name,
        photoUrl: category.photoUrl ?? null
    }
}