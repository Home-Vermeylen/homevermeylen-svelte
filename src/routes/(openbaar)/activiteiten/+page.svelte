<script lang="ts">
	import Activiteit from '$lib/components/activiteit.svelte';

	export let data;

	let opkomende_activiteiten: undefined | any = undefined;
	let afgelopen_activiteiten: undefined | any = undefined;

	$: {
		if (data.activiteiten) {
			opkomende_activiteiten = data.activiteiten.filter((a: any) => {
				return new Date(a.datum).getTime() >= new Date().getTime();
			});
			afgelopen_activiteiten = data.activiteiten
				.filter((a: any) => {
					return new Date(a.datum).getTime() < new Date().getTime();
				})
				.reverse();
		}
	}
</script>

<svelte:head>
	<title>Activiteiten</title>
	<meta
		name="description"
		content="Een lijst van de geplande en afgelopen activiteiten georganiseerd door de Homeraad Vermeylen."
	/>
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh-64px)] gap-2 items-center">
	<h1 class="text-center text-3xl pt-4 font-bold mb-5 mt-5">Opkomende activiteiten</h1>
	{#if opkomende_activiteiten.length > 1}
		<div
			class="flex flex-col gap-2 items-center md:flex-none md:grid md:grid-cols-2 md:items-baseline"
		>
			{#each opkomende_activiteiten as activiteit (activiteit.id)}
				<Activiteit {activiteit} />
			{/each}
		</div>
	{:else if opkomende_activiteiten.length == 1}
		<div class="items-center">
			{#each opkomende_activiteiten as activiteit (activiteit.id)}
				<Activiteit {activiteit} />
			{/each}
		</div>
	{:else}
		<h1>Er zijn voorlopig geen activiteiten gepland.</h1>
	{/if}
	<h1 class="text-center text-3xl font-bold pt-4 mb-5">Afgelopen activiteiten</h1>
	{#if afgelopen_activiteiten.length > 1}
		<div
			class="flex flex-col gap-2 items-center md:flex-none md:grid md:grid-cols-2 md:items-baseline"
		>
			{#each afgelopen_activiteiten as activiteit (activiteit.id)}
				<Activiteit {activiteit} />
			{/each}
		</div>
	{:else if afgelopen_activiteiten.length == 0}
		<div class="items-center">
			{#each afgelopen_activiteiten as activiteit (activiteit.id)}
				<Activiteit {activiteit} />
			{/each}
		</div>
	{:else}
		<h1>Niets om weer te geven.</h1>
	{/if}
</div>
