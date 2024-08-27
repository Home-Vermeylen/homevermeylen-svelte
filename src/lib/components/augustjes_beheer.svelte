<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { AugustjesSchema } from '$lib/schemas';
	import { CalendarClock, Ellipsis, File } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';
	import type { AugustjesRecord } from '../../../types/pocketbase-types';
	import AugustjesModal from './augustjes_modal.svelte';

	let augustjes_promise: Promise<AugustjesRecord[]> | undefined = undefined;
    export let data: SuperValidated<Infer<typeof AugustjesSchema>>;

	let geselecteerd_augustje: AugustjesRecord | undefined = undefined;
	let alert_open = false;
    let augustjes_modal_open = false;

	onMount(() => {
		augustjes_promise = fetch('/api/augustjes', { method: 'GET' }).then(async (data) => {
			return await data
				.json()
                .then((a) => a.map(a => ({ ...a, datum: new Date(a.datum) })));
		});
	});

</script>

<AugustjesModal id="edit_ag" bind:modal_open={augustjes_modal_open} geselecteerd_augustje={geselecteerd_augustje} {data} />

<AlertDialog.Root open={alert_open}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Ben je zeker?</AlertDialog.Title>
			<AlertDialog.Description>
				Deze handeling kan niet worden ongedaan gemaakt. Het augustje zal permanent verwijderd
				worden.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel
				on:click={() => {
					geselecteerd_augustje = undefined;
					alert_open = false;
				}}>Annuleer</AlertDialog.Cancel
			>
			<AlertDialog.Action
				on:click={async () => {
					await fetch('/api/augustjes', {
						method: 'DELETE',
						body: JSON.stringify({ id: geselecteerd_augustje?.id })
					}).finally(() => {
						geselecteerd_augustje = undefined;
						alert_open = false;
					});
				}}>Verwijder</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<Card.Root>
	<Card.Header>
		<Card.Title>Augustjes</Card.Title>
		<Card.Description>
			Bekijk en bewerk de augustjes die worden weergegeven op de site.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if augustjes_promise != undefined}
			{#await augustjes_promise then augustjes}
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
						{#each augustjes as augustje (augustje.id)}
							<Table.Row>
								<Table.Cell class="font-medium">{augustje.naam}</Table.Cell>
                                <Table.Cell class="hidden md:table-cell">
									<Badge href={augustje.pdf}
										><File class="h-3.5 w-3.5"/></Badge
									>
								</Table.Cell>
								<Table.Cell
									><Badge variant="default" class="flex gap-1 w-fit"
										><CalendarClock class="h-3.5 w-3.5" />
										{new Date(augustje.created).toLocaleString('nl-BE', {
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
													geselecteerd_augustje = augustje;
                                                    augustjes_modal_open = true;
												}}>Bewerk</DropdownMenu.Item
											>
											<DropdownMenu.Item
												on:click={() => {
													geselecteerd_augustje = augustje;
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
