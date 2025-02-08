<script lang="ts">
	import Netwerkdetailmodal from '$lib/components/netwerkdetailmodal.svelte';
	import Netwerkverwijdermodal from '$lib/components/netwerkverwijdermodal.svelte';
	import Netwerkvoegtoemodal from '$lib/components/netwerkvoegtoemodal.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash, UserPlus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Network } from 'vis-network';
	import type { PageData } from './$types';
	import { pushState } from '$app/navigation';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let netwerk: Network | null = null;

	let geselecteerde_node = $state(null);

	onMount(() => {
		let div = document.getElementById('canvas');

		if (div) {
			data.netwerk.then((res) => {
				import('vis-network').then((vis) => {
					netwerk = new vis.Network(div, res.netwerk_data, res.opties);

					netwerk.on('selectNode', (t) => {
						geselecteerde_node = res.netwerk_data.nodes.find(
							(val: { id: string }) => val.id == t.nodes[0]
						);
						pushState('', { netwerk_detail_modal: true });
					});
				});
			});
		}
	});
</script>

{#await data.netwerk then netwerk}
	{#if $page.state.netwerk_detail_modal}
		<Netwerkdetailmodal
			bind:geselecteerde_node
			personen={netwerk.netwerk_data.nodes}
			connecties={netwerk.netwerk_data.edges}
		/>
	{/if}
	{#if $page.state.netwerk_verwijder_modal}
		<Netwerkverwijdermodal
			personen={netwerk.netwerk_data.nodes}
			connecties={netwerk.netwerk_data.edges}
		/>
	{/if}
	{#if $page.state.netwerk_voeg_toe_modal}
		<Netwerkvoegtoemodal
			nieuwe_persoon_data={data.nieuwe_persoon_form}
			nieuwe_connectie_data={data.nieuwe_connectie_form}
			personen={netwerk.netwerk_data.nodes}
		/>
	{/if}
{/await}
<div class="w-full h-screen flex flex-col items-center gap-10 mt-5 overflow-clip cursor-crosshair">
	<div class="flex flex-row gap-4 self-center">
		<Button
			onclick={() => {
				pushState('', { netwerk_voeg_toe_modal: true });
			}}><UserPlus class="h-4 w-4" /> Voeg Toe</Button
		>
		<Button
			onclick={() => {
				pushState('', { netwerk_verwijder_modal: true });
			}}
		>
			<Trash class="h-4 w-4" /> Verwijder
		</Button>
	</div>
	<div id="canvas" class="w-full h-full"></div>
</div>
