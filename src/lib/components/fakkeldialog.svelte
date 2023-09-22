<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import Input from './input.svelte';
	import type { Record } from 'pocketbase';
	import PocketBase from 'pocketbase';
	import { onMount } from 'svelte';

	export let geselecteerde_fakkel: Record | null;
	export let dialog: HTMLDialogElement;
	export let gebruiker: any;
	export let fakkels: any;
	export let form: any;
	export let praesidium_leden: any;

	let loading = false;

	const updateBakken = () => {
		loading = true;

		return async ({ result, update }: { result: any; update: any }) => {
			switch (result.type) {
				case 'success':
					toast.success('Fakkels aangepast.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'invalid':
					toast.error('Aanpassen fakkels mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'error':
					toast.error('Aanpassen fakkels mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					break;
				default:
					await update();
			}
			loading = false;
			resetGeselecteerdeFakkel();
		};
	};

	const resetGeselecteerdeFakkel = () => {
		dialog.close();
		geselecteerde_fakkel = null;
	};
</script>

<dialog bind:this={dialog} id="fakkels_modal" class="modal" on:cancel={resetGeselecteerdeFakkel}>
	<form
		use:enhance={updateBakken}
		method="post"
		action="?/update_fakkels"
		enctype="multipart/form-data"
		class="modal-box flex flex-col space-y-5 items-center"
	>
		<h3 class="text-center font-bold text-lg">
			{geselecteerde_fakkel
				? `Fakkels: ${geselecteerde_fakkel?.expand?.gebruiker?.voornaam}`
				: 'Nieuwe fakkels'}
		</h3>

		{#if geselecteerde_fakkel}
			<input type="hidden" name="id" value={geselecteerde_fakkel?.id} />
		{:else if praesidium_leden}
				<select name="gebruiker" class="select select-bordered w-full max-w-xs">
					<option disabled selected>Selecteer een gebruiker.</option>
					{#each [].slice.call(praesidium_leden) as lid (lid.id)}
						<option value={lid?.expand?.gebruiker?.id}>{lid?.voornaam} {lid?.familienaam}</option>
					{/each}
				</select>
		{/if}

		<input
			type="hidden"
			name="praesidium"
			value={gebruiker?.expand?.praesidiumlid?.expand.praesidium.id ?? ''}
		/>

		<Input
			id="aantal"
			label="Aantal fakkels"
			type="number"
			value={(fakkels.find && fakkels.find((val) => {
				return val.gebruiker == geselecteerde_fakkel?.gebruiker;
			}))?.aantal ?? 0}
			errors={form?.data?.fakkels}
		/>

		<div class="modal-action">
			<button type="submit" formmethod="dialog" class="btn btn-ghost">Annuleer</button>
			<button type="submit" class={`btn btn-outline ${loading ? 'loading loading-spinner' : ''}`}
				>Opslaan</button
			>
		</div>
	</form>
</dialog>
