<script lang="ts">
	import { Verslag, Academiejaarselector } from '$lib/components';
	import { navigating } from '$app/stores';

	export let data;
</script>

<svelte:head>
	<title>Verslagen</title>
</svelte:head>

<div class="flex flex-col gap-5 items-center min-h-[calc(100vh-64px)]">
	<div class="flex flex-col items-center text-center">
		<h1 class="py-5 text-3xl font-bold italic tracking-wider">Verslagen</h1>
		<Academiejaarselector
			academiejaren={data.academiejaren}
			huidig_academiejaar={data.academiejaar_query ?? data.huidig_academiejaar}
		/>
	</div>

	<div class="flex flex-col items-center gap-5 mb-10 mt-5">
		{#if $navigating}
			<span class="loading loading-spinner loading-md" />
		{:else if data.verslagen.length == 0}
			<h2>Voor dit academiejaar zijn (nog) geen verslagen beschikbaar.</h2>
		{:else}
			<div class="text-center mb-5">
				<div class="prose mb-5"><h2>Uitgelicht</h2></div>
				<Verslag verslag={data.verslagen[0]} />
			</div>
			{#if data.verslagen.length > 1}
				<div class="flex flex-col items-center gap-5">
					<div class="prose mb-5"><h2>Eerdere publicaties</h2></div>
					{#each data.verslagen.slice(1) as verslag (verslag.id)}
						<Verslag {verslag} />
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>
