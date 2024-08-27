<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';
	import { VerkiezingenSchema } from '$lib/schemas';
	import { ArrowUpDown, Plus } from 'lucide-svelte';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { VerkiezingenResponse } from '../../../../types/pocketbase-types';
	import DataTableActions from './data_table_actions.svelte';

	export let data: VerkiezingenResponse[];
	export let form: SuperValidated<Infer<typeof VerkiezingenSchema>>;

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: ({ naam, id }) => ({ naam, id }),
			header: 'Naam',
			plugins: {
				sort: {
					disable: true
				}
			},
			cell: ({ value }) => {
				return createRender(Button, {
					variant: 'link',
					href: `/beheer/verkiezingen/${value.id}`
				}).slot(value.naam);
			}
		}),
		table.column({
			accessor: 'type',
			header: 'Type',
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'actief',
			header: 'Actief',
			cell: ({ value }) => (value ? 'Ja' : 'Nee'),
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'created',
			header: 'Aangemaakt',
			cell: ({ value }) =>
				new Date(value).toLocaleDateString('nl-BE', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
					hour: '2-digit',
					minute: '2-digit'
				}),
			plugins: {
				filter: { exclude: true }
			}
		}),
		table.column({
			accessor: (verkiezing) => verkiezing,
			header: '',
			cell: ({ value }) => createRender(DataTableActions, { verkiezing: value, data: form }),
			plugins: {
				sort: {
					disable: true
				},
				filter: { exclude: true }
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const nieuw_form = superForm(form, {
		validators: zodClient(VerkiezingenSchema)
	});

	const { form: formData, enhance } = nieuw_form;
</script>

<div>
	<div class="flex items-center justify-evenly py-4">
		<Input
			class="max-w-sm"
			placeholder="Filter verkiezingen..."
			type="text"
			bind:value={$filterValue}
		/>

		<Dialog.Root>
			<Dialog.Trigger
				><Button class="flex gap-2"><Plus class="h-4 w-4" /> Nieuw</Button></Dialog.Trigger
			>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Nieuwe verkiezing</Dialog.Title>
				</Dialog.Header>

				<form method="POST" use:enhance action="/api/verkiezingen">
					<Form.Field form={nieuw_form} name="naam">
						<Form.Control let:attrs>
							<Form.Label>Naam</Form.Label>
							<Input {...attrs} bind:value={$formData.naam} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={nieuw_form} name="type">
						<Form.Control let:attrs>
							<Form.Label>Type</Form.Label>
							<Select.Root
								onSelectedChange={(v) => {
									v && ($formData.type = v.value);
								}}
							>
								<Select.Trigger {...attrs}>
									<Select.Value placeholder="Kies type verkiezing" />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="OPENBAAR" label="Openbaar" />
									<Select.Item value="BEPERKT" label="Beperkt" />
									<Select.Item value="VM" label="Vaste Medewerkers" />
									<Select.Item value="ERE" label="Erefuncties" />
									<Select.Item value="HR" label="Homeraad" />
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.type} name={attrs.name} />
						</Form.Control>
						<Form.Description>
							{#if $formData.type == 'OPENBAAR'}
								Een verkiezing waarbij alle bewoners en homeraadleden kunnen stemmen
							{:else if $formData.type == 'BEPERKT'}
								Een verkiezing waarbij enkel homeraadleden kunnen stemmen
							{:else if $formData.type == 'VM'}
								Een verkiezing waarbij vaste medewerkers worden verkozen
							{:else if $formData.type == 'ERE'}
								Een verkiezing waarbij meters en peters worden verkozen
							{:else if $formData.type == 'HR'}
								Een verkiezing waarbij een nieuwe homeraad wordt verkozen
							{/if}
						</Form.Description>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Button>Opslaan</Form.Button>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										{#if cell.id === 'created'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Vorige</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Volgende</Button
		>
	</div>
</div>
