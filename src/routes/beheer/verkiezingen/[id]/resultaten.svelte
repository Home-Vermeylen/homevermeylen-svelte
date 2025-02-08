<script lang="ts">
    let { opties } = $props();

</script>

{#each opties as optie}
    <h1>{optie.titel}: {optie.stemmen}</h1>
{/each}