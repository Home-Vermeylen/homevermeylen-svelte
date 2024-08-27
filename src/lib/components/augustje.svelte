<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { BookOpen, BookOpenCheck } from 'lucide-svelte';
	import { Button } from './ui/button';

	export let augustje;

	const gelezen = window.localStorage.getItem(augustje.id) != null;

	const setGelezen = () => window.localStorage.setItem(augustje.id, 'gelezen');
</script>

<Card.Root class="w-80 md:w-96">
	<Card.Header class="text-center">
		<Card.Title>{augustje.naam}</Card.Title>
	</Card.Header>
	<Card.Footer class="flex justify-center">
		<Button on:click={setGelezen} href={augustje.pdf} variant={gelezen ? 'outline' : 'default'} class="flex items-center gap-1">
			{#if gelezen}
				<BookOpenCheck class="h-4 w-4" /> Gelezen
			{:else}
				<BookOpen class="h-4 w-4" />
				Lezen
			{/if}
		</Button>
	</Card.Footer>
</Card.Root>
