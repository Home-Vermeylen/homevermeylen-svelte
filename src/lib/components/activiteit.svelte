<script lang="ts">
	import {
		Beer,
		CalendarClock,
		CalendarDays,
		Drama,
		Ellipsis,
		LucidePen,
		LucideText,
		Medal,
		MicVocal,
		PartyPopper
	} from 'lucide-svelte';
	import { Badge } from './ui/badge';
	import { Button } from './ui/button';
	import * as Card from './ui/card';
	import * as Sheet from './ui/sheet';

	export let activiteit: any;
	const huidige_datum = new Date();
	const activiteits_datum = new Date(activiteit.datum);
</script>

<Card.Root class="w-80 md:w-96">
	<Card.Header class="flex flex-col items-center">
		<Card.Title class="mb-5">{activiteit.naam}</Card.Title>
		<img
			loading="lazy"
			src={activiteit.banner ?? '/foto_placeholder.png'}
			class="object-scale-down rounded-md border-2"
			height={200}
			width={400}
			alt="Banner"
		/>
	</Card.Header>
	<Card.Content class="flex flex-col gap-2 items-center">
		<div class="flex flex-col gap-4 items-center">
			{#if activiteit.activiteitstype == 'BAR'}
				<Badge variant="outline" class="flex gap-2 items-center justify-center w-24"
					><Beer class="h-4 w-4" /> Baravond</Badge
				>
			{:else if activiteit.activiteitstype == 'CANTUS'}
				<Badge variant="outline" class="flex gap-2 items-center justify-center w-24"
					><MicVocal class="h-4 w-4" /> Cantus</Badge
				>
			{:else if activiteit.activiteitstype == 'SPORT'}
				<Badge variant="outline" class="flex gap-2 items-center justify-center w-36"
					><Medal class="h-4 w-4" /> Sportactiviteit</Badge
				>
			{:else if activiteit.activiteitstype == 'CULTUUR'}
				<Badge variant="outline" class="flex gap-2 items-center justify-center w-36"
					><Drama class="h-4 w-4" /> Cultuuractiviteit</Badge
				>
			{:else if activiteit.activiteitstype == 'FEEST'}
				<Badge variant="outline" class="flex gap-2 items-center justify-center w-24"
					><PartyPopper class="h-4 w-4" /> Fuif</Badge
				>
				{:else if activiteit.activiteitstype == 'ANDERE'}
				<Badge variant="outline" class="flex gap-2 items-center justify-center w-36"
					><Ellipsis class="h-4 w-4" /> Diverse activiteit</Badge
				>
			{/if}
			<Sheet.Root>
				<Sheet.Trigger
					><Button class="flex gap-2 items-center rounded-3xl"
						><LucideText class="h-4 w-4" />Omschrijving</Button
					></Sheet.Trigger
				>
				<Sheet.Content>
					<Sheet.Header>
						<Sheet.Title>Omschrijving {activiteit.naam}</Sheet.Title>
						<Sheet.Description class="prose">
							{activiteit.omschrijving}
						</Sheet.Description>
					</Sheet.Header>
				</Sheet.Content>
			</Sheet.Root>
		</div>

		<span class="flex flex-row gap-2 items-center justify-center"
			><CalendarDays class="h-4 w-4" />
			{activiteits_datum.toLocaleDateString(undefined, {
				weekday: 'short',
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})}
		</span>
		<span class="flex flex-row gap-2 items-center justify-center"
			><CalendarClock class="h-4 w-4" />
			{activiteits_datum.toLocaleTimeString(undefined, {
				hour: '2-digit',
				minute: '2-digit'
			})}
		</span>
	</Card.Content>
	{#if activiteit.inschrijven && activiteits_datum.getTime() > huidige_datum.getTime()}
		<Card.Footer>
			<Button href={activiteit.formlink} data-umami-event="Inschrijving activiteit">
				<LucidePen class="h-4 w-4" />Inschrijven
			</Button>
			<a
				href={activiteit.formlink}
				class="btn btn-primary btn-wide"
				data-umami-event="Inschrijving activiteit">Schrijf je in!</a
			>
		</Card.Footer>
	{/if}
</Card.Root>
