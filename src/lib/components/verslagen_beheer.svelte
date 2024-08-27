<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { VerslagSchema } from '$lib/schemas';
	import { CalendarClock, Ellipsis, File } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';
	import type { VerslagenRecord } from '../../../types/pocketbase-types';
	import VerslagenModal from './verslagen_modal.svelte';

	let verslagen_promise: Promise<VerslagenRecord[]> | undefined = undefined;
    export let data: SuperValidated<Infer<typeof VerslagSchema>>;

	let geselecteerd_verslag: VerslagenRecord | undefined = undefined;
	let alert_open = false;
    let verslagen_modal_open = false;

	onMount(() => {
		verslagen_promise = fetch('/api/verslagen', { method: 'GET' }).then(async (data) => {
			return await data
				.json()
                .then((a) => a.map(a => ({ ...a, datum: new Date(a.datum) })));
		});
	});

</script>

<VerslagenModal id="nieuw_verslag" bind:modal_open={verslagen_modal_open} {geselecteerd_verslag} {data}/>

<AlertDialog.Root open={alert_open}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Ben je zeker?</AlertDialog.Title>
			<AlertDialog.Description>
				Deze handeling kan niet worden ongedaan gemaakt. Het verslag zal permanent verwijderd
				worden.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel
				on:click={() => {
					geselecteerd_verslag = undefined;
					alert_open = false;
				}}>Annuleer</AlertDialog.Cancel
			>
			<AlertDialog.Action
				on:click={async () => {
					await fetch('/api/augustjes', {
						method: 'DELETE',
						body: JSON.stringify({ id: geselecteerd_verslag?.id })
					}).finally(() => {
						geselecteerd_verslag = undefined;
						alert_open = false;
					});
				}}>Verwijder</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<Card.Root>
	<Card.Header>
		<Card.Title>Verslagen</Card.Title>
		<Card.Description>
			Bekijk en bewerk de verslagen die worden weergegeven op de site.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if verslagen_promise != undefined}
			{#await verslagen_promise then verslagen}
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Naam</Table.Head>
							<Table.Head>Bestand</Table.Head>
							<Table.Head class="hidden md:table-cell">Datum</Table.Head>
							<Table.Head>
								<span class="sr-only">Acties</span>
							</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each verslagen as verslag (verslag.id)}
							<Table.Row>
								<Table.Cell class="font-medium">{verslag.naam}</Table.Cell>
                                <Table.Cell class="hidden md:table-cell">
									<Badge href={verslag.pdf}
										><File class="h-3.5 w-3.5"/></Badge
									>
								</Table.Cell>
								<Table.Cell
									><Badge variant="default" class="flex gap-1 w-fit"
										><CalendarClock class="h-3.5 w-3.5" />
										{new Date(verslag.created).toLocaleString('nl-BE', {
											timeZone: 'Europe/Brussels',
											weekday: 'long',
											day: 'numeric',
											month: 'long',
											year: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										})}</Badge
									></Table.Cell>
								<Table.Cell>
									<DropdownMenu.Root>
										<DropdownMenu.Trigger asChild let:builder>
											<Button aria-haspopup="true" size="icon" variant="ghost" builders={[builder]}>
												<Ellipsis class="h-4 w-4" />
												<span class="sr-only">Toon Menu</span>
											</Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content align="end">
											<DropdownMenu.Label>Acties</DropdownMenu.Label>
											<DropdownMenu.Item
												on:click={() => {
													geselecteerd_verslag = verslag;
                                                    verslagen_modal_open = true;
												}}>Bewerk</DropdownMenu.Item
											>
											<DropdownMenu.Item
												on:click={() => {
													geselecteerd_verslag = verslag;
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
