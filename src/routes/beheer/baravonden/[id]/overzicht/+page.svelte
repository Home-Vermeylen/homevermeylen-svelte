<script lang="ts">
	import { ChevronDown, ChevronUp, Lock, LockOpen } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	type Drankje = {
		id: string;
		naam: string;
		aantal: number;
	};

	type DrankjeDetail = {
		naam: string;
		aantal: number;
	};

	type LidVerkoop = {
		id: string;
		naam: string;
		aantal: number;
		drankjes: Record<string, DrankjeDetail>;
	};

	type Telling = {
		aantal: number;
		drankje: string;
		praesidium_lid: string;
		expand?: {
			drankje?: {
				naam: string;
			};
			praesidium_lid?: {
				voornaam: string;
				familienaam: string;
			};
		};
	};

	let { data } = $props();

	let afgesloten = $state(data.baravond.afgesloten);

	const tellingen = data.tellingen as unknown as Telling[];

	// Totaal aantal verkochte drankjes
	const totaalVerkocht = tellingen.reduce(
		(totaal, telling) => totaal + telling.aantal,
		0
	);

	// Verkoop per drankje
	const verkoopPerDrankje: Drankje[] = Object.values(
		tellingen.reduce(
			(resultaat: Record<string, Drankje>, telling) => {
				const id = telling.drankje;

				if (!resultaat[id]) {
					resultaat[id] = {
						id,
						naam: telling.expand?.drankje?.naam ?? 'Onbekend drankje',
						aantal: 0
					};
				}

				resultaat[id].aantal += telling.aantal;

				return resultaat;
			},
			{}
		)
	).sort((a, b) => b.aantal - a.aantal);

	// Verkoop per praesidiumlid
	const verkoopPerLid: LidVerkoop[] = Object.values(
		tellingen.reduce(
			(resultaat: Record<string, LidVerkoop>, telling) => {
				const lidId = telling.praesidium_lid;

				if (!resultaat[lidId]) {
					resultaat[lidId] = {
						id: lidId,
						naam: telling.expand?.praesidium_lid
							? `${telling.expand.praesidium_lid.voornaam} ${telling.expand.praesidium_lid.familienaam}`
							: 'Onbekend lid',
						aantal: 0,
						drankjes: {}
					};
				}

				const drankjeId = telling.drankje;
				const drankjeNaam = telling.expand?.drankje?.naam ?? 'Onbekend drankje';

				resultaat[lidId].aantal += telling.aantal;

				if (!resultaat[lidId].drankjes[drankjeId]) {
					resultaat[lidId].drankjes[drankjeId] = {
						naam: drankjeNaam,
						aantal: 0
					};
				}

				resultaat[lidId].drankjes[drankjeId].aantal += telling.aantal;

				return resultaat;
			},
			{}
		)
	).sort((a, b) => b.aantal - a.aantal);

	// Bijkomende statistieken
	const aantalVerschillendeDrankjes = verkoopPerDrankje.length;
	const aantalActieveTellers = verkoopPerLid.length;

	const hoogsteDrankverkoop = Math.max(
		...verkoopPerDrankje.map((drankje) => drankje.aantal),
		1
	);

	const percentageVerkoop = (aantal: number) =>
		totaalVerkocht > 0 ? (aantal / totaalVerkocht) * 100 : 0;

	const hoogsteLidVerkoop = Math.max(
		...verkoopPerLid.map((lid) => lid.aantal),
		1
	);

	// Uitklapbare details per lid
	let openLeden = $state<string[]>([]);

	function toggleLid(id: string) {
		if (openLeden.includes(id)) {
			openLeden = openLeden.filter((lidId) => lidId !== id);
		} else {
			openLeden = [...openLeden, id];
		}
	}
</script>

<div class="space-y-6 p-4 sm:p-6">
	<!-- Terugknop -->
	<a
		href={`/beheer/baravonden/${data.baravond.id}`}
		class="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
	>
		← Terug naar telling
	</a>

	<!-- Titel en klikbaar slotje -->
	<div class="flex items-center justify-between gap-4">
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

		<form
	method="POST"
	action="?/toggleAfgesloten"
	use:enhance={() => {
		return async ({ result }) => {
			if (
				result.type === 'success' &&
				result.data?.afgesloten !== undefined
			) {
				afgesloten = result.data.afgesloten;
			}
		};
	}}
>
	<button
		type="submit"
		class={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-muted ${
			afgesloten
				? 'bg-red-500/10 text-red-600'
				: 'bg-green-500/10 text-green-600'
		}`}
		aria-label={afgesloten
			? 'Baravond opnieuw openen'
			: 'Baravond afsluiten'}
		title={afgesloten
			? 'Baravond opnieuw openen'
			: 'Baravond afsluiten'}
	>
		{#if afgesloten}
			<Lock class="h-5 w-5" />
		{:else}
			<LockOpen class="h-5 w-5" />
		{/if}
	</button>
</form>
	</div>

	<!-- Overzichtskaarten -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		<div class="rounded-lg border bg-muted/30 p-5">
			<p class="text-sm font-medium text-muted-foreground">
				Totaal verkocht
			</p>

			<p class="mt-2 text-3xl font-bold tabular-nums">
				{totaalVerkocht}
			</p>
		</div>

		<div class="rounded-lg border bg-muted/30 p-5">
			<p class="text-sm font-medium text-muted-foreground">
				Verschillende drankjes
			</p>

			<p class="mt-2 text-3xl font-bold tabular-nums">
				{aantalVerschillendeDrankjes}
			</p>
		</div>

		<div class="rounded-lg border bg-muted/30 p-5">
			<p class="text-sm font-medium text-muted-foreground">
				Actieve tellers
			</p>

			<p class="mt-2 text-3xl font-bold tabular-nums">
				{aantalActieveTellers}
			</p>
		</div>
	</div>

	<!-- Verkoop per drankje -->
	<section class="space-y-3">
		<h2 class="text-xl font-semibold">Verkoop per drankje</h2>

		<div class="space-y-4 rounded-lg border p-4">
			{#each verkoopPerDrankje as drankje}
				<div class="space-y-2">
					<div class="flex items-center justify-between gap-4">
						<span class="min-w-0 font-medium">{drankje.naam}</span>

						<div class="flex shrink-0 items-center gap-4">
							<span
								class="min-w-[55px] text-right text-sm text-muted-foreground tabular-nums"
							>
								{percentageVerkoop(drankje.aantal).toFixed(1)}%
							</span>

							<span
								class="min-w-[40px] text-right text-lg font-bold tabular-nums"
							>
								{drankje.aantal}
							</span>
						</div>
					</div>

					<div class="h-2 overflow-hidden rounded-full bg-muted">
						<div
							class="h-full rounded-full bg-primary transition-all"
							style={`width: ${(drankje.aantal / hoogsteDrankverkoop) * 100}%`}
						></div>
					</div>
				</div>
			{:else}
				<p class="text-sm text-muted-foreground">
					Er zijn nog geen drankjes verkocht.
				</p>
			{/each}
		</div>
	</section>

	<!-- Verkoop per praesidiumlid -->
	<section class="space-y-3">
		<h2 class="text-xl font-semibold">Verkoop per praesidiumlid</h2>

		<div class="overflow-hidden rounded-lg border">
			{#each verkoopPerLid as lid}
				<div class="border-b last:border-b-0">
					<button
						type="button"
						class="w-full space-y-2 px-4 py-3 text-left transition-colors hover:bg-muted/50"
						onclick={() => toggleLid(lid.id)}
					>
						<div class="flex items-center justify-between gap-3">
							<span class="font-medium">{lid.naam}</span>

							<div class="flex shrink-0 items-center gap-3">
								<span class="font-semibold tabular-nums">
									{lid.aantal}
								</span>

								{#if openLeden.includes(lid.id)}
									<ChevronUp class="h-4 w-4 text-muted-foreground" />
								{:else}
									<ChevronDown class="h-4 w-4 text-muted-foreground" />
								{/if}
							</div>
						</div>

						<div class="h-2 overflow-hidden rounded-full bg-muted">
							<div
								class="h-full rounded-full bg-primary transition-all"
								style={`width: ${(lid.aantal / hoogsteLidVerkoop) * 100}%`}
							></div>
						</div>
					</button>

					{#if openLeden.includes(lid.id)}
						<div class="space-y-2 border-t bg-muted/20 px-4 py-3">
							{#each Object.values(lid.drankjes).sort((a, b) => b.aantal - a.aantal) as drankje}
								<div class="flex justify-between text-sm">
									<span>{drankje.naam}</span>

									<strong class="tabular-nums">
										{drankje.aantal}
									</strong>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{:else}
				<p class="p-4 text-sm text-muted-foreground">
					Er zijn nog geen tellingen.
				</p>
			{/each}
		</div>
	</section>
</div>