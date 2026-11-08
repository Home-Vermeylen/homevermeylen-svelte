<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Plus, Minus, RefreshCw } from 'lucide-svelte';
	import { onMount } from 'svelte';

	type Drankje = {
		id: string;
		naam: string;
		foto?: string;
		fotoUrl: string | null;
		collectionId: string;
		collectionName: string;
		created: string;
		updated: string;
		expand?: Record<string, any>;
	};

	type PendingActie = {
		actie_id: string;
		drankjeId: string;
		verschil: number;
	};

	let {
		data
	}: {
		data: {
			baravond: any;
			drankjes: Drankje[];
			tellingen: {
				drankje: string;
				aantal: number;
				praesidium_lid: string;
			}[];
			praesidiumLidId: string;
		};
	} = $props();

	const mijnTellingen = data.tellingen.filter(
		(telling) => telling.praesidium_lid === data.praesidiumLidId
	);

	const beginAantallen = Object.fromEntries(
		mijnTellingen.map((telling) => [telling.drankje, telling.aantal])
	);

	let aantallen = $state<Record<string, number>>({ ...beginAantallen });

	// Eén globale wachtrij voor alle drankjes.
	// Hierdoor wordt altijd maar één request tegelijk naar PocketHost gestuurd.
	let wachtrij = $state<PendingActie[]>([]);

	let bezigMetOpslaan = $state(false);
	let opslagFouten = $state<Record<string, string>>({});

	// Bulk invoer
	let bulkInvoerVoor = $state<string | null>(null);
	let bulkAantal = $state('5');

	// Detectie van lang indrukken
	let indrukTimer: ReturnType<typeof setTimeout> | undefined;
	let langeDrukActiefVoor: string | null = null;

	let heeftOpslagFouten = $derived(
		Object.values(opslagFouten).some((fout) => fout !== '')
	);

	let heeftOpenstaandeActies = $derived(wachtrij.length > 0);

	// Verhoog of verlaag onmiddellijk het zichtbare aantal
	function wijzigAantal(id: string, verschil: number) {
		const huidigAantal = aantallen[id] ?? 0;
		const nieuwAantal = huidigAantal + verschil;

		if (nieuwAantal < 0) return;

		// Optimistische UI: onmiddellijk zichtbaar aanpassen.
		aantallen[id] = nieuwAantal;
		opslagFouten[id] = '';

		const actie: PendingActie = {
			actie_id: crypto.randomUUID(),
			drankjeId: id,
			verschil
		};

		// Actie achteraan de globale wachtrij plaatsen.
		wachtrij = [...wachtrij, actie];

		// Start de globale verwerking.
		void verwerkWachtrij();
	}

	// Verwerk alle acties één voor één.
	async function verwerkWachtrij() {
		if (bezigMetOpslaan) return;
		if (wachtrij.length === 0) return;

		bezigMetOpslaan = true;

		try {
			while (wachtrij.length > 0) {
				const actie = wachtrij[0];

				const response = await fetch('/api/drankentellingen', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						baravond: data.baravond.id,
						drankje: actie.drankjeId,
						praesidium_lid: data.praesidiumLidId,
						verschil: actie.verschil,
						actie_id: actie.actie_id
					})
				});

				const resultaat = await response.json().catch(() => ({}));

				if (!response.ok) {
					console.error('API-fout drankentelling:', {
						status: response.status,
						statusText: response.statusText,
						resultaat
					});

					opslagFouten[actie.drankjeId] =
						resultaat.detail ??
						resultaat.error ??
						`De actie kon niet worden opgeslagen (${response.status}).`;

					// De actie blijft vooraan staan.
					// Zo kan "Opnieuw proberen" exact dezelfde actie_id opnieuw versturen.
					throw new Error(opslagFouten[actie.drankjeId]);
				}

				// Alleen verwijderen nadat PocketHost de actie bevestigd heeft.
				wachtrij = wachtrij.slice(1);
			}
		} catch (error) {
			console.error('Fout bij opslaan telactie:', error);
		} finally {
			bezigMetOpslaan = false;
		}
	}

	// Probeer de eerste mislukte actie van dit drankje opnieuw.
	function probeerOpnieuw(id: string) {
		opslagFouten[id] = '';

		// De mislukte actie staat nog steeds in de globale wachtrij.
		void verwerkWachtrij();
	}

	// Start de timer voor lang indrukken
	function startLangIndrukken(id: string) {
		clearTimeout(indrukTimer);

		langeDrukActiefVoor = null;

		indrukTimer = setTimeout(() => {
			langeDrukActiefVoor = id;
			bulkInvoerVoor = id;
			bulkAantal = '5';
		}, 500);
	}

	// Stop de timer wanneer de knop wordt losgelaten
	function stopLangIndrukken() {
		clearTimeout(indrukTimer);
	}

	// Annuleer de volledige drukactie wanneer de aanwijzer de knop verlaat
	function annuleerLangIndrukken() {
		clearTimeout(indrukTimer);
		langeDrukActiefVoor = null;
	}

	// Gewone klik of lang indrukken verwerken
	function klikPlus(id: string) {
		if (langeDrukActiefVoor === id) {
			langeDrukActiefVoor = null;
			return;
		}

		wijzigAantal(id, 1);
	}

	// Bulkactie toevoegen
	function voegBulkToe(id: string) {
		const aantal = Number(bulkAantal);

		if (!Number.isInteger(aantal) || aantal < 1 || aantal > 100) {
			return;
		}

		wijzigAantal(id, aantal);
		bulkInvoerVoor = null;
	}

	function waarschuwBijVerlaten(event: BeforeUnloadEvent) {
		if (heeftOpenstaandeActies) {
			event.preventDefault();
			event.returnValue = '';
		}
	}

	onMount(() => {
		window.addEventListener('beforeunload', waarschuwBijVerlaten);

		return () => {
			window.removeEventListener('beforeunload', waarschuwBijVerlaten);
			clearTimeout(indrukTimer);
		};
	});
</script>

<svelte:head>
	<title>{data.baravond.naam} | Baravond</title>
</svelte:head>

<div class="flex flex-col gap-6">
	<div class="text-sm">
		{#if heeftOpslagFouten}
			<p class="font-medium text-destructive">
				Er zijn acties die niet opgeslagen konden worden. Probeer opnieuw.
			</p>
		{:else if bezigMetOpslaan}
			<p class="text-muted-foreground">
				Tellingen worden opgeslagen...
			</p>
		{:else if heeftOpenstaandeActies}
			<p class="text-muted-foreground">
				Er staan nog acties klaar om op te slaan.
			</p>
		{:else}
			<p class="text-green-600">
				Alle tellingen zijn opgeslagen.
			</p>
		{/if}
	</div>

	<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-bold">{data.baravond.naam}</h1>
			<p class="text-muted-foreground">
				{new Date(data.baravond.datum).toLocaleDateString('nl-BE', {
					day: 'numeric',
					month: 'long',
					year: 'numeric'
				})}
			</p>
		</div>

		<a
			href={`/beheer/baravonden/${data.baravond.id}/overzicht`}
			class="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
		>
			Verkoopoverzicht
		</a>
	</div>

	<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
		{#each data.drankjes as drankje (drankje.id)}
			<div class="overflow-hidden rounded-lg border">
				{#if drankje.fotoUrl}
					<img
						src={drankje.fotoUrl}
						alt={drankje.naam}
						class="h-32 w-full object-cover"
					/>
				{:else}
					<div
						class="flex h-32 items-center justify-center bg-muted text-sm text-muted-foreground"
					>
						Geen foto
					</div>
				{/if}

				<div class="flex flex-col gap-3 p-3">
					<h2 class="text-center font-semibold">{drankje.naam}</h2>

					<div class="flex items-center justify-between gap-2">
						<Button
							variant="outline"
							size="icon"
							class="h-11 w-11 shrink-0"
							onclick={() => wijzigAantal(drankje.id, -1)}
							disabled={(aantallen[drankje.id] ?? 0) === 0}
						>
							<Minus class="h-5 w-5" />
						</Button>

						<span class="text-2xl font-bold tabular-nums">
							{aantallen[drankje.id] ?? 0}
						</span>

						<Button
							size="icon"
							class="h-11 w-11 shrink-0 select-none touch-manipulation"
							onpointerdown={() => startLangIndrukken(drankje.id)}
							onpointerup={stopLangIndrukken}
							onpointerleave={annuleerLangIndrukken}
							onpointercancel={annuleerLangIndrukken}
							onclick={() => klikPlus(drankje.id)}
						>
							<Plus class="h-5 w-5" />
						</Button>
					</div>

					{#if bulkInvoerVoor === drankje.id}
						<form
							class="flex flex-col gap-2"
							onsubmit={(event) => {
								event.preventDefault();
								voegBulkToe(drankje.id);
							}}
						>
							<label class="text-center text-sm font-medium" for="bulk-aantal">
								Hoeveel drankjes toevoegen?
							</label>

							<input
								id="bulk-aantal"
								bind:value={bulkAantal}
								type="number"
								min="1"
								max="100"
								step="1"
								required
								class="h-11 w-full rounded-md border bg-background px-3 text-center text-lg"
								placeholder="Aantal"
							/>

							<div class="flex w-full min-w-0 gap-2">
	<Button type="submit" class="min-w-0 flex-1 px-2">
		Toevoegen
	</Button>

	<Button
		type="button"
		variant="outline"
		class="min-w-0 flex-1 px-2"
		onclick={() => (bulkInvoerVoor = null)}
	>
		Annuleren
	</Button>
</div>
						</form>
					{/if}

					{#if opslagFouten[drankje.id]}
						<div class="flex flex-col gap-2">
							<p class="text-xs text-destructive">
								{opslagFouten[drankje.id]}
							</p>

							<Button
								variant="outline"
								size="sm"
								class="w-full"
								onclick={() => probeerOpnieuw(drankje.id)}
								disabled={bezigMetOpslaan}
							>
								<RefreshCw class="mr-2 h-4 w-4" />
								Opnieuw proberen
							</Button>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<p class="col-span-full text-muted-foreground">
				Er zijn nog geen actieve drankjes.
			</p>
		{/each}
	</div>
</div>