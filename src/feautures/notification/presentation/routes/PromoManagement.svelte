<script lang="ts">
    import { onMount } from "svelte";
    import { promotionStore } from "../viewmodel/promotion.store";
    onMount(() => { promotionStore.syncAll().catch(() => {}); });
</script>
<section class="card"><h2>Gestión de promociones</h2>
    {#if $promotionStore.items.length===0}<p>No hay promociones creadas.</p>{/if}
    {#each $promotionStore.items as promo}
        <article><strong>{promo.title}</strong><small>Descuento: {promo.oldPrice && promo.currentPrice ? Math.round(((promo.oldPrice-promo.currentPrice)/promo.oldPrice)*100) : 0}% · ${promo.oldPrice ?? 0} → ${promo.currentPrice ?? 0}</small></article>
    {/each}
</section>
<style>
    .card{
        display:grid;
        gap:8px
    }
    article{
        border:1px solid var(--md-sys-color-outline-variant);
        padding:10px;
        border-radius:12px
    }
    small{
        display:block
    }
</style>