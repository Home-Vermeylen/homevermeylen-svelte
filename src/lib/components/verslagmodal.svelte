<script lang="ts">
	import Input from './input.svelte';
	import type { Verslag } from '$lib/types';

	export let geselecteerd_verslag: Verslag | null;
	export let dialog: HTMLDialogElement;
	export let gebruiker: any;
	export let form: any;
	export let errors: any;
	export let enhance: any;
	export let delayed: any;

	const resetGeselecteerdVerslag = () => {
		dialog.close();
		geselecteerd_verslag = null;
	};
</script>

<dialog bind:this={dialog} id="verslag_modal" class="modal" on:cancel={resetGeselecteerdVerslag}>
	<form
		use:enhance
		method="post"
		action="/api/verslagen"
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
			name="bestand"
			placeholder={geselecteerd_verslag?.bestand ?? ''}
		/>
		<div class="form-control w-full max-w-lg mb-2">
			<label for="naam" class="label font-medium pb-1">
				<span class="label-text">Naam</span>
			</label>
			<input
				type="text"
				id="naam"
				name="naam"
				aria-invalid={$errors.naam ? 'true' : undefined}
				value={geselecteerd_verslag?.naam ?? ''}
				required
				class={`input input-bordered`}
			/>
			{#if $errors.naam}<label for="naam" class="label py-0 pt-1">
					<span class="label-text-alt text-error">{$errors.naam}</span>
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
