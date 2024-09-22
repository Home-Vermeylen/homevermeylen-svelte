<script lang="ts">
	import Academiejaarselector from '$lib/components/academiejaarselector.svelte';
	import Praesidiumlid from '$lib/components/praesidiumlid.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { LucideAlertCircle, LucideLoader, Squirrel } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Homeraad - Homeraadsleden</title>
	<meta name="description" content="De leden van de homeraad Home Vermeylen." />
	<link rel=“canonical” href=“https://homevermeylen.be/homeraad/leden”>
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center">
	<div class="flex flex-col items-center text-center">
		<h1
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-24 mb-8"
		>
			Homeraadsleden
		</h1>
		{#await data.academiejaren}
			<Alert.Root>
				<LucideLoader class="h-4 w-4 animate-spin" />
				<Alert.Title>Academiejaren laden...</Alert.Title>
			</Alert.Root>
		{:then academiejaren}
			<Academiejaarselector
				{academiejaren}
				geselecteerd_academiejaar={data.academiejaar_query ?? data.academiejaar}
			/>
		{:catch}
			<Alert.Root variant="destructive">
				<LucideAlertCircle class="h-4 w-4" />
				<Alert.Title>Fout bij het laden van academiejaren.</Alert.Title>
			</Alert.Root>
		{/await}
	</div>

	<div class="flex flex-col items-center gap-5 mb-5 mt-5">
		{#await data.praesidium_leden}
			<div class="flex items-center space-x-4">
				<Skeleton class="h-12 w-12 rounded-full" />
				<div class="space-y-2">
					<Skeleton class="h-4 w-[250px]" />
					<Skeleton class="h-4 w-[200px]" />
				</div>
			</div>
		{:then praesidium_leden}
			{#if praesidium_leden.length == 0}
				<Alert.Root class="w-80">
					<Squirrel class="h-4 w-4" />
					<Alert.Title>Het is hier nogal stil...</Alert.Title>
				</Alert.Root>
			{:else}
				<div class="grid gap-x-10 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{#each praesidium_leden as praesidiumlid (praesidiumlid.id)}
						<Praesidiumlid lid={praesidiumlid} />
					{/each}
				</div>
			{/if}
		{:catch}
			<Alert.Root variant="destructive">
				<LucideAlertCircle class="h-4 w-4" />
				<Alert.Title>Fout bij het laden van academiejaren.</Alert.Title>
			</Alert.Root>
		{/await}
	</div>
</div>

