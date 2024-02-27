<script lang="ts">
	import type { Verslag } from '../../routes/api/verslagen/+server';
	import { Calendar } from 'lucide-svelte';

	export let verslag: Verslag;
</script>

<div class="card bg-base-200">
	<div class="card-body items-center">
		<h2 class="card-title">{verslag.naam}</h2>
		<div class="card-actions justify-center mt-5">
			<a class="btn btn-primary" target="_blank" href={verslag.bestand} data-umami-event="Verslag gelezen"> Lees nu </a>
		</div>
	</div>
</div>
