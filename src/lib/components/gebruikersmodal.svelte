<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import Input from './input.svelte';
	import { getImageURL } from '$lib/utils';
	import { Pencil } from 'lucide-svelte';
	import { Avatar } from '.';

	export let dialog: HTMLDialogElement;
	export let gebruiker: any;
	export let form: any;

	let loading = false;
	let prematuur_gesloten = false;
	let avatar: HTMLImageElement;

	const updateProfiel = () => {
		loading = true;

		return async ({ result, update }: { result: any; update: any }) => {
			switch (result.type) {
				case 'success':
					toast.success('Profiel aangepast.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'invalid':
					toast.error('Aanpassen profiel mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'error':
					toast.error('Aanpassen profiel mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					break;
				default:
					await update();
			}
			loading = false;
			sluit_modal();
		};
	};

	const sluit_modal = () => {
		dialog.close();
	};
</script>

<dialog
	bind:this={dialog}
	id="verslag_modal"
	class="modal modal-scroll h-max"
	on:cancel={sluit_modal}
>
	<form
		use:enhance={updateProfiel}
		method="post"
		action="?/update"
		enctype="multipart/form-data"
		class="modal-box flex flex-col space-y-5"
	>
		<h3 class="text-center font-bold text-lg">Bewerk Profiel</h3>

		<input type="hidden" name="id" value={gebruiker?.id} />

		<div class="form-control w-full max-w-lg self-center">
			<label for="avatar" class="hover:cursor-pointer place-self-center">
				<div class="avatar">
					<label for="avatar" class="absolute -bottom-0.5 -right-0.5">
						<span class="btn btn-circle btn-sm btn-secondary">
							<Pencil class="w-4 h-4" />
						</span>
					</label>
					<div class="w-36 rounded-full ring-primary ring-1 ring-offset-1 self-center">
						<Avatar bind:image={avatar} {gebruiker} />
					</div>
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept=".png, .jpg"
				hidden
				on:blur|stopPropagation
				on:change={(e) => {
					avatar.src = URL.createObjectURL(e.target?.files[0]);
				}}
			/>
		</div>

		<Input
			id="voornaam"
			label="Voornaam"
			required
			placeholder="Geef hier je voornaam in."
			value={gebruiker?.voornaam ?? ''}
			errors={form?.data?.voornaam}
		/>
		<Input
			id="familienaam"
			label="Familienaam"
			required
			placeholder="Geef hier je familienaam in."
			value={gebruiker?.familienaam ?? ''}
			errors={form?.data?.familienaam}
		/>
		<Input
			id="quote"
			label="Quote"
			placeholder="Geef hier je gewenste quote in."
			value={gebruiker?.quote ?? ''}
			errors={form?.data?.quote}
		/>
		<Input
			id="studierichting"
			label="Studierichting"
			placeholder="Geef hier je studierichting in."
			value={gebruiker?.studierichting ?? ''}
			errors={form?.data?.studierichting}
		/>
		<Input
			id="instagram"
			label="Instagram"
			value={gebruiker?.instagram ?? ''}
			errors={form?.data?.instagram}
		/>
		<Input
			id="woonplaats"
			label="Woonplaats"
			placeholder="Geef hier je woonplaats in."
			value={gebruiker?.woonplaats ?? ''}
			errors={form?.data?.woonplaats}
		/>
		<div class="modal-action">
			<button type="submit" formnovalidate formmethod="dialog" class="btn btn-ghost"
				>Annuleer</button
			>
			<button type="submit" class={`btn btn-outline ${loading ? 'loading loading-spinner' : ''}`}
				>Opslaan</button
			>
		</div>
	</form>
</dialog>
