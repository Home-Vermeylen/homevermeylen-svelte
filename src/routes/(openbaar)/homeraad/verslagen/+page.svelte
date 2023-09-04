<script lang="ts">
	import { Verslag, Academiejaarselector } from '$lib/components';

	export let data;

	let gesorteerd: any[] | undefined = undefined;

	$: gesorteerd = data.verslagen.toSorted((a: any, b: any) => {
		return b.created - a.created;
	});
</script>

<div class="flex flex-col gap-5 items-center min-h-[calc(100vh-64px)]">
	<div class="flex flex-col items-center text-center">
		<h1 class="py-5 text-3xl font-bold italic tracking-wider">Verslagen</h1>
		<Academiejaarselector
			academiejaren={data.academiejaren}
			huidig_academiejaar={data.academiejaar_query ?? data.huidig_academiejaar}
		/>
	</div>

	<div class="flex flex-col items-center gap-5 mb-5 mt-5">
		{#if gesorteerd}
			{#if gesorteerd.length == 0}
				<h2>Voor dit academiejaar zijn (nog) geen verslagen beschikbaar.</h2>
			{:else}
				<div class="text-center mb-5">
					<div class="prose mb-5"><h2>Uitgelicht</h2></div>
					<Verslag verslag={gesorteerd[0]} />
				</div>
				{#if gesorteerd.length > 1}
					<div class="flex flex-col items-center gap-5">
						<div class="prose mb-5"><h2>Vorige publicaties</h2></div>
						{#each gesorteerd.slice(1) as verslag (verslag.id)}
							<Verslag {verslag} />
						{/each}
					</div>
				{/if}
			{/if}
		{/if}
	</div>
</div>
