<script lang="ts">
	import toast from 'svelte-french-toast';
	import Input from './input.svelte';
	import type { Record } from 'pocketbase';
	import type { ActionResult } from '@sveltejs/kit';
	import { Pencil } from 'lucide-svelte';
	import type { Activiteit } from '$lib/types';

	export let geselecteerde_activiteit: Activiteit | null;
	export let dialog: HTMLDialogElement;
	export let gebruiker: Record;
	export let form: any;
	export let enhance: any;
	export let message: any;
	export let delayed: any;
	export let errors: any;

	let banner: HTMLImageElement;

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
		use:enhance
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
						src={geselecteerde_activiteit?.banner}
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
		<div class="form-control w-full max-w-lg mb-2">
			<label for="naam" class="label font-medium pb-1">
				<span class="label-text">Naam</span>
			</label>
			<input
				type="text"
				id="naam"
				name="naam"
				aria-invalid={$errors.naam ? 'true' : undefined}
				value={geselecteerde_activiteit?.naam ?? ''}
				required
				class={`input input-bordered`}
			/>
			{#if $errors.naam}<label for="naam" class="label py-0 pt-1">
					<span class="label-text-alt text-error">{$errors.naam}</span>
				</label>{/if}
		</div>
		<div class="form-control w-full max-w-lg mb-2">
			<label for="omschrijving" class="label font-medium pb-1">
				<span class="label-text">Omschrijving</span>
			</label>
			<textarea
				id="naam"
				name="omschrijving"
				cols=55
				aria-invalid={$errors.omschrijving ? 'true' : undefined}
				value={geselecteerde_activiteit?.omschrijving ?? ''}
				required
				class={`textarea textarea-bordered`}
			/>

			{#if $errors.omschrijving}<label for="omschrijving" class="label py-0 pt-1">
					<span class="label-text-alt text-error">{$errors.omschrijving}</span>
				</label>{/if}
		</div>

		<div class="form-control w-full max-w-lg mb-2">
			<label for="locatie" class="label font-medium pb-1">
				<span class="label-text">Locatie</span>
			</label>
			<input
				type="text"
				id="locatie"
				name="locatie"
				aria-invalid={$errors.locatie ? 'true' : undefined}
				value={geselecteerde_activiteit?.locatie ?? ''}
				required
				class={`input input-bordered`}
			/>
			{#if $errors.locatie}<label for="locatie" class="label py-0 pt-1">
					<span class="label-text-alt text-error">{$errors.locatie}</span>
				</label>{/if}
		</div>
		<div class="form-control max-w-lg mb-2">
			<label for="activiteitstype" class="label font-medium pb-1">
				<span class="label-text">Activiteitstype</span>
			</label>
			<select
				required
				id="activiteitstype"
				name="activiteitstype"
				aria-invalid={$errors.activiteitstype ? 'true' : undefined}
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
			{#if $errors.activiteitstype}<label for="locatie" class="label py-0 pt-1">
					<span class="label-text-alt text-error">{$errors.locatie}</span>
				</label>{/if}
		</div>

		<div class="form-control w-full max-w-lg mb-2">
			<label for="datum" class="label font-medium pb-1">
				<span class="label-text">Datum</span>
			</label>
			<input
				type="datetime-local"
				id="datum"
				name="datum"
				aria-invalid={$errors.datum ? 'true' : undefined}
				value={geselecteerde_activiteit?.datum
					? new Date(
							geselecteerde_activiteit?.datum.getTime() -
								geselecteerde_activiteit?.datum.getTimezoneOffset() * 60000
					  )
							.toISOString()
							.slice(0, -1)
					: ''}
				required
				class={`input input-bordered`}
			/>
			{#if $errors.datum}<label for="datum" class="label py-0 pt-1">
					<span class="label-text-alt text-error">{$errors.datum}</span>
				</label>{/if}
		</div>

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
		<div class="form-control w-full max-w-lg mb-2">
			<label for="formlink" class="label font-medium pb-1">
				<span class="label-text">Inschrijvingslink</span>
			</label>
			<input
				type="text"
				id="formlink"
				name="formlink"
				aria-invalid={$errors.formlink ? 'true' : undefined}
				value={geselecteerde_activiteit?.formlink ?? ''}
				class={`input input-bordered`}
			/>
			{#if $errors.formlink}<label for="formlink" class="label py-0 pt-1">
					<span class="label-text-alt text-error">{$errors.formlink}</span>
				</label>{/if}
		</div>
		<div class="modal-action">
			<button type="submit" formnovalidate formmethod="dialog" class="btn btn-ghost"
				>Annuleer</button
			>
			<button type="submit" class={`btn btn-primary ${$delayed ? 'loading loading-spinner' : ''}`}
				>Opslaan</button
			>
		</div>
	</form>
</dialog>
