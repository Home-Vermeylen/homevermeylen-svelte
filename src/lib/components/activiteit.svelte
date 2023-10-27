<script lang="ts">
	import { CalendarClock, CalendarDays } from 'lucide-svelte';
	import type { Record } from 'pocketbase';

	export let activiteit: Record;

	const datum = new Date(activiteit.datum);
	const huidige_datum = new Date();
</script>

<div class="card w-[400px] bg-base-200 shadow-xl m-5 break-all">
	<figure class="w-[400px] h-[200px] rounded">
		<img
			loading="lazy"
			src={activiteit.banner ?? '/foto_placeholder.png'}
			class="object-scale-down"
			height={200}
			width={400}
			alt="Banner"
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title text-center text-3xl self-center mb-5">{activiteit.naam}</h2>
		<h3 class="flex flex-row gap-2 self-center">
			<CalendarDays className="h-4 w-4" />
			{datum.toLocaleDateString()}
		</h3>
		<h3 class="flex flex-row gap-2 self-center">
			<CalendarClock className="h-4 w-4" />
			{datum.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
		</h3>
		<div class="divider" />
		<div class="prose my-5 text-center">{activiteit.omschrijving}</div>
		<div class="card-actions text-center self-center">
			{#if activiteit.inschrijven && datum.getTime() > huidige_datum.getTime() }
				<a href={activiteit.formlink} class="btn btn-primary btn-wide">Schrijf je in!</a>
			{/if}
		</div>
	</div>
</div>
