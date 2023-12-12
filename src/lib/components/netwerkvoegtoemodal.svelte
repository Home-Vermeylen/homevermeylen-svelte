<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { LogIn, Pencil, Trash } from 'lucide-svelte';
	import { Avatar } from '.';
	import Input from './input.svelte';
	import { invalidateAll } from '$app/navigation';

	export let dialog: HTMLDialogElement;
	export let personen: any;

	let loading = false;

	const updateNetwerk = () => {
		loading = true;

		return async ({ result, update }: { result: any; update: any }) => {
			switch (result.type) {
				case 'success':
					toast.success('Netwerk aangepast.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'invalid':
					toast.error('Aanpassen netwerk mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
					await update();
					break;
				case 'error':
					toast.error('Aanpassen netwerk mislukt.', { style: 'border-radius: 200px; background: #333; color: #fff;' });
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

	let pagina: 'PERSOON' | 'CONNECTIE' = 'CONNECTIE';
</script>

<dialog bind:this={dialog} class="modal">
	<div class="modal-box flex flex-col gap-5 items-center align-middle">
		<div class="tabs">
			<button
				on:click={() => (pagina = 'CONNECTIE')}
				class={`tab tab-bordered ${pagina == 'CONNECTIE' ? 'tab-active' : ''}`}
			>
				Connectie
			</button>
			<button
				on:click={() => (pagina = 'PERSOON')}
				class={`tab tab-bordered ${pagina == 'PERSOON' ? 'tab-active' : ''}`}
			>
				Persoon
			</button>
		</div>
		{#if pagina == 'CONNECTIE'}
			<form
				method="post"
				use:enhance={updateNetwerk}
				action="?/nieuwe_connectie"
				class="flex flex-col gap-5 items-center"
			>
				<div class="flex flex-row items-center">
					<span>Persoon 1:</span>
					<select required name="id1" class="select w-full max-w-xs">
						<option disabled selected> Kies een persoon </option>
						{#each personen as persoon (persoon.id)}
							<option value={persoon.id}>{persoon.label}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-row items-center">
					<span>Persoon 2:</span>
					<select required name="id2" class="select w-full max-w-xs">
						<option disabled selected> Kies een persoon </option>
						{#each personen as persoon (persoon.id)}
							<option value={persoon.id}>{persoon.label}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-row gap-2 items-center">
					<span>Type: </span>
					<select required name="type" class="select w-full max-w-xs">
						<option value="GEMUILD" selected> Gemuild </option>
						<option value="SEKS">Seks</option>
						<option value="RELATIE">Relatie</option>
					</select>
				</div>
				<Input id="locatie" label="Locatie" placeholder="Geef hier de locatie in." errors={null} />
				<Input
					id="commentaar"
					label="Commentaar"
					placeholder="Geef hier commentaar in."
					errors={null}
				/>
				<div class="modal-action">
					<button type="submit" formmethod="dialog" class="btn btn-ghost">Annuleer</button>
					<button
						type="submit"
						class={`btn btn-outline ${loading ? 'loading loading-spinner' : ''}`}>Opslaan</button
					>
				</div>
			</form>
		{:else}
			<form method="post" use:enhance={updateNetwerk} action="?/nieuwe_persoon">
				<Input
					id="naam"
					label="Naam"
					errors={null}
					placeholder="Geef hier de naam van de persoon in."
				/>
				<Input
					id="club"
					label="Club"
					errors={null}
					placeholder="Geef hier de club van de persoon in."
				/>
				<div class="modal-action">
					<button type="submit" formmethod="dialog" class="btn btn-ghost">Annuleer</button>
					<button
						type="submit"
						class={`btn btn-outline ${loading ? 'loading loading-spinner' : ''}`}>Opslaan</button
					>
				</div>
			</form>
		{/if}
	</div>
</dialog>
