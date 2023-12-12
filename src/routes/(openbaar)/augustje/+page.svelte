<script lang="ts">
	import { Augustje, Academiejaarselector } from '$lib/components';
	import { navigating } from '$app/stores';

	export let data;
</script>

<svelte:head>
	<title>Augustje</title>
	<meta name="description" content="De edities van Home Vermeylen haar eigen studentikoos tijdschrift: het Augustje.">
</svelte:head>

<div class="flex flex-col gap-5 items-center min-h-[calc(100vh-64px)]">
	<div class="flex flex-col items-center text-center">
		<h1 class="py-5 text-3xl font-bold italic tracking-wider">Augustje</h1>
		<Academiejaarselector
			academiejaren={data.academiejaren}
			huidig_academiejaar={data.academiejaar_query ?? data.huidig_academiejaar}
		/>
	</div>

	<div class="flex flex-col items-center gap-5 mb-5 mt-5">
		{#if $navigating}
			<span class="loading loading-spinner loading-md" />
		{:else if data.augustjes}
			{#if data.augustjes.length == 0}
				<h2>Voor dit academiejaar zijn (nog) geen augustjes beschikbaar.</h2>
			{:else}
				<div class="text-center mb-5">
					<div class="prose mb-5"><h2>Uitgelicht</h2></div>
					<Augustje augustje={data.augustjes[0]} />
				</div>
				{#if data.augustjes.length > 1}
					<div class="flex flex-col items-center gap-5">
						<div class="prose mb-5"><h2>Eerdere publicaties</h2></div>
						{#each data.augustjes.slice(1) as augustje (augustje.id)}
							<Augustje {augustje} />
						{/each}
					</div>
				{/if}
			{/if}
		{/if}
	</div>
</div>
