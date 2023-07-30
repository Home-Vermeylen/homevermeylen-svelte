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
			afgelopen_activiteiten = data.activiteiten.filter((a: any) => {
				return new Date(a.datum).getTime() < new Date().getTime();
			});
		}
	}
</script>

<div class="flex flex-col min-h-[calc(100vh-64px)] gap-2 items-center">
	<h1 class="text-center text-3xl pt-4 font-bold mb-5 mt-5">Opkomende activiteiten</h1>
	{#if opkomende_activiteiten.length != 0}
		<div class="flex flex-col md:flex-row flex-wrap">
			{#each opkomende_activiteiten as activiteit (activiteit.id)}
				<Activiteit {activiteit} />
			{/each}
		</div>
	{:else}
		<h1>Er zijn voorlopig geen activiteiten gepland.</h1>
	{/if}

	<div class="flex flex-col items-center gap-2">
		<h1 class="text-center text-3xl font-bold pt-4 mb-5">Afgelopen activiteiten</h1>
		<div class="flex flex-col md:flex-row flex-wrap">
			{#if afgelopen_activiteiten.length != 0}
				<div class="flex flex-col md:flex-row flex-wrap">
					{#each afgelopen_activiteiten as activiteit (activiteit.id)}
						<Activiteit {activiteit} />
					{/each}
				</div>
			{:else}
				<h1>Er zijn voorlopig geen activiteiten gepland.</h1>
			{/if}
		</div>
	</div>
</div>
