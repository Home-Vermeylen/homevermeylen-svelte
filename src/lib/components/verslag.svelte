<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from './ui/button';
	import { Scroll, ScrollText } from 'lucide-svelte';

	let { verslag } = $props();

	const gelezen = window.localStorage.getItem(verslag.id) != null;

	const setGelezen = () => window.localStorage.setItem(verslag.id, 'gelezen');
</script>

<Card.Root class="w-[350px]">
	<Card.Header class="text-center pb-5">
		<Card.Title>{verslag.naam}</Card.Title>
	</Card.Header>
	<Card.Footer class="flex justify-center">
		<Button
			on:click={setGelezen}
			href={verslag.pdf}
			variant={gelezen ? 'outline' : 'default'}
			class="flex items-center gap-1"
		>
			{#if gelezen}
				<ScrollText class="h-4 w-4" /> Gelezen
			{:else}
				<Scroll class="h-4 w-4" />
				Lezen
			{/if}
		</Button>
	</Card.Footer>
</Card.Root>
