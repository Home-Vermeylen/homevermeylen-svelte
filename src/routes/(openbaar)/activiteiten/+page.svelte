<script lang="ts">
	import Activiteit from '$lib/components/activiteit.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
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
	{#await data.activiteiten}
		<div class="flex flex-col gap-4 w-52">
			<div class="skeleton h-32 w-full" />
			<div class="skeleton h-4 w-28" />
			<div class="skeleton h-4 w-full" />
			<div class="skeleton h-4 w-full" />
		</div>
	{:then activiteiten}
		{#if activiteiten.opkomende_activiteiten == null}
			<h1>Er zijn voorlopig geen activiteiten gepland.</h1>
		{:else if activiteiten.opkomende_activiteiten.length > 1}
			<div
				class="flex flex-col gap-2 items-center md:flex-none md:grid md:grid-cols-2 md:items-baseline"
			>
				{#each activiteiten.opkomende_activiteiten as activiteit (activiteit.id)}
					<Activiteit {activiteit} />
				{/each}
			</div>
		{:else if activiteiten.opkomende_activiteiten.length == 1}
			<div class="items-center">
				{#each activiteiten.opkomende_activiteiten as activiteit (activiteit.id)}
					<Activiteit {activiteit} />
				{/each}
			</div>
		{/if}
		<h1 class="text-center text-3xl font-bold pt-4 mb-5">Afgelopen activiteiten</h1>
		{#if activiteiten.afgelopen_activiteiten == null}
			<h1>Niets om weer te geven.</h1>
		{:else if activiteiten.afgelopen_activiteiten.length > 1}
			<div
				class="flex flex-col gap-2 items-center md:flex-none md:grid md:grid-cols-2 md:items-baseline"
			>
				{#each activiteiten.afgelopen_activiteiten as activiteit (activiteit.id)}
					<Activiteit {activiteit} />
				{/each}
			</div>
		{:else if activiteiten.afgelopen_activiteiten.length == 0}
			<div class="items-center">
				{#each activiteiten.afgelopen_activiteiten as activiteit (activiteit.id)}
					<Activiteit {activiteit} />
				{/each}
			</div>
		{/if}
	{:catch error}
		<h1>error</h1>
	{/await}
</div>
