<script lang="ts">
	import Netwerkdetailmodal from '$lib/components/netwerkdetailmodal.svelte';
	import Netwerkverwijdermodal from '$lib/components/netwerkverwijdermodal.svelte';
	import Netwerkvoegtoemodal from '$lib/components/netwerkvoegtoemodal.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash, UserPlus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { Network } from 'vis-network';
	import type { PageData } from './$types';

	export let data: PageData;

	let netwerk: Network | null = null;
	let netwerkverwijdermodal_open = false;
	let netwerkvoegtoemodal_open = false;
	let netwerkdetailmodal_open = false;

	let geselecteerde_node = null;

	onMount(() => {
		let div = document.getElementById('canvas');

		if (div) {
			data.netwerk.then((res) => {
				import('vis-network').then((vis) => {
					netwerk = new vis.Network(div, res.netwerk_data, res.opties);

					netwerk.on('selectNode', (t) => {
						geselecteerde_node = res.netwerk_data.nodes.find(
							(val: { id: string; }) => val.id == t.nodes[0]
						);
						netwerkdetailmodal_open = true;
					});
				});
			});
		}
	})
</script>

{#await data.netwerk then netwerk}
	<Netwerkdetailmodal
		bind:geselecteerde_node
		bind:modal_open={netwerkdetailmodal_open}
		personen={netwerk.netwerk_data.nodes}
		connecties={netwerk.netwerk_data.edges}
	/>
	<Netwerkverwijdermodal
		bind:modal_open={netwerkverwijdermodal_open}
		personen={netwerk.netwerk_data.nodes}
		connecties={netwerk.netwerk_data.edges}
	/>
	<Netwerkvoegtoemodal bind:modal_open={netwerkvoegtoemodal_open} nieuwe_persoon_data={data.nieuwe_persoon_form} nieuwe_connectie_data={data.nieuwe_connectie_form} personen={netwerk.netwerk_data.nodes} />
{/await}
<div class="w-full h-screen flex flex-col items-center gap-10 mt-5 overflow-clip cursor-crosshair">
	<div class="flex flex-row gap-4 self-center">
		<Button
			on:click={() => {
				netwerkvoegtoemodal_open = true
			}}><UserPlus class="h-4 w-4" /> Voeg Toe</Button
		>
		<Button on:click={() => { netwerkverwijdermodal_open = true }}>
			<Trash class="h-4 w-4" /> Verwijder
		</Button>
	</div>
	<div id="canvas" class="w-full h-full" />
</div>
