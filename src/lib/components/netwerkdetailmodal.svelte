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
	class="modal modal-scroll h-max"
	on:cancel={sluit_modal}
>
	<div class="modal-box flex flex-col space-y-5">
		{#if geselecteerde_node}
			<h3 class="text-center font-bold text-lg">
				<b>{geselecteerde_node.label}</b> <i>({geselecteerde_node.group})</i>
			</h3>
			<ol>
				{#each connecties.filter((c) => {
					return c.from == geselecteerde_node.id;
				}) as connectie (connectie.id)}
					<li class="flex flex-col">
						Wat? {connectie.color.color == '#a3f307'
							? 'Gemuild'
							: connectie.color.color == '#05f9e2'
							? 'Seks'
							: 'Relatie'} met {personen[connectie.to - 1]?.label} ({personen[connectie.to - 1]
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
							: 'Relatie'} met {personen[connectie.from - 1]?.label} ({personen[connectie.from - 1]
							?.group})
					</li>
				{/each}
			</ol>
		{/if}
	</div>
</dialog>
