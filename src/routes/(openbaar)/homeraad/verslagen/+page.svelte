<script lang="ts">
	import Academiejaarselector from '$lib/components/academiejaarselector.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import Verslag from '$lib/components/verslag.svelte';
	import { LucideAlertCircle, LucideLoader, Squirrel } from 'lucide-svelte';

	export let data;
</script>

<svelte:head>
	<title>Homeraad - Verslagen</title>
	<meta
		name="description"
		content="De verslagen van de vergaderingen van de beperkte Homeraad van Home Vermeylen."
	/>
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center">
	<div class="flex flex-col items-center text-center">
		<h1
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-24 mb-8"
		>
			Verslagen
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
				<Alert.Title>Academiejaren laden...</Alert.Title>
			</Alert.Root>
		{/await}
	</div>

	<div class="flex flex-col items-center gap-5 mb-5 mt-5">
		{#await data.verslagen}
			<div class="flex items-center space-x-4">
				<Skeleton class="h-12 w-12 rounded-full" />
				<div class="space-y-2">
					<Skeleton class="h-4 w-[250px]" />
					<Skeleton class="h-4 w-[200px]" />
				</div>
			</div>
		{:then verslagen}
			{#if verslagen.length == 0}
				<Alert.Root class="w-80">
					<Squirrel class="h-4 w-4" />
					<Alert.Title>Het is hier nogal stil...</Alert.Title>
				</Alert.Root>
			{:else}
				<div class="flex flex-col items-center gap-5">
					<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Vers van de pers.</h3>
					<Verslag verslag={verslagen[0]} />
				</div>
				{#if verslagen.length > 1}
					<div class="flex flex-col items-center gap-5">
						<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Eerdere publicaties.</h3>
						{#each verslagen.slice(1) as verslag (verslag.id)}
							<Verslag {verslag} />
						{/each}
					</div>
				{/if}
			{/if}
		{:catch}
			<h1>error</h1>
		{/await}
	</div>
</div>

