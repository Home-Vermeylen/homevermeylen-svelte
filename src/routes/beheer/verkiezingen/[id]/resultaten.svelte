<script lang="ts">
	let { opties, status } = $props();
</script>

{#if status == 'voltooid'}
	{#each opties as optie}
		<h1>{optie.titel}: {optie.stemmen}</h1>
	{/each}
{:else}
	<h1>n.v.t</h1>
{/if}
