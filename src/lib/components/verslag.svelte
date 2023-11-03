<script lang="ts">
	import type { Verslag } from '$lib/types';
	import { Calendar } from 'lucide-svelte';

	export let verslag: Verslag;
</script>

<div class="card bg-base-200">
	<div class="card-body items-center">
		<h2 class="card-title">{verslag.naam}</h2>
		<span class="flex flex-row items-center text-center gap-2"
			><Calendar class="h-4 w-4" /> {verslag.created.toLocaleDateString()}</span
		>
		<div class="card-actions justify-center mt-5">
			<a class="btn btn-primary" target="_blank" href={verslag.bestand}> Lees nu </a>
		</div>
	</div>
</div>
