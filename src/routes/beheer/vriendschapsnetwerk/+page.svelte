<script lang="ts">
	import { Netwerkvoegtoemodal } from '$lib/components';
	import Netwerkverwijdermodal from '$lib/components/netwerkverwijdermodal.svelte';
	import { Trash, UserPlus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data;

	let netwerk: any | null = null;
	let netwerkverwijdermodal: HTMLDialogElement;
	let netwerkvoegtoemodal: HTMLDialogElement;

	let geselecteerde_persoon: {
		naam: string | null;
		club: string | null;
	};

	onMount(() => {
		let div = document.getElementById('canvas');

		if (div) {
			import('vis-network').then((vis) => {
				netwerk = new vis.Network(div!, data.netwerk_data, data.opties);

				netwerk.on('selectNode', () => {

				});
			});
		}
	})
</script>

<Netwerkverwijdermodal
	bind:dialog={netwerkverwijdermodal}
	personen={data.netwerk_data.nodes}
	connecties={data.netwerk_data.edges}
/>
<Netwerkvoegtoemodal bind:dialog={netwerkvoegtoemodal} personen={data.netwerk_data.nodes} />
<div class="w-full h-screen flex flex-col items-center gap-10 mt-5 overflow-clip cursor-crosshair">
	<div class="flex flex-row gap-4 self-center">
		<button
			class="btn"
			on:click={() => {
				netwerkvoegtoemodal.showModal();
			}}><UserPlus class="h-4 w-4" /> Voeg Toe</button
		>
		<button
			class="btn btn-error"
			on:click={() => {
				netwerkverwijdermodal.showModal();
			}}><Trash class="h-4 w-4" /> Verwijder</button
		>
	</div>
	<div id="canvas" class="w-full h-full" />
</div>
