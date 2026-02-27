<script lang="ts">
    import { onMount } from "svelte";
    import { saleStore } from "../viewmodel/sale.store";
    onMount(() => { saleStore.syncAll().catch(() => {}); });
</script>
<section class="card"><h2>Gestión de ventas</h2>
    {#if $saleStore.items.length===0}<p>No hay ventas registradas.</p>{/if}
    {#each $saleStore.items as sale}
        <article><strong>Venta #{sale.id.slice(0,8)}</strong><small>Monto: ${sale.amount.toFixed(2)} · Estado: {sale.verified}</small></article>
    {/each}
</section>
<style>.card{display:grid;gap:8px}article{border:1px solid var(--md-sys-color-outline-variant);padding:10px;border-radius:12px}small{display:block}</style>