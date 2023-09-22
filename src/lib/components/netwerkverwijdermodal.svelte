<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import Input from './input.svelte';
	import { LogIn, Pencil, Trash } from 'lucide-svelte';
	import { Avatar } from '.';

	export let dialog: HTMLDialogElement;
	export let personen: any;
	export let connecties: any;

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
</script>

<dialog
	bind:this={dialog}
	id="verslag_modal"
	class="modal modal-scroll h-max"
	on:cancel={sluit_modal}
>
	<form
		use:enhance={updateNetwerk}
		method="post"
		action="?/update"
		enctype="multipart/form-data"
		class="modal-box flex flex-col space-y-5"
	>
		<h3 class="text-center font-bold text-lg">Verwijder Persoon / Actie</h3>

		{#each personen as persoon (persoon.id)}
			<div class="flex flex-col">
				<div class="flex flex-row justify-between">
					<div>
						<h2><b>{persoon.label}</b> <i>({persoon.group})</i></h2>
						<ol>
							{#each connecties.filter((c) => {
								return c.from == persoon.id;
							}) as connectie (connectie.id)}
								<li class="flex flex-col">
									Wat? {connectie.color.color == '#a3f307'
										? 'Gemuild'
										: connectie.color.color == '#05f9e2'
										? 'Seks'
										: 'Relatie'} met {personen[connectie.to - 1]?.label} ({personen[
										connectie.to - 1
									]?.group})

									<form method="post" use:enhance={updateNetwerk} action="?/verwijder_connectie">
										<input
											type="hidden"
											name="type"
											value={connectie.color.color == '#a3f307'
												? 'GEMUILD'
												: connectie.color.color == '#05f9e2'
												? 'SEKS'
												: 'RELATIE'}
										/>
										<input type="hidden" name="id1" value={connectie.from} />
										<input type="hidden" name="id2" value={connectie.to} />
										<button type="submit" class="link italic">verwijder</button>
									</form>
								</li>
							{/each}
							{#each connecties.filter((c) => {
								return c.to == persoon.id;
							}) as connectie (connectie.id)}
								<li class="flex flex-col">
									Wat? {connectie.color.color == '#a3f307'
										? 'Gemuild'
										: connectie.color.color == '#05f9e2'
										? 'Seks'
										: 'Relatie'} met {personen[connectie.from - 1]?.label} ({personen[
										connectie.from - 1
									]?.group})

									<form method="post" use:enhance={updateNetwerk} action="?/verwijder_connectie">
										<input
											type="hidden"
											name="type"
											value={connectie.color.color == '#a3f307'
												? 'GEMUILD'
												: connectie.color.color == '#05f9e2'
												? 'SEKS'
												: 'RELATIE'}
										/>
										<input type="hidden" name="id1" value={connectie.from} />
										<input type="hidden" name="id2" value={connectie.to} />
										<button type="submit" class="link italic">verwijder</button>
									</form>
								</li>
							{/each}
						</ol>
					</div>
					<div>
						<form method="post" use:enhance={updateNetwerk} action="?/verwijder_persoon">
							<input type="hidden" name="id" value={persoon.id} />
							<button type="submit" class="btn btn-square btn-error"
								><Trash class="h-4 w-4" /></button
							>
						</form>
					</div>
				</div>
				<div class="divider" />
			</div>
		{/each}
	</form>
</dialog>
