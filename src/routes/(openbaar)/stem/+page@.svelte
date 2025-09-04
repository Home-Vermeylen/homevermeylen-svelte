<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { CircleAlert } from 'lucide-svelte';
	import '../../../app.postcss';
	import type { PageData } from './$types';
	import Stemming from './stemming.svelte';

	interface Props {
		data: PageData;
	}

	let { data = $bindable() }: Props = $props();
</script>

<svelte:head>
	<meta name="description" content="Stempagina voor Homeraadsleden" />
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center mx-5">
	<div class="flex flex-col items-center">
		<h1
			class="scroll-m-20 border-b text-2xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-[2.5dvh] mb-[2.5dvh]"
		>
			Stemmen als homeraadslid
		</h1>
		<Alert.Root variant="destructive" class="w-[300px] sm:w-[600px]">
			<CircleAlert class="h-4 w-4" />
			<Alert.Title>Belangrijk</Alert.Title>
			<Alert.Description
				>Vergeet niet om op de verzend knop te klikken nadat je een stem hebt uitgebracht voor een
				kandidaat. Indien je dit vergeet zal de stem niet worden geregistreerd!</Alert.Description
			>
		</Alert.Root>
	</div>
	{#each data.verkiezingen as verkiezing (verkiezing.id)}
		<Card.Root class="w-[300px] sm:w-[600px] mx-5">
			<Card.Header>
				<Card.Title>{verkiezing.naam}</Card.Title>
				<Card.Description
					><strong
						>{verkiezing.stemmingen.filter((stemming) => {
							if (stemming.status == 'zichtbaar' && !stemming.gestemd.includes(data.functie_id)) {
								return true;
							}

							return false;
						}).length}
					</strong> stemmingen beschikbaar</Card.Description
				>
			</Card.Header>
			<Card.Content class="flex flex-col gap-2 items-center">
				{#if verkiezing.stemmingen.filter((a) => a.status == 'zichtbaar').length == 0}
					<h3 class="scroll-m-20 text-sm font-semibold tracking-tight">
						Momenteel zijn er nog geen stemmingen geopend
					</h3>
				{:else}
					{#each verkiezing.stemmingen as stemming (stemming.id)}
						{#if stemming.status == 'zichtbaar' && !stemming.gestemd.includes(data.functie_id)}
							<Stemming {data} {stemming} {verkiezing} stemmer_id={data.functie_id} />
						{/if}
					{/each}
				{/if}
			</Card.Content>
			<Card.Footer />
		</Card.Root>
	{/each}
</div>
