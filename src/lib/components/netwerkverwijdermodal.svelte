<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Trash, ChevronDown } from 'lucide-svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	interface Props {
		personen: any[];
		connecties: any[];
		onclose: () => void;
	}

	let zoekterm = $state('');
	let uitgeklapte_persoon = $state<string | null>(null);

	let { personen, connecties, onclose }: Props = $props();

	let foutmelding = $state('');
	let bevestiging_open = $state(false);
	let actie_na_bevestiging = $state<(() => Promise<void>) | null>(null);

	function anderePersoon(connectie: any, persoonId: string) {
		const andereId = connectie.from === persoonId ? connectie.to : connectie.from;
		return personen.find((persoon) => persoon.id === andereId);
	}

	function vraagBevestiging(actie: () => Promise<void>) {
	actie_na_bevestiging = actie;
	bevestiging_open = true;
}

	async function verwijderConnectie(connectie: any) {
		foutmelding = '';

		try {
			const response = await fetch('/api/vriendschapsnetwerk/verwijder_connectie', {
				method: 'POST',
				body: new URLSearchParams({
					id1: connectie.from,
					id2: connectie.to,
					type: connectie.label
				})
			});

			if (!response.ok) {
				foutmelding = 'De connectie kon niet worden verwijderd.';
				return;
			}

			onclose();
		} catch (error) {
			console.error('Fout bij verwijderen connectie:', error);
			foutmelding = 'Er ging iets mis bij het verwijderen.';
		}
	}

	async function verwijderPersoon(persoonId: string) {
	foutmelding = '';

	try {
		const response = await fetch('/api/vriendschapsnetwerk/verwijder_persoon', {
			method: 'POST',
			body: new URLSearchParams({
				id: persoonId
			})
		});

		if (!response.ok) {
			foutmelding = 'De persoon kon niet worden verwijderd.';
			return;
		}

		onclose();
	} catch (error) {
		console.error('Fout bij verwijderen persoon:', error);
		foutmelding = 'Er ging iets mis bij het verwijderen.';
	}
}
</script>

<Dialog.Root
	open={true}
	onOpenChange={(open) => {
		if (!open) onclose();
	}}
>
	<Dialog.Content class="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
	<Dialog.Header>
		<Dialog.Title>Personen en connecties beheren</Dialog.Title>
		<Dialog.Description>
			Zoek een persoon en klap deze open om de connecties te bekijken of te verwijderen.
		</Dialog.Description>
	</Dialog.Header>

	<input
		type="search"
		placeholder="Zoek op naam of club..."
		bind:value={zoekterm}
		class="w-full rounded-md border bg-background px-3 py-2 text-sm"
	/>

	{#if foutmelding}
		<p class="text-sm text-destructive">{foutmelding}</p>
	{/if}

	<div class="flex flex-col gap-2">
		{#each personen.filter((persoon) =>
			`${persoon.label} ${persoon.group}`.toLowerCase().includes(zoekterm.toLowerCase())
		) as persoon (persoon.id)}
			<div class="rounded-lg border">
				<div class="flex items-center justify-between gap-3 p-3">
					<button
						type="button"
						class="flex min-w-0 flex-1 flex-col items-start text-left"
						onclick={() => {
							uitgeklapte_persoon =
								uitgeklapte_persoon === persoon.id ? null : persoon.id;
						}}
					>
						<span class="font-medium">{persoon.label}</span>
						<span class="text-sm text-muted-foreground">{persoon.group}</span>
					</button>
<ChevronDown
	class={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
		uitgeklapte_persoon === persoon.id ? 'rotate-180' : ''
	}`}
/>

					<button
						type="button"
						class="btn btn-square btn-error"
						onclick={() => vraagBevestiging(() => verwijderPersoon(persoon.id))}
					>
						<Trash class="h-4 w-4" />
					</button>
				</div>

				{#if uitgeklapte_persoon === persoon.id}
	{@const persoonConnecties = connecties.filter(
		(c) => c.from === persoon.id || c.to === persoon.id
	)}

	<div class="border-t bg-muted/30 p-3">

	<p class="mb-3 text-sm font-medium">Connecties</p>

		{#if persoonConnecties.length > 0}
			<div class="flex flex-col gap-2">
				{#each persoonConnecties as connectie (connectie.id)}
					{@const andere = anderePersoon(connectie, persoon.id)}

					<div class="flex items-center justify-between gap-3 rounded-md border bg-background p-3">
						<div class="min-w-0">
							<p class="text-sm font-medium">{andere?.label}</p>
							<p class="text-xs text-muted-foreground">
								{connectie.label} · {andere?.group}
							</p>
						</div>

						<button
							type="button"
							class="text-sm text-destructive hover:underline"
							onclick={() => vraagBevestiging(() => verwijderConnectie(connectie))}
						>
							Verwijder
						</button>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-sm text-muted-foreground">
				Deze persoon heeft nog geen connecties.
			</p>
		{/if}
	</div>
{/if}
			</div>
		{/each}

		{#if personen.filter((persoon) =>
			`${persoon.label} ${persoon.group}`.toLowerCase().includes(zoekterm.toLowerCase())
		).length === 0}
			<p class="py-6 text-center text-sm text-muted-foreground">
				Geen personen gevonden.
			</p>
		{/if}
	</div>
</Dialog.Content>
	<AlertDialog.Root bind:open={bevestiging_open}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Ben je zeker?</AlertDialog.Title>
			<AlertDialog.Description>
				Deze verwijderactie kan niet ongedaan gemaakt worden.
			</AlertDialog.Description>
		</AlertDialog.Header>

		<AlertDialog.Footer>
			<AlertDialog.Cancel>Annuleren</AlertDialog.Cancel>
			<AlertDialog.Action
				onclick={async (event) => {
					event.preventDefault();

					if (actie_na_bevestiging) {
						await actie_na_bevestiging();
					}

					bevestiging_open = false;
					actie_na_bevestiging = null;
				}}
			>
				Verwijderen
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
</Dialog.Root>