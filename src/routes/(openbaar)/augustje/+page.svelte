<script lang="ts">
	import { Augustje, Academiejaarselector } from '$lib/components';

	export let data;

	data.augustjes.then((e) => console.log(e))
</script>

<svelte:head>
	<title>Augustje</title>
	<meta
		name="description"
		content="Het studentikoos tijdschrift van Home Vermeylen, het Augustje."
	/>
</svelte:head>

<div class="flex flex-col gap-5 items-center min-h-[calc(100vh-64px)]">
	<div class="flex flex-col items-center text-center">
		<h1 class="py-5 text-3xl font-bold italic tracking-wider">Augustje</h1>
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

	<div class="flex flex-col items-center gap-5 mb-5 mt-5">
		{#await data.augustjes}
			<div class="flex flex-col gap-4 w-52">
				<div class="skeleton h-32 w-full" />
				<div class="skeleton h-4 w-28" />
				<div class="skeleton h-4 w-full" />
				<div class="skeleton h-4 w-full" />
			</div>
		{:then augustjes}
			{#if augustjes.length == 0}
				<h2>Voor dit academiejaar zijn (nog) geen augustjes beschikbaar.</h2>
			{:else}
				<div class="text-center mb-5">
					<div class="prose mb-5"><h2>Vers van de pers.</h2></div>
					<Augustje augustje={augustjes[0]} />
				</div>
				{#if augustjes.length > 1}
					<div class="flex flex-col items-center gap-5">
						<div class="prose mb-5"><h2>Eerdere publicaties.</h2></div>
						{#each augustjes.slice(1) as augustje (augustje.id)}
							<Augustje {augustje} />
						{/each}
					</div>
				{/if}
			{/if}
		{:catch}
			<h1>error</h1>
		{/await}
	</div>
</div>
