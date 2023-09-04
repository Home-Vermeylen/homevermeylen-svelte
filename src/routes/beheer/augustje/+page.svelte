<script lang="ts">
	import { Augustjerecord, Modal } from '$lib/components';
	import { FilePlus } from 'lucide-svelte';

	export let data: any;

	let geselecteerd_augustje: any;
	let open: boolean;

	$: geselecteerd_augustje = undefined;
	$: open = false;

	const updateAugustje = (data: any) => {
    geselecteerd_augustje = data.augustje;
    open = true;
  };
</script>

<div class="flex flex-col gap-10 items-center mt-5 overflow-x-auto w-full">
	

	<button
		class="btn"
		on:click={() => {
			open = true;
		}}
	>
		<FilePlus class="h-4 w-4" /> Nieuw Augustje
	</button>
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
				<Augustjerecord on:update={updateAugustje} {augustje} />
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
</div>
