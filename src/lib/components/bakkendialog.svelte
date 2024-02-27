<script lang="ts">
	import toast from 'svelte-french-toast';
	import Input from './input.svelte';
	import type { Record } from 'pocketbase';
	import PocketBase from 'pocketbase';
	import { onMount } from 'svelte';

	export let geselecteerde_bak: Record | null;
	export let dialog: HTMLDialogElement;
	export let gebruiker: any;
	export let bakken: any;
	export let form: any;
	export let enhance: any;
	export let message: any;
	export let delayed: any;
	export let errors: any;
	export let praesidium_leden: any;

	const resetGeselecteerdeBak = () => {
		dialog.close();
		geselecteerde_bak = null;
	};
</script>

<dialog bind:this={dialog} id="verslag_modal" class="modal" on:cancel={resetGeselecteerdeBak}>
	<form
		use:enhance
		method="post"
		action="/api/bakken"
		enctype="multipart/form-data"
		class="modal-box flex flex-col space-y-5 items-center"
	>
		<h3 class="text-center font-bold text-lg">
			{geselecteerde_bak
				? `Bakken: ${geselecteerde_bak?.expand?.gebruiker?.voornaam}`
				: 'Nieuwe bakken'}
		</h3>

		{#if geselecteerde_bak}
			<input type="hidden" name="id" value={geselecteerde_bak?.id} />
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

		<div class="form-control w-full max-w-lg mb-2">
			<label for="aantal" class="label font-medium pb-1">
				<span class="label-text">Aantal bakken</span>
			</label>
			<input
				type="number"
				id="aantal"
				name="aantal"
				aria-invalid={$errors.aantal ? 'true' : undefined}
				value={(
					bakken.find &&
					bakken.find((val) => {
						return val.gebruiker == geselecteerde_bak?.gebruiker;
					})
				)?.aantal ?? 0}
				required
				class={`input input-bordered`}
			/>
			{#if $errors.aantal}<label for="aantal" class="label py-0 pt-1">
					<span class="label-text-alt text-error">{$errors.aantal}</span>
				</label>{/if}
		</div>

		<div class="modal-action">
			<button type="submit" formmethod="dialog" class="btn btn-ghost">Annuleer</button>
			<button type="submit" class={`btn btn-outline ${$delayed ? 'loading loading-spinner' : ''}`}
				>Opslaan</button
			>
		</div>
	</form>
</dialog>
