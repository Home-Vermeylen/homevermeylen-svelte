<script lang="ts">
	import { Netwerkdetailmodal, Netwerkvoegtoemodal } from '$lib/components';
	import Netwerkverwijdermodal from '$lib/components/netwerkverwijdermodal.svelte';
	import { Trash, UserPlus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { Network } from 'vis-network';

	export let data;

	let netwerk: Network | null = null;
	let netwerkverwijdermodal: HTMLDialogElement;
	let netwerkvoegtoemodal: HTMLDialogElement;
	let netwerkdetailmodal: HTMLDialogElement;

	let geselecteerde_node: any = null;

	onMount(() => {
		let div = document.getElementById('canvas');

		if (div) {
			data.netwerk.then((res) => {
				import('vis-network').then((vis) => {
					netwerk = new vis.Network(div!, res.netwerk_data, res.opties);

					netwerk.on('selectNode', (t: any) => {
						geselecteerde_node = res.netwerk_data.nodes.find(
							(val: any) => val.id == t.nodes[0]
						);
						netwerkdetailmodal.showModal();
					});
				});
			});
		}
	});
</script>

{#await data.netwerk then netwerk}
	<Netwerkdetailmodal
		bind:geselecteerde_node
		bind:dialog={netwerkdetailmodal}
		personen={netwerk.netwerk_data.nodes}
		connecties={netwerk.netwerk_data.edges}
	/>
	<Netwerkverwijdermodal
		bind:dialog={netwerkverwijdermodal}
		personen={netwerk.netwerk_data.nodes}
		connecties={netwerk.netwerk_data.edges}
	/>
	<Netwerkvoegtoemodal bind:dialog={netwerkvoegtoemodal} personen={netwerk.netwerk_data.nodes} />
{/await}
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
