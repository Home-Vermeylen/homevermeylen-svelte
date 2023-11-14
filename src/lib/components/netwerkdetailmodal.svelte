<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import { Trash } from 'lucide-svelte';

	export let dialog: HTMLDialogElement;
	export let geselecteerde_node: any;
	export let personen: any;
	export let connecties: any;

	const sluit_modal = () => {
		dialog.close();
	};
</script>

<dialog
	bind:this={dialog}
	id="verslag_modal"
	class="modal"
	on:cancel={sluit_modal}
>
	<div class="modal-box flex flex-col space-y-5">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		  </form>
		{#if geselecteerde_node}
			<h3 class="font-bold text-lg">
				<b>{geselecteerde_node.label}</b> <i>({geselecteerde_node.group})</i>
			</h3>
			<ul>
				{#each connecties.filter((c) => {
					if (geselecteerde_node.id == 17 && (c.from == geselecteerde_node.id || c.to == geselecteerde_node.id) ) {
						console.log(c)
					}
					return c.from == geselecteerde_node.id;
				}) as connectie (connectie.id)}
					<li class="flex flex-col">
						Wat? {connectie.color.color == '#a3f307'
							? 'Gemuild'
							: connectie.color.color == '#05f9e2'
							? 'Seks'
							: 'Relatie'} met {personen.find((p) => p.id == connectie.to)?.label} ({personen.find((p) => p.id == connectie.to)
							?.group})
					</li>
				{/each}
				{#each connecties.filter((c) => {
					return c.to == geselecteerde_node.id;
				}) as connectie (connectie.id)}
					<li class="flex flex-col">
						Wat? {connectie.color.color == '#a3f307'
							? 'Gemuild'
							: connectie.color.color == '#05f9e2'
							? 'Seks'
							: 'Relatie'} met {personen.find((p) => p.id == connectie.from)?.label} ({personen.find((p) => p.id == connectie.from)
							?.group})
						 {#if connectie.locatie}
						 	Waar? {connectie.locatie}
						 {/if}
						 {#if connectie.commentaar}
							Commentaar: {connectie.commentaar}
						 {/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</dialog>
