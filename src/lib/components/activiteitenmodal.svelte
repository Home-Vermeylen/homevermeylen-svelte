<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import Input from './input.svelte';
	import type { Record } from 'pocketbase';
	import type { ActionResult } from '@sveltejs/kit';
	import { Pencil } from 'lucide-svelte';

	export let geselecteerde_activiteit: Record | null;
	export let dialog: HTMLDialogElement;
	export let gebruiker: Record;
	export let form;

	let loading = false;
	let banner: HTMLImageElement;

	const updateActiviteit = () => {
		loading = true;

		return async ({ result, update }: { result: ActionResult; update: any }) => {
			switch (result.type) {
				case 'success':
					if (geselecteerde_activiteit) {
						toast.success('Activiteit succesvol aangepast.', {
							style: 'border-radius: 200px; background: #333; color: #fff;'
						});
					} else {
						toast.success('Activiteit gepubliceerd.', {
							style: 'border-radius: 200px; background: #333; color: #fff;'
						});
					}

					await update();
					break;
				case 'failure':
					if (geselecteerde_activiteit) {
						toast.error('Aanpassen activiteit mislukt.', {
							style: 'border-radius: 200px; background: #333; color: #fff;'
						});
					} else {
						toast.error('Publicatie activiteit mislukt.', {
							style: 'border-radius: 200px; background: #333; color: #fff;'
						});
					}
					await update();
					break;
				case 'error':
					if (geselecteerde_activiteit) {
						toast.error('Aanpassen activiteit mislukt.', {
							style: 'border-radius: 200px; background: #333; color: #fff;'
						});
					} else {
						toast.error('Publicatie activiteit mislukt.', {
							style: 'border-radius: 200px; background: #333; color: #fff;'
						});
					}
					break;
				default:
					await update();
			}
			loading = false;
			resetGeselecteerdeActiviteit();
		};
	};

	const resetGeselecteerdeActiviteit = () => {
		dialog.close();
		geselecteerde_activiteit = null;
	};
</script>

<dialog
	bind:this={dialog}
	id="verslag_modal"
	class="modal modal-scroll h-max"
	on:cancel={resetGeselecteerdeActiviteit}
>
	<form
		use:enhance={updateActiviteit}
		method="post"
		action="?/update"
		enctype="multipart/form-data"
		class="modal-box flex flex-col space-y-5 text-center"
	>
		<h3 class="text-center font-bold text-lg">
			{geselecteerde_activiteit?.naam ?? 'Nieuwe Activiteit'}
		</h3>

		{#if geselecteerde_activiteit}
			<input type="hidden" name="id" value={geselecteerde_activiteit?.id} />
		{/if}

		<input type="hidden" name="gepubliceerd" value={true} />

		<input
			type="hidden"
			name="praesidium"
			value={gebruiker?.expand?.praesidiumlid?.praesidium ?? ''}
		/>

		<div class="form-control w-full max-w-lg">
			<label for="banner" class="hover:cursor-pointer flex flex-col gap-2 items-center">
				<img
					bind:this={banner}
					loading="lazy"
					src={geselecteerde_activiteit?.banner ?? '/omslag.jpg'}
					width={250}
					height={200}
					alt="banner"
					class="rounded-lg border-2 border-spacing-1 object-contain border-base-300"
				/>
				<label for="banner">
					<span class="btn">
						<Pencil class="w-4 h-4" /> Bewerk afbeelding
					</span>
				</label>
			</label>
			<input
				type="file"
				name="banner"
				id="banner"
				value=""
				accept=".png, .jpg"
				hidden
				on:change={(e) => {
					banner.src = URL.createObjectURL(e.target?.files[0]);
				}}
			/>
		</div>
		<Input
			id="naam"
			label="Naam"
			required
			placeholder="Geef hier de naam voor de activiteit in."
			value={geselecteerde_activiteit?.naam ?? ''}
			errors={form?.data?.naam}
		/>
		<Input
			id="omschrijving"
			label="Omschrijving"
			required
			placeholder="Geef hier de omschrijving van de activiteit."
			value={geselecteerde_activiteit?.omschrijving ?? ''}
			errors={form?.data?.omschrijving}
		/>
		<Input
			id="locatie"
			label="Locatie"
			placeholder="Geef hier de locatie van de activiteit in."
			value={geselecteerde_activiteit?.locatie ?? ''}
			errors={form?.data?.locatie}
		/>
		<div class="form-control w-full max-w-xs">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span class="label-text">Activiteitstype</span>
			</label>
			<select
				required
				name="activiteitstype"
				value={geselecteerde_activiteit?.activiteitstype ?? ''}
				class="select select-bordered"
			>
				<option disabled selected>Pick one</option>
				<option value="BAR">Bar</option>
				<option value="CULTUUR">Cultuur</option>
				<option value="SPORT">Sport</option>
				<option value="FEEST">Feest</option>
				<option value="CANTUS">Cantus</option>
				<option value="ANDERE">Andere</option>
			</select>
		</div>
		<Input
			type="datetime-local"
			id="datum"
			required
			label="Datum"
			value={geselecteerde_activiteit?.datum
				? new Date(
						new Date(geselecteerde_activiteit?.datum).getTime() -
							new Date(geselecteerde_activiteit?.datum).getTimezoneOffset() * 60000
				  )
						.toISOString()
						.slice(0, -1)
				: ''}
			errors={form?.data?.datum}
		/>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Inschrijven</span>
				<input
					name="inschrijven"
					type="checkbox"
					class="toggle"
					checked={geselecteerde_activiteit?.inschrijven ?? false}
				/>
			</label>
		</div>
		<Input
			id="formlink"
			label="Formlink"
			value={geselecteerde_activiteit?.formlink ?? ''}
			errors={form?.data?.formlink}
		/>
		<div class="modal-action">
			<button type="submit" formnovalidate formmethod="dialog" class="btn btn-ghost"
				>Annuleer</button
			>
			{#if loading}
				<button class="btn btn-square">
					<span class="loading loading-spinner" />
				</button>
			{:else}
				<button type="submit" class="btn btn-primary">Opslaan</button>
			{/if}
		</div>
	</form>
</dialog>
