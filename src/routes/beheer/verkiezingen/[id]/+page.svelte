<script lang="ts">
	import Praesidiumlidselector from '$lib/components/praesidiumlidselector.svelte';
	import Qrcodegenerator from '$lib/components/qrcodegenerator.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs';
	import { ChevronLeft, ExternalLink, QrCode } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import type { PageData } from './$types';
	import Resultaten from './resultaten.svelte';
	import Statusknoppen from './statusknoppen.svelte';

	export let data: PageData;

	let kandidaten_table,
		kandidaten_headerRows,
		kandidaten_pageRows,
		kandidaten_tableAttrs,
		kandidaten_tableBodyAttrs,
		kandidaten_pluginStates,
		kandidaten_hasNextPage,
		kandidaten_hasPreviousPage,
		kandidaten_pageIndex,
		kandidaten_filterValue = undefined;

	let resultaten_table,
		resultaten_headerRows,
		resultaten_pageRows,
		resultaten_tableAttrs,
		resultaten_tableBodyAttrs,
		resultaten_pluginStates,
		resultaten_hasNextPage,
		resultaten_hasPreviousPage,
		resultaten_pageIndex,
		resultaten_filterValue = undefined;

	let geselecteerde_functies: string[] = [];
	let van_toegang = false;
	let modal_open = false;

	onMount(async () => {
		const verkiezing = await data.verkiezing;

		kandidaten_table = createTable(readable(verkiezing.kandidaten), {
			page: addPagination({ initialPageSize: 3 }),
			filter: addTableFilter({
				fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
			})
		});

		const kandidaten_columns = kandidaten_table.createColumns([
			kandidaten_table.column({
				accessor: 'voornaam',
				header: 'Voornaam'
			}),
			kandidaten_table.column({
				accessor: 'familienaam',
				header: 'Familienaam'
			}),
			kandidaten_table.column({
				accessor: 'ambitie',
				header: 'Ambitie'
			}),
			kandidaten_table.column({
				accessor: ({ status, id }) => ({ status, id }),
				header: 'Status',
				cell: ({ value }) => {
					return createRender(Statusknoppen, {
						status: value.status,
						verkiezing_id: verkiezing.id,
						kandidaat_id: value.id,
						verkiezing_actief: verkiezing.actief
					});
				}
			})
		]);

		({
			headerRows: kandidaten_headerRows,
			pageRows: kandidaten_pageRows,
			tableAttrs: kandidaten_tableAttrs,
			tableBodyAttrs: kandidaten_tableBodyAttrs,
			pluginStates: kandidaten_pluginStates
		} = kandidaten_table.createViewModel(kandidaten_columns));

		({
			hasNextPage: kandidaten_hasNextPage,
			hasPreviousPage: kandidaten_hasPreviousPage,
			pageIndex: kandidaten_pageIndex
		} = kandidaten_pluginStates.page);

		({ filterValue: kandidaten_filterValue } = kandidaten_pluginStates.filter);

		resultaten_table = createTable(
			readable(verkiezing.kandidaten.filter((k) => k.status == 'voltooid')),
			{
				page: addPagination({ initialPageSize: 3 }),
				filter: addTableFilter({
					fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
				})
			}
		);

		const resultaten_columns = kandidaten_table.createColumns([
			kandidaten_table.column({
				accessor: 'voornaam',
				header: 'Voornaam'
			}),
			kandidaten_table.column({
				accessor: 'familienaam',
				header: 'Familienaam'
			}),
			kandidaten_table.column({
				accessor: 'ambitie',
				header: 'Ambitie'
			}),
			kandidaten_table.column({
				accessor: ({ opties, id }) => ({ opties, id }),
				header: 'Resultaten',
				cell: ({ value }) => {
					return createRender(Resultaten, {
						opties: value.opties
					});
				}
			})
		]);

		({
			headerRows: resultaten_headerRows,
			pageRows: resultaten_pageRows,
			tableAttrs: resultaten_tableAttrs,
			tableBodyAttrs: resultaten_tableBodyAttrs,
			pluginStates: resultaten_pluginStates
		} = resultaten_table.createViewModel(resultaten_columns));

		({
			hasNextPage: resultaten_hasNextPage,
			hasPreviousPage: resultaten_hasPreviousPage,
			pageIndex: resultaten_pageIndex
		} = resultaten_pluginStates.page);

		({ filterValue: resultaten_filterValue } = resultaten_pluginStates.filter);
	});

	$: data.verkiezing.then((n) => { geselecteerde_functies = n.stemgerechtigde_functies })
</script>

{#await data.verkiezing then verkiezing}
	{#if kandidaten_table}
		<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<Qrcodegenerator verkiezing_id={verkiezing.id} bind:modal_open />
			<div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
				<div class="flex flex-row justify-between gap-4">
					<div class="flex flex-row gap-4">
						<Button href="/beheer/verkiezingen" variant="outline" size="icon" class="h-7 w-7">
							<ChevronLeft class="h-4 w-4" />
							<span class="sr-only">Terug</span>
						</Button>
						<h1
							class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0"
						>
							{verkiezing.naam}
						</h1>
					</div>
					<Badge variant="outline" class="ml-auto sm:ml-0"
						>{verkiezing.actief ? 'Actief' : 'Inactief'}</Badge
					>
				</div>
				<div class="grid gap-4">
					<div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Tabs.Root
							value={van_toegang ? "toegang" : "kandidaten"}
							class="max-w-[300px] md:max-w-[600px] lg:max-w-[900px] lg:w-[900px]"
						>
							<Tabs.List>
								<Tabs.Trigger value="kandidaten">Kandidaten</Tabs.Trigger>
								<Tabs.Trigger value="resultaten">Resultaten</Tabs.Trigger>
								<Tabs.Trigger value="toegang">Toegang</Tabs.Trigger>
							</Tabs.List>
							<Tabs.Content value="kandidaten">
								<Card.Root>
									<Card.Header>
										<Card.Title>Kandidaten</Card.Title>
										<Card.Description>
											Kandidaten worden weergeven in volgorde van verkiezing
										</Card.Description>
									</Card.Header>
									<Card.Content class="flex flex-col gap-2">
										<div class="flex flex-col md:flex-row justify-between">
											<div class="flex items-center py-4">
												<Input
													class="max-w-sm"
													placeholder="Filter kandidaten..."
													type="text"
													bind:value={$kandidaten_filterValue}
												/>
											</div>
											<Button
												href={`/beheer/verkiezingen/${verkiezing.id}/kandidaten`}
												class="flex items-center gap-2 self-center"
												><ExternalLink class="h-4 w-4" /> Bewerk kandidaten</Button
											>
										</div>
										<div class="rounded-md border">
											<Table.Root {...$kandidaten_tableAttrs}>
												<Table.Header>
													{#each $kandidaten_headerRows as headerRow}
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
												<Table.Body {...$kandidaten_tableBodyAttrs}>
													{#each $kandidaten_pageRows as row (row.id)}
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
												on:click={() => ($kandidaten_pageIndex = $kandidaten_pageIndex - 1)}
												disabled={!$kandidaten_hasPreviousPage}>Vorige</Button
											>
											<Button
												variant="outline"
												size="sm"
												disabled={!$kandidaten_hasNextPage}
												on:click={() => ($kandidaten_pageIndex = $kandidaten_pageIndex + 1)}
												>Volgende</Button
											>
										</div>
									</Card.Content>
								</Card.Root>
							</Tabs.Content>
							<Tabs.Content value="resultaten">
								<Card.Root>
									<Card.Header>
										<Card.Title>Resultaten</Card.Title>
										<Card.Description>Bekijk hier de resultaten van de verkiezing</Card.Description>
									</Card.Header>
									<Card.Content class="flex flex-col gap-2">
										<Input
											class="max-w-sm place-self-center"
											placeholder="Filter kandidaten..."
											type="text"
											bind:value={$resultaten_filterValue}
										/>
										<div class="rounded-md border">
											<Table.Root {...$resultaten_tableAttrs}>
												<Table.Header>
													{#each $resultaten_headerRows as headerRow}
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
												<Table.Body {...$resultaten_tableBodyAttrs}>
													{#each $resultaten_pageRows as row (row.id)}
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
												on:click={() => ($resultaten_pageIndex = $resultaten_pageIndex - 1)}
												disabled={!$resultaten_hasPreviousPage}>Vorige</Button
											>
											<Button
												variant="outline"
												size="sm"
												disabled={!$resultaten_hasNextPage}
												on:click={() => ($resultaten_pageIndex = $resultaten_pageIndex + 1)}
												>Volgende</Button
											>
										</div>
									</Card.Content>
								</Card.Root>
							</Tabs.Content>
							<Tabs.Content value="toegang">
								<Card.Root>
									<Card.Header>
										<Card.Title>Toegang</Card.Title>
										<Card.Description>Bewerk hier wie toegang krijgt om te stemmen</Card.Description
										>
									</Card.Header>
									<Card.Content class="flex flex-col items-center gap-2">
										{#await data.praesidium_leden then praesidium_leden}
											<Praesidiumlidselector bind:van_toegang verkiezing_id={verkiezing.id} {praesidium_leden} {geselecteerde_functies} />
										{/await}
										<Button class="flex gap-2 items-center" on:click={_ => modal_open = true}> <QrCode class="h-4 w-4" />Toevoegen via QR-Code</Button>
									</Card.Content>
								</Card.Root>
							</Tabs.Content>
						</Tabs.Root>
					</div>
				</div>
			</div>
		</main>
	{/if}
{/await}
