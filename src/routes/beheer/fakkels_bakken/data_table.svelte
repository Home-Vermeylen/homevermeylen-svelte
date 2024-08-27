<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table';
	import { FakkelsBakkenSchema } from '$lib/schemas';
	import { ArrowUpDown, UserSearch } from 'lucide-svelte';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';
	import DataTableActions from './data_table_actions.svelte';

	export let fakkels_bakken: object[];
	export let fakkels_bakken_form: SuperValidated<Infer<typeof FakkelsBakkenSchema>>;

	const table = createTable(readable(fakkels_bakken), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'voornaam',
			header: 'Voornaam',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'familienaam',
			header: 'Familienaam',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: 'fakkels',
			header: 'Fakkels',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'bakken',
			header: 'Bakken',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, {
					fakkels_bakken_form,
					lid: fakkels_bakken.find((n) => n.id == value)
				});
			},
			plugins: {
				sort: {
					disable: true
				},
				plugins: {
					filter: {
						exclude: true
					}
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<div>
    <div class="flex items-center py-4 gap-2">
        <UserSearch class="h-5 w-5"/>
        <Input
          class="max-w-sm"
          placeholder="Filter praesidiumleden..."
          type="text"
          bind:value={$filterValue}
        />
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
										{#if cell.id === 'fakkels' || cell.id === 'bakken'}
											<div class="text-right">
												<Button variant="ghost" on:click={props.sort.toggle}>
													<Render of={cell.render()} />
													<ArrowUpDown class={'ml-2 h-4 w-4'} />
												</Button>
											</div>
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
										{#if cell.id === 'fakkels' || cell.id === 'bakken'}
											<div class="text-right font-medium">
												<Render of={cell.render()} />
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
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
