<script lang="ts">
	import { Beer, ChevronRight, CupSoda, Flame, Globe, Heart } from 'lucide-svelte';

	const kaarten = [
		{
			url: '/beheer/baravonden',
			naam: 'Baravonden',
			omschrijving: 'Baravonden aanmaken en drankentellingen beheren.',
			icon: Beer
		},
		{
			url: '/beheer/drankjes',
			naam: 'Drankjes',
			omschrijving: 'De drankjes voor de bar beheren.',
			icon: CupSoda
		},
		{
			url: '/beheer/fakkels_bakken',
			naam: 'Fakkels & Bakken',
			omschrijving: 'Fakkels en bakken beheren.',
			icon: Flame
		},
		{
			url: '/beheer/vriendschapsnetwerk',
			naam: 'Vriendschapsnetwerk',
			omschrijving: 'Het vriendschapsnetwerk beheren.',
			icon: Heart
		},
		{
			url: '#',
			naam: 'Publieke gegevens',
			omschrijving: 'Activiteiten, verslagen en Augustjes beheren.',
			icon: Globe,
			subpagina: [
				{ naam: 'Activiteiten', url: '/beheer/activiteiten' },
				{ naam: 'Verslagen', url: '/beheer/verslagen' },
				{ naam: 'Augustjes', url: '/beheer/augustjes' }
			]
		}
	];
</script>

<svelte:head>
	<title>Beheer | Home Vermeylen</title>
</svelte:head>

<div class="mx-auto w-full max-w-3xl px-4 py-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold">Beheer</h1>
		<p class="mt-2 text-muted-foreground">
			Kies een onderdeel om te beheren.
		</p>
	</div>

	<div class="flex flex-col gap-3">
		{#each kaarten as kaart}
			{#if kaart.subpagina}
				<div
					class="rounded-xl border bg-background p-4 shadow-sm"
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted"
						>
							<svelte:component this={kaart.icon} class="h-6 w-6" />
						</div>

						<div class="min-w-0 flex-1">
							<h2 class="font-semibold">{kaart.naam}</h2>
							<p class="mt-1 text-sm text-muted-foreground">
								{kaart.omschrijving}
							</p>
						</div>
					</div>

					<div class="mt-4 flex flex-col gap-2 sm:flex-row">
						{#each kaart.subpagina as subpagina}
							<a
								href={subpagina.url}
								class="flex flex-1 items-center justify-between rounded-lg border bg-muted/30 px-4 py-3 text-sm font-medium transition hover:bg-muted"
							>
								<span>{subpagina.naam}</span>
								<ChevronRight class="h-4 w-4 text-muted-foreground" />
							</a>
						{/each}
					</div>
				</div>
			{:else}
				<a
					href={kaart.url}
					class="group flex items-center gap-4 rounded-xl border bg-background p-4 shadow-sm transition hover:bg-muted/50 hover:shadow-md"
				>
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted"
					>
						<svelte:component this={kaart.icon} class="h-6 w-6" />
					</div>

					<div class="min-w-0 flex-1">
						<h2 class="font-semibold">{kaart.naam}</h2>
						<p class="mt-1 text-sm text-muted-foreground">
							{kaart.omschrijving}
						</p>
					</div>

					<ChevronRight
						class="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
					/>
				</a>
			{/if}
		{/each}
	</div>
</div>