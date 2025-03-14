<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { CircleAlert } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Kandidaat from '../kandidaat.svelte';

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
			class="scroll-m-20 border-b text-2xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-32 mb-8"
		>
			Stemmen via toegangscode
		</h1>
		<Alert.Root variant="destructive" class="w-[300px]">
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
						>{verkiezing.kandidaten.filter((kandidaat) => {
							if (kandidaat.status == 'zichtbaar' && !kandidaat.gestemd.includes(data.functie_id)) {
								return true;
							}

							return false;
						}).length}
					</strong> kandidaten beschikbaar voor stemming</Card.Description
				>
			</Card.Header>
			<Card.Content class="flex flex-col gap-2 items-center">
				{#if verkiezing.kandidaten.filter((a) => a.status == 'zichtbaar').length == 0}
					<h3 class="scroll-m-20 text-sm font-semibold tracking-tight">
						Momenteel zijn er nog geen stemmingen geopend
					</h3>
				{:else}
					{#each verkiezing.kandidaten as kandidaat (kandidaat.id)}
						{#if kandidaat.status == 'zichtbaar' && !kandidaat.gestemd.includes(data.functie_id)}
							<Kandidaat {data} {kandidaat} {verkiezing} stemmer_id={data.stemmer_id} />
						{/if}
					{/each}
				{/if}
			</Card.Content>
			<Card.Footer />
		</Card.Root>
	{/each}
</div>
