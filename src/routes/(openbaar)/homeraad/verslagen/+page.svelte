<script lang="ts">
	import { Verslag, Academiejaarselector, Augustje } from '$lib/components';
	import { navigating } from '$app/stores';

	export let data;
</script>

<svelte:head>
	<title>Verslagen</title>
	<meta
		name="description"
		content="De verslagen van de vergaderingen van de beperkte Homeraad van Home Vermeylen."
	/>
</svelte:head>

<div class="flex flex-col gap-5 items-center min-h-[calc(100vh-64px)]">
	<div class="flex flex-col items-center text-center">
		<h1 class="py-5 text-3xl font-bold italic tracking-wider">Verslagen</h1>
		{#await data.academiejaren}
			<select class="select select-bordered disabled">
				<option selected>laden...</option>
			</select>
		{:then academiejaren}
			<Academiejaarselector
				{academiejaren}
				geselecteerd_academiejaar={data.academiejaar_query ?? data.academiejaar}
			/>
		{:catch}
			<h1>error</h1>
		{/await}
	</div>

	<div class="flex flex-col items-center gap-5 mb-10 mt-5">
		{#await data.verslagen}
			<div class="flex flex-col gap-4 w-52">
				<div class="skeleton h-32 w-full" />
				<div class="skeleton h-4 w-28" />
				<div class="skeleton h-4 w-full" />
				<div class="skeleton h-4 w-full" />
			</div>
		{:then verslagen}
			{#if verslagen.length == 0}
				<h2>Voor dit academiejaar zijn (nog) geen verslagen beschikbaar.</h2>
			{:else}
				<div class="text-center mb-5">
					<div class="prose mb-5"><h2>Vers van de pers.</h2></div>
					<Verslag verslag={verslagen[0]} />
				</div>
				{#if verslagen.length > 1}
					<div class="flex flex-col items-center gap-5">
						<div class="prose mb-5"><h2>Eerdere publicaties.</h2></div>
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
