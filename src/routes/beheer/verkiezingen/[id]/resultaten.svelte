<script lang="ts">
    export let opties;

</script>

{#each opties as optie}
    <h1>{optie.titel}: {optie.stemmen}</h1>
{/each}