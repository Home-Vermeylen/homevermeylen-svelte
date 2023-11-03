<script lang="ts">
	import type { Augustje } from '$lib/types';
	import { Calendar } from 'lucide-svelte';

	export let augustje: Augustje;

	const datum = new Date(augustje.created);
</script>

<div class="card bg-base-200">
	<div class="card-body items-center">
		<h2 class="card-title">{augustje.naam}</h2>
		<span class="flex flex-row items-center text-center gap-2"
			><Calendar class="h-4 w-4" /> {datum.toLocaleDateString()}</span
		>
		<div class="card-actions justify-center mt-5">
			<a class="btn btn-primary" target="_blank" href={augustje.bestand}> Lees nu </a>
		</div>
	</div>
</div>
