<script lang="ts">
    import { onMount } from "svelte";
    import { categoryStore } from "../viewmodel/category.store";
    import type {Category} from "../../domain/entity/Category";

    let name = "";

    let listCategoriasTest: Category[] = [
        {id:"cat1",name: "Cat-1"},
        {id:"cat2",name: "Cat-2"},
        {id:"cat3",name: "Cat-3"},
    ];

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
    <h4 class="media-title">Gestión de categorías</h4>
    <div class="form">
        <input bind:value={name} placeholder="Nueva categoría"/>
        <button class="btn btn-primary" on:click={add}>Agregar</button>
    </div>
    <!--{#each listCategoriasTest as category}-->
    {#each $categoryStore.items as category}
        <article>
            <input
                    value={category.name} on:change={(event) => handleCategoryRename(category, event)} />
            <button
                    class="btn btn-elevated"
                    on:click={()=>categoryStore.updateById(category.id, { ...category, name: category.name })}
            >Editar</button>
            <button
                    class="btn btn-elevated"
                    on:click={() => categoryStore.removeById(category.id)}>Eliminar</button>
        </article>
    {/each}
</section>
<style>
    h4 {
        margin: 0;
        font-size: clamp(2rem, 3.6vw, 2.4rem);
        line-height: 1.12;
    }

    .card{
        display:grid;
        gap:10px
    }

    input {
        border: 1px solid var(--md-sys-color-outline-variant);
        border-radius: 12px;
        padding: 0 12px;
        font: inherit;
        color: var(--md-sys-color-on-surface);
        background: color-mix(in srgb, var(--md-sys-color-surface) 88%, var(--md-sys-color-surface-variant));
    }

    .btn {
        height: 35px;
        border-radius: 16px;
        border: 0;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 120ms ease, box-shadow 180ms ease, background-color 180ms ease;
    }

    .btn:active { transform: translateY(1px); }

    .btn-primary {
        color: var(--md-sys-color-on-primary);
        background: var(--md-sys-color-primary);
        box-shadow: 0 8px 16px color-mix(in srgb, var(--md-sys-color-primary) 35%, transparent);
    }

    .btn-elevated {
        min-width: 90px;
        color: var(--md-sys-color-on-surface);
        background: var(--md-sys-color-surface);
        border: 1px solid var(--md-sys-color-outline-variant);
        box-shadow: 0 6px 14px color-mix(in srgb, var(--md-sys-color-outline) 24%, transparent);
    }

    .form,article{
        display:flex;
        gap:8px;
        flex-wrap:wrap
    }

    article{
        display:grid;
        grid-template-columns:1fr 90px 90px;
        border:1px solid var(--md-sys-color-outline-variant);
        padding:8px;
        border-radius:12px
    }
</style>