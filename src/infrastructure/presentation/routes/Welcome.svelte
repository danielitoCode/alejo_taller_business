<script lang="ts">
    import {onMount} from "svelte";

    export let navController;

    onMount(() => {
        setTimeout(() => {
            navController.navigate("login");
        }, 2000)
    })
</script>
<h1>SOY WELCOME</h1>