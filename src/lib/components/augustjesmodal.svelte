<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import Input from './input.svelte';
	import type { Augustje } from '$lib/types';

	export let geselecteerd_augustje: Augustje | null;
	export let dialog: HTMLDialogElement;
	export let gebruiker: any;
	export let form: any;

	let loading = false;

	const updateAugustje = () => {
		loading = true;

		return async ({ result, update }: { result: any; update: any }) => {
			switch (result.type) {
				case 'success':
					if (geselecteerd_augustje) {
						toast.success('Augustje succesvol aangepast.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					} else {
						toast.success('Augustje gepubliceerd.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					}

					await update();
					break;
				case 'invalid':
					if (geselecteerd_augustje) {
						toast.error('Aanpassen Augustje mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					} else {
						toast.error('Publicatie Augustje mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					}
					await update();
					break;
				case 'error':
					if (geselecteerd_augustje) {
						toast.error('Aanpassen Augustje mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					} else {
						toast.error('Publicatie Augustje mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					}
					break;
				default:
					await update();
			}
			loading = false;
			resetGeselecteerdAugustje();
		};
	};

	const resetGeselecteerdAugustje = () => {
		dialog.close();
		geselecteerd_augustje = null;
	};
</script>

<dialog bind:this={dialog} id="verslag_modal" class="modal" on:cancel={resetGeselecteerdAugustje}>
	<form
		use:enhance={updateAugustje}
		method="post"
		action="?/update"
		enctype="multipart/form-data"
		class="modal-box flex flex-col space-y-5"
	>
		<h3 class="text-center font-bold text-lg">{geselecteerd_augustje?.naam ?? 'Nieuw Augustje'}</h3>

		{#if geselecteerd_augustje}
			<input type="hidden" name="id" value={geselecteerd_augustje?.id} />
		{/if}

		<input
			type="hidden"
			name="praesidium"
			value={gebruiker?.expand?.praesidiumlid?.praesidium ?? ''}
		/>

		<input
			accept=".pdf"
			class="file-input file-input-bordered"
			type="file"
			name="bestand"
			placeholder={geselecteerd_augustje?.bestand ?? ''}
		/>
		<Input
			id="naam"
			label="Naam"
			placeholder="Geef hier de naam voor het bestand in."
			value={geselecteerd_augustje?.naam ?? ''}
			errors={form?.data?.naam}
		/>

		<div class="modal-action">
			<button type="submit" formmethod="dialog" class="btn btn-ghost">Annuleer</button>
			<button type="submit" class={`btn btn-outline ${loading ? 'loading loading-spinner' : ''}`}
				>Opslaan</button
			>
		</div>
	</form>
</dialog>
