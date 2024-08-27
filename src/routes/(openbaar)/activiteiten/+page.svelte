<script lang="ts">
	import Activiteit from '$lib/components/activiteit.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { LucideAlertCircle, Squirrel } from 'lucide-svelte';
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

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center">
	<h1
		class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-24 mb-8"
	>
		Opkomende activiteiten
	</h1>
	{#await data.activiteiten}
		<div class="flex items-center space-x-4">
			<Skeleton class="h-12 w-12 rounded-full" />
			<div class="space-y-2">
				<Skeleton class="h-4 w-[250px]" />
				<Skeleton class="h-4 w-[200px]" />
			</div>
		</div>
	{:then activiteiten}
		{#if activiteiten.opkomende_activiteiten.length == 0}
			<Alert.Root class="w-80">
				<Squirrel class="h-4 w-4" />
				<Alert.Title>Het is hier nogal stil...</Alert.Title>
			</Alert.Root>
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
		<h1
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-8 mb-8"
		>
			Afgelopen activiteiten
		</h1>
		{#if activiteiten.afgelopen_activiteiten.length == 0}
			<Alert.Root class="w-64">
				<Squirrel class="h-4 w-4" />
				<Alert.Title>Het is hier nogal stil...</Alert.Title>
			</Alert.Root>
		{:else if activiteiten.afgelopen_activiteiten.length > 1}
			<div
				class="flex flex-col gap-5 items-center md:flex-none md:grid md:grid-cols-2 md:items-baseline"
			>
				{#each activiteiten.afgelopen_activiteiten as activiteit (activiteit.id)}
					<Activiteit {activiteit} />
				{/each}
			</div>
		{:else if activiteiten.afgelopen_activiteiten.length == 1}
			<div class="items-center">
				{#each activiteiten.afgelopen_activiteiten as activiteit (activiteit.id)}
					<Activiteit {activiteit} />
				{/each}
			</div>
		{/if}
	{:catch}
	<Alert.Root variant="destructive" class="w-64">
		<LucideAlertCircle class="h-4 w-4" />
		<Alert.Title>Er is een probleem opgetreden bij het ophalen van de activiteiten.</Alert.Title>
	  </Alert.Root>
	{/await}
</div>
