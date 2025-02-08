<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Popover from '$lib/components/ui/popover';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ActiviteitSchema } from '$lib/schemas';
	import { CalendarClock, Ellipsis, ExternalLink } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';
	import type { ActiviteitenRecord } from '../../../types/pocketbase-types';
	import Activiteitenmodal from './activiteitenmodal.svelte';
	import { ScrollArea } from './ui/scroll-area';

	let activiteiten_promise: Promise<ActiviteitenRecord[]> | undefined = $state(undefined);
	interface Props {
		data: SuperValidated<Infer<typeof ActiviteitSchema>>;
	}

	let { data }: Props = $props();

	let geselecteerde_activiteit: ActiviteitenRecord | undefined = $state(undefined);
	let alert_open = $state(false);
    let activiteiten_modal_open = $state(false);

	onMount(() => {
		activiteiten_promise = fetch('/api/activiteiten', { method: 'GET' }).then(async (data) => {
			return await data
				.json()
				.then((a) => [...a.opkomende_activiteiten, ...a.afgelopen_activiteiten])
                .then((a) => a.map(a => ({ ...a, datum: new Date(a.datum) })));
		});
	});

</script>

<Activiteitenmodal id="edit" bind:modal_open={activiteiten_modal_open} geselecteerde_activiteit={geselecteerde_activiteit} {data} />

<AlertDialog.Root bind:open={alert_open}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Ben je zeker?</AlertDialog.Title>
			<AlertDialog.Description>
				Deze handeling kan niet worden ongedaan gemaakt. De activiteit zal permanent verwijderd
				worden.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel
				on:click={() => {
					geselecteerde_activiteit = undefined;
					alert_open = false;
				}}>Annuleer</AlertDialog.Cancel
			>
			<AlertDialog.Action
				on:click={async () => {
					await fetch('/api/activiteiten', {
						method: 'DELETE',
						body: JSON.stringify({ id: geselecteerde_activiteit?.id })
					}).finally(() => {
						geselecteerde_activiteit = undefined;
						alert_open = false;
					});
				}}>Verwijder</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<Card.Root>
	<Card.Header>
		<Card.Title>Activiteiten</Card.Title>
		<Card.Description>
			Bekijk en bewerk de activiteiten die worden weergegeven op de site.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if activiteiten_promise != undefined}
			{#await activiteiten_promise then activiteiten}
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="hidden w-[100px] sm:table-cell">
								<span class="sr-only">Banner</span>
							</Table.Head>
							<Table.Head>Naam</Table.Head>
							<Table.Head>Datum</Table.Head>
							<Table.Head>Activiteitstype</Table.Head>
							<Table.Head class="hidden md:table-cell">Omschrijving</Table.Head>
							<Table.Head class="hidden md:table-cell">Locatie</Table.Head>
							<Table.Head class="hidden md:table-cell">Inschrijven</Table.Head>
							<Table.Head class="hidden md:table-cell">Toegevoegd op</Table.Head>
							<Table.Head>
								<span class="sr-only">Acties</span>
							</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each activiteiten as activiteit (activiteit.id)}
							<Table.Row>
								<Table.Cell class="hidden sm:table-cell">
									<img
										alt="Banner"
										src={activiteit.banner}
										class="aspect-square rounded-md object-cover"
										height="64"
										width="64"
									/>
								</Table.Cell>
								<Table.Cell class="font-medium">{activiteit.naam}</Table.Cell>
								<Table.Cell
									><Badge variant="default" class="flex gap-1 w-fit"
										><CalendarClock class="h-3.5 w-3.5" />
										{new Date(activiteit.datum).toLocaleString('nl-BE', {
											timeZone: 'Europe/Brussels',
											weekday: 'long',
											day: 'numeric',
											month: 'long',
											year: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										})}</Badge
									></Table.Cell
								>
								<Table.Cell class="hidden md:table-cell">
									<Badge variant={activiteit.activiteitstype == 'ANDERE' ? 'outline' : 'default'}
										>{activiteit.activiteitstype}</Badge
									>
								</Table.Cell>

								<Table.Cell class="hidden md:table-cell">
									<Popover.Root>
										<Popover.Trigger>Toon Omschrijving</Popover.Trigger>
										<ScrollArea class="max-h-[500px] max-w-[500px]">
											<Popover.Content class="prose">{activiteit.omschrijving}</Popover.Content>
										</ScrollArea>
									</Popover.Root>
								</Table.Cell>
								<Table.Cell class="hidden md:table-cell">{activiteit.locatie}</Table.Cell>
								<Table.Cell class="hidden md:table-cell"
									><Badge
										href={activiteit.formlink}
										variant={activiteit.formlink ? 'default' : 'destructive'}
										>{#if activiteit.formlink}
											<ExternalLink class="h-3.5 w-3.5" />
										{:else}
											NEE
										{/if}</Badge
									></Table.Cell
								>
								<Table.Cell class="hidden md:table-cell">
									<Badge variant="default" class="flex gap-1 w-fit">
										<CalendarClock class="h-3.5 w-3.5" />
										{new Date(activiteit.created).toLocaleString('nl-BE', {
											timeZone: 'Europe/Brussels',
											weekday: 'long',
											day: 'numeric',
											month: 'long',
											year: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										})}</Badge
									></Table.Cell
								>
								<Table.Cell>
									<DropdownMenu.Root>
										<DropdownMenu.Trigger asChild >
											{#snippet children({ builder })}
																						<Button aria-haspopup="true" size="icon" variant="ghost" builders={[builder]}>
													<Ellipsis class="h-4 w-4" />
													<span class="sr-only">Toon Menu</span>
												</Button>
																																{/snippet}
																				</DropdownMenu.Trigger>
										<DropdownMenu.Content align="end">
											<DropdownMenu.Label>Acties</DropdownMenu.Label>
											<DropdownMenu.Item
												on:click={() => {
													geselecteerde_activiteit = activiteit;
                                                    activiteiten_modal_open = true;
												}}>Bewerk</DropdownMenu.Item
											>
											<DropdownMenu.Item
												on:click={() => {
													geselecteerde_activiteit = activiteit;
													alert_open = true;
												}}>Verwijder</DropdownMenu.Item
											>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			{/await}
		{/if}
	</Card.Content>
	<Card.Footer>
		<div class="text-xs text-muted-foreground">
			Showing <strong>1-10</strong> of <strong>32</strong> products
		</div>
	</Card.Footer>
</Card.Root>
