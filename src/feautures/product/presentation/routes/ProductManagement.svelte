<script lang="ts">
    import { onMount } from "svelte";
    import { productStore } from "../viewmodel/product.store";
    import type { Product } from "../../domain/entity/Product";
    import { categoryStore } from "../../../category/presentation/viewmodel/category.store";
    import { promotionStore } from "../../../notification/presentation/viewmodel/promotion.store";

    let draftName=""; let draftDescription=""; let draftPrice=0; let draftPhotoUrl=""; let draftCategoryId="";
    let editId: string | null = null;

    onMount(() => {
        productStore.syncAll().catch(() => {});
        categoryStore.syncAll().catch(() => {});
        promotionStore.syncAll().catch(() => {});
    });

    async function create(){
        if(!draftName.trim() || !draftCategoryId) return;
        const data: Product = {
            id: `p-${Math.random().toString(36).slice(2,8)}`,
            name:draftName.trim(),description:draftDescription.trim(),price:Number(draftPrice),
            photoUrl:draftPhotoUrl.trim()||"https://picsum.photos/600",categoryId:draftCategoryId
        };
        await productStore.create(data);
        draftName=""; draftDescription=""; draftPrice=0; draftPhotoUrl="";
    }

    function startEdit(p:Product){ editId=p.id; draftName=p.name; draftDescription=p.description; draftPrice=p.price; draftPhotoUrl=p.photoUrl; draftCategoryId=p.categoryId; }

    async function save(){
        if(!editId) return;
        const old = $productStore.items.find((p) => p.id === editId);
        if (old && Number(draftPrice) < old.price) {
            const discountPercent = Math.round(((old.price - Number(draftPrice)) / old.price) * 100);
            const now = Date.now();
            await promotionStore.create({
                id: `promo-${Math.random().toString(36).slice(2,8)}`,
                title: `Promo por baja de precio: ${old.name}`,
                message: `Descuento del ${discountPercent}%`,
                imageUrl: old.photoUrl,
                oldPrice: old.price,
                currentPrice: Number(draftPrice),
                validFromEpochMillis: now,
                validUntilEpochMillis: now + 1000 * 60 * 60 * 24 * 30
            });
        }
        await productStore.updatePrice({ ...old!, name:draftName, description:draftDescription, photoUrl:draftPhotoUrl, categoryId:draftCategoryId }, Number(draftPrice));
        editId=null;
    }
</script>
<section class="card">
    <h2>Gestión de productos</h2>
    <p>Si el precio baja, se crea promoción automáticamente con % de descuento.</p>
    <div class="grid">
        <input placeholder="Nombre" bind:value={draftName}/>
        <input placeholder="Descripción" bind:value={draftDescription}/>
        <input type="number" bind:value={draftPrice} min="0" step="0.01"/>
        <input placeholder="URL de foto" bind:value={draftPhotoUrl}/>
        <select bind:value={draftCategoryId}><option value="" disabled>Categoria</option>{#each $categoryStore.items as c}<option value={c.id}>{c.name}</option>{/each}</select>
        {#if editId}<button on:click={save}>Guardar cambios</button>{:else}<button on:click={create}>Crear producto</button>{/if}
    </div>
    <div class="list">
        {#each $productStore.items as product}
            <article>
                <img src={product.photoUrl} alt={product.name}/>
                <div><strong>{product.name}</strong><small>${product.price.toFixed(2)} · cat: {product.categoryId}</small></div>
                <button on:click={()=>startEdit(product)}>Editar</button>
                <button on:click={()=>productStore.removeById(product.id)}>Eliminar</button>
            </article>
        {/each}
    </div>
</section>
<style>
    .card{
        display:grid;
        gap:10px
    }
    .grid{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
        gap:8px
    }
    .list{
        display:grid;
        gap:8px}
    article{
        display:grid;
        grid-template-columns:64px 1fr auto auto;
        gap:8px;
        align-items:center;
        border:1px solid var(--md-sys-color-outline-variant);
        padding:8px;
        border-radius:12px
    }
    img{
        width:64px;
        height:64px;
        object-fit:cover;
        border-radius:8px
    }
    small{
        display:block
    }
</style>