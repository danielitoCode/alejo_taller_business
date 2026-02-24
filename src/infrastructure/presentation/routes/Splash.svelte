<script lang="ts">
    import {onMount} from "svelte";

    import alejo_icon from '/alejoicon_clean.svg'
    export let navController;

    onMount(() => {
        setTimeout(() => {
            navController.navigate("welcome");
        }, 2000)
    })
</script>
<img src={alejo_icon} class="logo" alt="Vite Logo" style="width: 220px;"/>