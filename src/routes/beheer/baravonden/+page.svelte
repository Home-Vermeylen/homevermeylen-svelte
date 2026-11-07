<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { columns } from './columns.js';
	import { CalendarPlus } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { pushState, replaceState, goto } from '$app/navigation';
	import Baravondmodal from './baravondmodal.svelte';

	type Baravond = {
		id: string;
		naam?: string;
		datum?: Date | string;
		praesidium?: string;
		afgesloten?: boolean;
		expand?: {
			praesidium?: {
				id: string;
				academiejaar?: string;
				naam?: string;
			};
		};
	};

	type PraesidiumOptie = {
		id: string;
		naam: string;
	};

	let { data } = $props();

	let geselecteerdeBaravond: any = $state(null);
	let geselecteerdPraesidium = $state('');

	function nieuweBaravond() {
		geselecteerdeBaravond = null;
		pushState('', { ...$page.state, baravond_modal: true });
	}

	function bewerkBaravond(baravond: any) {
		geselecteerdeBaravond = baravond;
		pushState('', { ...$page.state, baravond_modal: true });
	}

	function sluitModal() {
		replaceState('', { ...$page.state, baravond_modal: false });
	}
</script>

{#if $page.state.baravond_modal}
	<Baravondmodal
		data={data.baravonden_form}
		baravond={geselecteerdeBaravond}
		onClose={sluitModal}
	/>
{/if}

<div class="flex flex-col gap-4">
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
	<h1 class="text-2xl font-bold">Baravonden</h1>

	<div class="flex flex-wrap gap-2">
		<Button
			variant="outline"
			onclick={() => goto('/beheer/baravonden/druktebarometer')}
		>
			Druktebarometer
		</Button>

		<Button onclick={nieuweBaravond}>
			<CalendarPlus class="h-4 w-4" />
			Nieuwe baravond
		</Button>
	</div>
</div>

	{#await data.baravonden_promise}
		<div class="flex items-center space-x-4">
			<Skeleton class="size-12 rounded-full" />
			<div class="space-y-2">
				<Skeleton class="h-4 w-[250px]" />
				<Skeleton class="h-4 w-[200px]" />
			</div>
		</div>
	{:then baravonden}
		{@const praesidia: PraesidiumOptie[] = Array.from(
			new Map<string, PraesidiumOptie>(
				(baravonden as Baravond[]).map((b) => [
					b.praesidium ?? '',
					{
						id: b.praesidium ?? '',
						naam: b.expand?.praesidium?.academiejaar ?? 'Onbekend'
					}
				])
			).values()
		).filter((p) => p.id !== '')}

		{@const gesorteerdePraesidia = praesidia.sort((a, b) =>
			b.naam.localeCompare(a.naam, 'nl', { numeric: true })
		)}

		{@const actiefPraesidium =
			geselecteerdPraesidium || gesorteerdePraesidia[0]?.id || ''}

		{#if praesidia.length > 0}
			<div class="flex flex-col gap-2">
				<label for="praesidium-select" class="text-sm font-medium">
					Academiejaar
				</label>

				<select
					id="praesidium-select"
					class="w-full rounded-md border bg-background px-3 py-2 text-sm sm:w-[280px]"
					value={actiefPraesidium}
					onchange={(event) => (geselecteerdPraesidium = event.currentTarget.value)}
				>
					{#each gesorteerdePraesidia as praesidium (praesidium.id)}
						<option value={praesidium.id}>
							{praesidium.naam}
						</option>
					{/each}
				</select>
			</div>

			<DataTable
	modelsPerPage={1000}
	data={(baravonden as Baravond[]).filter(
		(b) => b.praesidium === actiefPraesidium
	)}
	{columns}
	initialSorting={[{ id: 'datum', desc: true }]}
	onRowClick={(baravond) =>
	goto(
		baravond.afgesloten
			? `/beheer/baravonden/${baravond.id}/overzicht`
			: `/beheer/baravonden/${baravond.id}`
	)}
	hidePagination={true}
/>
		{:else}
			<p class="text-sm text-muted-foreground">
				Er zijn nog geen baravonden.
			</p>
		{/if}
	{:catch}
		<p class="text-destructive">
			De baravonden konden niet worden opgehaald.
		</p>
	{/await}
</div>