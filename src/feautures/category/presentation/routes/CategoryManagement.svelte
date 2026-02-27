<script lang="ts">
    import { onMount } from "svelte";
    import { categoryStore } from "../viewmodel/category.store";
    import type {Category} from "../../domain/entity/Category";

    let name = "";

    onMount(() => { categoryStore.syncAll().catch(() => {}); });

    async function add() {
        if (!name.trim()) return;
        await categoryStore.create({ id: `c-${Math.random().toString(36).slice(2, 8)}`, name: name.trim(), photoUrl: null });
        name = "";
    }

    function handleCategoryRename(category: Category, event: Event) {
        const input = event.currentTarget as HTMLInputElement | null;
        if (!input) return;
        categoryStore.updateById(category.id, { ...category, name: input.value });
    }
</script>

<section class="card">
    <h2>Gestión de categorías</h2>
    <div class="form"><input bind:value={name} placeholder="Nueva categoría"/><button on:click={add}>Agregar</button></div>
    {#each $categoryStore.items as category}
        <article>
            <input value={category.name} on:change={(event) => handleCategoryRename(category, event)} />
            <button on:click={() => categoryStore.removeById(category.id)}>Eliminar</button>
        </article>
    {/each}
</section>
<style>.card{display:grid;gap:10px}.form,article{display:flex;gap:8px;flex-wrap:wrap}article{border:1px solid var(--md-sys-color-outline-variant);padding:8px;border-radius:12px}</style>