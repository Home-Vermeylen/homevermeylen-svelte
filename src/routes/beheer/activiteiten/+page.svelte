<script lang="ts">
	import { Activiteitsrecord } from '$lib/components';
	import Activiteitenmodal from '$lib/components/activiteitenmodal.svelte';
	import type { Activiteit } from '../../api/activiteiten/+server.ts';
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

<Activiteitenmodal
	{errors}
	{delayed}
	{enhance}
	bind:dialog
	bind:geselecteerde_activiteit
	gebruiker={data.gebruiker}
/>
<div class="flex flex-col gap-10 items-center mt-5 overflow-x-auto w-full">
	<button class="btn" on:click={open_modal}>
		<CalendarPlus class="h-4 w-4" /> Nieuwe Activiteit
	</button>
	<div class="flex flex-col min-h-[calc(100vh-64px)] gap-2 items-center">
		{#await data.activiteiten}
			<div class="flex flex-col gap-4 w-52">
				<div class="skeleton h-32 w-full" />
				<div class="skeleton h-4 w-28" />
				<div class="skeleton h-4 w-full" />
				<div class="skeleton h-4 w-full" />
			</div>
		{:then activiteiten}
			<h1 class="text-center text-3xl pt-4 font-bold mb-5 mt-5">Opkomende activiteiten</h1>
			{#if activiteiten.opkomende_activiteiten == null}
				<h1>Er zijn voorlopig geen activiteiten gepland.</h1>
			{:else if activiteiten.opkomende_activiteiten.length > 0}
				<table class="table w-full">
					<thead>
						<tr>
							<th>Acties</th>
							<th>Naam</th>
							<th>Datum</th>
						</tr>
					</thead>
					<tbody>
						{#each activiteiten.opkomende_activiteiten as activiteit (activiteit.id)}
							<Activiteitsrecord bind:dialog bind:geselecteerde_activiteit {activiteit} />
						{/each}
					</tbody>

					<tfoot>
						<tr>
							<th>Acties</th>
							<th>Naam</th>
							<th>Datum</th>
						</tr>
					</tfoot>
				</table>
			{/if}
			<h1 class="text-center text-3xl font-bold pt-4 mb-5">Afgelopen activiteiten</h1>
			{#if activiteiten.afgelopen_activiteiten == null}
				<h1>Niets om weer te geven.</h1>
			{:else if activiteiten.afgelopen_activiteiten.length > 0}
				<table class="table w-full">
					<thead>
						<tr>
							<th>Acties</th>
							<th>Naam</th>
							<th>Datum</th>
						</tr>
					</thead>
					<tbody>
						{#each activiteiten.afgelopen_activiteiten as activiteit (activiteit.id)}
							<Activiteitsrecord bind:dialog bind:geselecteerde_activiteit {activiteit} />
						{/each}
					</tbody>

					<tfoot>
						<tr>
							<th>Acties</th>
							<th>Naam</th>
							<th>Datum</th>
						</tr>
					</tfoot>
				</table>
			{/if}
		{:catch error}
			<h1>error</h1>
		{/await}
	</div>
</div>
