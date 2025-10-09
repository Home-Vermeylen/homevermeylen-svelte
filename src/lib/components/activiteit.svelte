<script lang="ts">
	import {
		Beer,
		CalendarClock,
		CalendarDays,
		Drama,
		Ellipsis,
		LucidePen,
		LucideText,
		MapPin,
		Medal,
		MicVocal,
		PartyPopper
	} from 'lucide-svelte';
	import { Badge } from './ui/badge';
	import { Button } from './ui/button';
	import * as Card from './ui/card';
	import * as Sheet from './ui/sheet';

	interface Props {
		activiteit: any;
	}

	let { activiteit }: Props = $props();
	const huidige_datum = new Date();
	const activiteits_datum = new Date(activiteit.datum);
</script>

<Card.Root class="w-80 md:w-96">
	<Card.Header class="flex flex-col items-center">
		<Card.Title class="mb-5 text-center">{activiteit.naam}</Card.Title>
		<img
			loading="lazy"
			src={activiteit.banner ?? '/foto_placeholder.png'}
			class="object-scale-down rounded-md border-2"
			height={200}
			width={400}
			alt="Banner"
		/>
	</Card.Header>

	<Card.Content class="flex flex-col gap-3 items-center text-center">
		<!-- Type activiteit -->
		{#if activiteit.activiteitstype == 'BAR'}
			<Badge variant="outline" class="flex gap-2 items-center justify-center w-24">
				<Beer class="h-4 w-4" /> Baravond
			</Badge>
		{:else if activiteit.activiteitstype == 'CANTUS'}
			<Badge variant="outline" class="flex gap-2 items-center justify-center w-24">
				<MicVocal class="h-4 w-4" /> Cantus
			</Badge>
		{:else if activiteit.activiteitstype == 'SPORT'}
			<Badge variant="outline" class="flex gap-2 items-center justify-center w-36">
				<Medal class="h-4 w-4" /> Sportactiviteit
			</Badge>
		{:else if activiteit.activiteitstype == 'CULTUUR'}
			<Badge variant="outline" class="flex gap-2 items-center justify-center w-36">
				<Drama class="h-4 w-4" /> Cultuuractiviteit
			</Badge>
		{:else if activiteit.activiteitstype == 'FEEST'}
			<Badge variant="outline" class="flex gap-2 items-center justify-center w-24">
				<PartyPopper class="h-4 w-4" /> Fuif
			</Badge>
		{:else if activiteit.activiteitstype == 'ANDERE'}
			<Badge variant="outline" class="flex gap-2 items-center justify-center w-36">
				<Ellipsis class="h-4 w-4" /> Diverse activiteit
			</Badge>
		{/if}

		<!-- Omschrijving -->
		<Sheet.Root>
			<Sheet.Trigger>
				<Button class="flex gap-2 items-center rounded-3xl">
					<LucideText class="h-4 w-4" />Omschrijving
				</Button>
			</Sheet.Trigger>
			<Sheet.Content>
				<Sheet.Header>
					<Sheet.Title>Omschrijving {activiteit.naam}</Sheet.Title>
					<Sheet.Description class="prose">
						{activiteit.omschrijving}
					</Sheet.Description>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>

		<!-- Datum -->
		<span class="flex flex-row gap-2 items-center justify-center">
			<CalendarDays class="h-4 w-4" />
			{activiteits_datum.toLocaleDateString('nl-BE', {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})}
		</span>

		<!-- Locatie -->
		{#if activiteit.locatie}
			<span class="flex flex-row gap-2 items-center justify-center">
				<MapPin class="h-4 w-4" />
				{activiteit.locatie}
			</span>
		{/if}
	</Card.Content>

	<!-- Inschrijven -->
	{#if activiteit.formlink && activiteits_datum.getTime() > huidige_datum.getTime()}
		<Card.Footer class="flex justify-center">
	<Button asChild>
		<a
			href={activiteit.formlink}
			target="_blank"
			rel="noopener noreferrer"
			data-umami-event="Inschrijving activiteit"
			class="flex gap-2 items-center"
		>
			<LucidePen class="h-4 w-4" /> Inschrijven
		</a>
	</Button>
</Card.Footer>

	{/if}
</Card.Root>

