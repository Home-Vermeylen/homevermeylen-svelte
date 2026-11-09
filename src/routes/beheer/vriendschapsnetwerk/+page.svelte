<script lang="ts">
	import Netwerkdetailmodal from '$lib/components/netwerkdetailmodal.svelte';
	import Netwerkverwijdermodal from '$lib/components/netwerkverwijdermodal.svelte';
	import Netwerkvoegtoemodal from '$lib/components/netwerkvoegtoemodal.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash, UserPlus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { Network } from 'vis-network';
	import type { PageData } from './$types';
	import { pushState } from '$app/navigation';

	let { data } = $props();

	let personen = $state<any[]>([]);
	let connecties = $state<any[]>([]);
	let legende = $state<{ club: string; kleur: string }[]>([]);

	let netwerk: Network | null = null;
	let geselecteerde_node = $state(null);
	let voeg_toe_modal_open = $state(false);
	let verwijder_modal_open = $state(false);

	async function laadNetwerk() {
	const div = document.getElementById('canvas');

	if (!div) return;

	const response = await fetch('/api/vriendschapsnetwerk');

	if (!response.ok) {
		console.error('Netwerk kon niet worden geladen.');
		return;
	}

	const res = await response.json();
	personen = res.netwerk_data.nodes;
connecties = res.netwerk_data.edges;
legende = res.legende ?? [];

	const vis = await import('vis-network');

	if (netwerk) {
		netwerk.destroy();
	}

	netwerk = new vis.Network(div, res.netwerk_data, res.opties);

	netwerk.on('selectNode', (t) => {
		geselecteerde_node = res.netwerk_data.nodes.find(
			(val: { id: string }) => val.id == t.nodes[0]
		);

		pushState('', { netwerk_detail_modal: true });
	});
}

	onMount(() => {
		laadNetwerk();
	});
</script>

{#if data.netwerk.nieuw_academiejaar_nodig}
	<div class="mt-10 flex flex-col items-center gap-4">
		<h2 class="text-xl font-semibold">Nieuw academiejaar toevoegen?</h2>

		<Button
			onclick={async () => {
				const response = await fetch('/api/vriendschapsnetwerk/nieuw', {
					method: 'POST'
				});

				if (response.ok) {
					location.reload();
				}
			}}
		>
			Nieuw academiejaar toevoegen
		</Button>
	</div>
{/if}

<div class="mt-5 flex h-screen w-full flex-col items-center gap-10 overflow-clip cursor-crosshair">
	<div class="flex flex-row gap-4 self-center">
		<Button
			onclick={() => {
				voeg_toe_modal_open = true;
			}}
		>
			<UserPlus class="h-4 w-4" />
			Voeg Toe
		</Button>

		<Button
	onclick={() => {
		verwijder_modal_open = true;
	}}
>
	<Trash class="h-4 w-4" />
	Verwijder
</Button>
	</div>

	{#if legende.length > 0}
	<div class="flex w-full flex-wrap justify-center gap-x-5 gap-y-2 px-4">
		{#each legende as item}
			<div class="flex items-center gap-2 text-sm">
				<span
	class="h-3 w-3 shrink-0 rounded-full border-2"
	style={`background-color: ${item.kleur}; border-color: ${item.kleur.replace('85%)', '55%)')}`}
></span>
				<span>{item.club}</span>
			</div>
		{/each}
	</div>
{/if}

<div id="canvas" class="h-full w-full"></div>
</div>

{#if voeg_toe_modal_open}
	<Netwerkvoegtoemodal
		data={data}
		onclose={() => {
			voeg_toe_modal_open = false;
			laadNetwerk();
		}}
	/>
{/if}

{#if verwijder_modal_open}
	<Netwerkverwijdermodal
		personen={personen}
		connecties={connecties}
		onclose={() => {
			verwijder_modal_open = false;
			laadNetwerk();
		}}
	/>
{/if}