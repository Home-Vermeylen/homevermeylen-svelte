<script lang="ts">
	import { Augustjerecord, Augustjesmodal } from '$lib/components/index.js';
	import { FilePlus } from 'lucide-svelte';

	export let data: any;
	export let form;

	let geselecteerd_augustje: any | null = null;
	let dialog: HTMLDialogElement;

	const open_modal = () => {
		dialog.showModal();
	};
</script>

<Augustjesmodal bind:form bind:dialog bind:geselecteerd_augustje gebruiker={data.gebruiker} />
<div class="flex flex-col gap-10 items-center mt-5 overflow-x-auto w-full">
	<button class="btn" on:click={open_modal}>
		<FilePlus class="h-4 w-4" /> Nieuw Augustje
	</button>
	{#if data.augustjes.length == 0}
		<h1>Geen Augustjes om weer te geven</h1>
	{:else}
		<table class="table w-full">
			<thead>
				<tr>
					<th>Acties</th>
					<th>Naam</th>
					<th>Bestand</th>
					<th>Publicatiedatum</th>
				</tr>
			</thead>
			<tbody>
				{#each data.augustjes as augustje (augustje.id)}
					<Augustjerecord bind:dialog bind:geselecteerd_augustje {augustje} />
				{/each}
			</tbody>

			<tfoot>
				<tr>
					<th>Acties</th>
					<th>Naam</th>
					<th>Bestand</th>
					<th>Publicatiedatum</th>
				</tr>
			</tfoot>
		</table>
	{/if}
</div>
