<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';
	import type { KandidaatSchema } from '$lib/schemas';
	import { CirclePlus } from 'lucide-svelte';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import DataTableActions from './data_table_actions.svelte';

	export let verkiezing;
	export let data: SuperValidated<Infer<typeof KandidaatSchema>>;

	const table = createTable(readable(verkiezing.kandidaten), {
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'voornaam',
			header: 'Voornaam'
		}),
		table.column({
			accessor: 'familienaam',
			header: 'Familienaam'
		}),
		table.column({
			accessor: 'ambitie',
			header: 'Ambitie'
		}),
		table.column({
			accessor: 'opties',
			header: 'Opties',
			plugins: {
				filter: {
					exclude: true
				}
			},
            cell: ({value}) => {
                return value.length == 3 ? "Voor, Tegen, Onthouding" : "Voor, Tegen"
            }
		}),
		table.column({
			accessor: (kandidaat) => kandidaat,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { kandidaat: value, id: verkiezing.id });
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	let nieuw_modal_open = false;

	const form = superForm(data);

	const { form: formData, enhance } = form;

	let voornaam = '';
	let familienaam = '';
	let ambitie = '';
	let opties_select = 'standaard';
</script>

<Dialog.Root bind:open={nieuw_modal_open}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Kandidaat toevoegen</Dialog.Title>
			<Dialog.Description>Voeg een kandidaat toe aan de verkiezing</Dialog.Description>
		</Dialog.Header>
		<form method="POST" use:enhance action={`/api/verkiezingen/${verkiezing.id}/kandidaten`}>
			<Form.Field {form} name="voornaam">
				<Form.Control let:attrs>
					<Form.Label>Voornaam</Form.Label>
					<Input {...attrs} bind:value={voornaam} />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="familienaam">
				<Form.Control let:attrs>
					<Form.Label>Familienaam</Form.Label>
					<Input {...attrs} bind:value={familienaam} />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="ambitie">
				<Form.Control let:attrs>
					<Form.Label>Ambitie</Form.Label>
					<Input {...attrs} bind:value={ambitie} />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="opties">
				<Form.Control let:attrs>
					<Form.Label>Opties</Form.Label>
					<Select.Root
						selected={{ value: 'standaard', label: 'Standaard' }}
						onSelectedChange={(v) => {
							v && (opties_select = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="standaard" label="Standaard" />
							<Select.Item value="geen_onthouden" label="Geen Onthouding" />
						</Select.Content>
						<input type="hidden" bind:value={opties_select} name={'opties'} />
					</Select.Root>
				</Form.Control>
				<Form.Description>
					Bij <i>standaard</i> is onthouding mogelijk. Selecteer <i>Geen Onthouding</i> wanneer onthouden
					niet toegestaan is.
				</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Opslaan</Form.Button>
		</form>
		<SuperDebug data={$formData} />
	</Dialog.Content>
</Dialog.Root>

<div>
	<div class="flex items-center py-4">
		<Input
			class="max-w-sm"
			placeholder="Filter kandidaten..."
			type="text"
			bind:value={$filterValue}
		/>
		<div class="ml-auto flex items-center gap-2">
			<Button on:click={() => (nieuw_modal_open = true)} size="sm" class="h-8 gap-1">
				<CirclePlus class="h-3.5 w-3.5" />
				<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Voeg toe </span>
			</Button>
		</div>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
									<Table.Head {...attrs}>
										<Render of={cell.render()} />
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
