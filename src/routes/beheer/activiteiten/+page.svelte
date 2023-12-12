<script lang="ts">
	import { Activiteitsrecord } from '$lib/components';
	import Activiteitenmodal from '$lib/components/activiteitenmodal.svelte';
	import type { Activiteit } from '$lib/types.js';
	import { CalendarPlus, FilePlus } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import toast from 'svelte-french-toast';

	export let data: PageData;
	let geselecteerde_activiteit: Activiteit | null = null;
	let dialog: HTMLDialogElement;

	const { form, enhance, errors, message, delayed } = superForm(data.form, {
		onUpdated: ({ form }) => {
			if (form.valid) {
				geselecteerde_activiteit = null;
				dialog.close();
				toast.success('Activiteit succesvol aangepast.', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
			}
		},
		onError: () => {
			geselecteerde_activiteit = null;
			dialog.close();
			toast.error('Er is een fout opgetreden.', {
				style: 'border-radius: 200px; background: #333; color: #fff;'
			});
		},
		delayMs: 500,
		timeoutMs: 8000
	});

	const open_modal = () => {
		dialog.showModal();
	};
</script>

<Activiteitenmodal {form} {errors} {message} {delayed} {enhance} bind:dialog bind:geselecteerde_activiteit gebruiker={data.gebruiker} />
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
