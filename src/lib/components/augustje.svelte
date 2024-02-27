<script lang="ts">
	import type { Augustje } from '../../routes/api/augustjes/+server';

	export let augustje: Augustje;
</script>

<div class="card bg-base-200">
	<div class="card-body items-center">
		<h2 class="card-title">{augustje.naam}</h2>
		<div class="card-actions justify-center mt-5">
			<a class="btn btn-primary" target="_blank" href={augustje.bestand} data-umami-event="Augustje gelezen"> Lees nu </a>
		</div>
	</div>
</div>
