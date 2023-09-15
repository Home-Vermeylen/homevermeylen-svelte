<script lang="ts">
	import { browser } from '$app/environment';

	import { Academiejaarselector, Praesidiumlid } from '$lib/components';

	export let data: any;
</script>

<svelte:head>
	<title>Homeraad - Leden</title>
	<meta name="description" content="De leden van de homeraad van Home Vermeylen.">
</svelte:head>

<div class="flex flex-col items-center">
	<div class="flex flex-col items-center text-center p-10">
		<h1 class="py-5 text-3xl font-bold italic tracking-wider">Academiejaar</h1>
		<Academiejaarselector
			academiejaren={data.academiejaren}
			huidig_academiejaar={data.academiejaar_query ?? data.huidig_academiejaar}
		/>
	</div>
	<div class="grid gap-x-10 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#each data.praesidium_leden as praesidiumlid (praesidiumlid.id)}
			<Praesidiumlid lid={praesidiumlid} isHuidigPraesidium={data.academiejaar_query == null} />
		{/each}
	</div>
</div>
