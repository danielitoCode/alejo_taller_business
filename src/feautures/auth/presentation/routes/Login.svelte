<script lang="ts">
    import {onMount} from "svelte";

    export let navController;

    onMount(() => {
        setTimeout(() => {
            navController.navigate("register");
        }, 2000)
    })
</script>
<h1>SOY LOGIN</h1>