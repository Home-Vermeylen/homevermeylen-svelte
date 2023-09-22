<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import Input from './input.svelte';

	export let geselecteerd_verslag: any | null;
	export let dialog: HTMLDialogElement;
	export let gebruiker: any;
	export let form: any;

	let loading = false;

	const updateVerslag = () => {
		loading = true;

		return async ({ result, update }: { result: any; update: any }) => {
			switch (result.type) {
				case 'success':
					if (geselecteerd_verslag) {
						toast.success('Verslag succesvol aangepast.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					} else {
						toast.success('Verslag gepubliceerd.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					}

					await update();
					break;
				case 'invalid':
					if (geselecteerd_verslag) {
						toast.error('Aanpassen verslag mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					} else {
						toast.error('Publicatie verslag mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					}
					await update();
					break;
				case 'error':
					if (geselecteerd_verslag) {
						toast.error('Aanpassen verslag mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					} else {
						toast.error('Publicatie verslag mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					}
					break;
				default:
					await update();
			}
			loading = false;
			resetGeselecteerdVerslag();
		};
	};

	const resetGeselecteerdVerslag = () => {
		dialog.close();
		geselecteerd_verslag = null;
	};
</script>

<dialog bind:this={dialog} id="verslag_modal" class="modal" on:cancel={resetGeselecteerdVerslag}>
	<form
		use:enhance={updateVerslag}
		method="post"
		action="?/update"
		enctype="multipart/form-data"
		class="modal-box flex flex-col space-y-5"
	>
		<h3 class="text-center font-bold text-lg">{geselecteerd_verslag?.naam ?? 'Nieuw Verslag'}</h3>

		{#if geselecteerd_verslag}
			<input type="hidden" name="id" value={geselecteerd_verslag?.id} />
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
			name="verslag"
			placeholder={geselecteerd_verslag?.verslag ?? ''}
		/>
		<Input
			id="naam"
			label="Naam"
			placeholder="Geef hier de naam voor het bestand in."
			value={geselecteerd_verslag?.naam ?? ''}
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
