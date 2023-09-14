<script lang="ts">
	import { Activiteitsrecord } from '$lib/components';
	import Activiteitenmodal from '$lib/components/activiteitenmodal.svelte';
	import { CalendarPlus, FilePlus } from 'lucide-svelte';

	export let data: any;
	export let form;

	let geselecteerde_activiteit: any | null = null;
	let dialog: HTMLDialogElement;

	const open_modal = () => {
		dialog.showModal();
	};
</script>

<Activiteitenmodal bind:form bind:dialog bind:geselecteerde_activiteit gebruiker={data.gebruiker} />
<div class="flex flex-col gap-10 items-center mt-5 overflow-x-auto w-full">
	<button class="btn" on:click={open_modal}>
		<CalendarPlus class="h-4 w-4" /> Nieuwe Activiteit
	</button>
	{#if data.activiteiten.length == 0}
		<h1>Geen activiteiten om weer te geven</h1>
	{:else}
		<table class="table w-full">
			<thead>
				<tr>
					<th>Acties</th>
					<th>Naam</th>
					<th>Omschrijving</th>
					<th>Openbaar</th>
					<th>Datum</th>
				</tr>
			</thead>
			<tbody>
				{#each data.activiteiten as activiteit (activiteit.id)}
					<Activiteitsrecord bind:dialog bind:geselecteerde_activiteit {activiteit} />
				{/each}
			</tbody>

			<tfoot>
				<tr>
					<th>Acties</th>
					<th>Naam</th>
					<th>Omschrijving</th>
					<th>Openbaar</th>
					<th>Datum</th>
				</tr>
			</tfoot>
		</table>
	{/if}
</div>
