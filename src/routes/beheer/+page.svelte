<script lang="ts">
	import Activiteitenmodal from '$lib/components/activiteitenmodal.svelte';
	import AugustjesModal from '$lib/components/augustjes_modal.svelte';
	import Image from '$lib/components/image.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Ellipsis } from '$lib/components/ui/breadcrumb/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs';
	import VerslagenModal from '$lib/components/verslagen_modal.svelte';
	import {
		ArrowUpDown,
		Beer,
		BookOpen,
		Calendar,
		ChevronDown,
		CirclePlus,
		Drama,
		ExternalLink,
		Medal,
		MicVocal,
		PartyPopper,
		ScrollText
	} from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import {
		addHiddenColumns,
		addPagination,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import type { PageData } from './$types.js';
	import DataTableActions from './data_table_actions.svelte';

	export let data: PageData;

	let geselecteerde_tab: 'activiteiten' | 'augustjes' | 'verslagen' = 'activiteiten';
	let modal_open = false;
	let activiteiten_table,
		activiteiten_columns,
		augustjes_table,
		augustjes_columns,
		verslagen_table,
		verslagen_columns,
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		pluginStates,
		hasNextPage,
		hasPreviousPage,
		pageIndex,
		filterValue,
		flatColumns,
		hiddenColumnIds,
		ids,
		hideForId = undefined;

	onMount(async () => {
		activiteiten_table = createTable(readable(await data.activiteiten_promise), {
			page: addPagination({ initialPageSize: 5 }),
			sort: addSortBy(),
			filter: addTableFilter({
				fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
			}),
			hide: addHiddenColumns({
				initialHiddenColumnIds: window.matchMedia('(width <= 640px)').matches
					? ['inschrijven', 'omschrijving', 'locatie', 'activiteitstype']
					: []
			})
		});
		augustjes_table = createTable(readable(await data.augustjes_promise), {
			page: addPagination({ initialPageSize: 5 }),
			sort: addSortBy(),
			filter: addTableFilter({
				fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
			})
		});
		verslagen_table = createTable(readable(await data.verslagen_promise), {
			page: addPagination({ initialPageSize: 5 }),
			sort: addSortBy(),
			filter: addTableFilter({
				fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
			})
		});

		activiteiten_columns = activiteiten_table.createColumns([
			activiteiten_table.column({
				accessor: 'banner',
				header: 'Banner',
				cell: ({ value }) => createRender(Image, { alt: 'Banner', src: value }),
				plugins: {
					sort: {
						disable: true
					},
					filter: {
						exclude: true
					}
				}
			}),
			activiteiten_table.column({
				accessor: 'naam',
				header: 'Naam',
				plugins: { sort: { disable: true } }
			}),
			activiteiten_table.column({
				accessor: 'datum',
				header: 'Datum',
				cell: ({ value }: { value: Date }) => {
					return value.toLocaleDateString('nl-BE', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					});
				},
				plugins: {
					sort: {
						disable: true
					},
					filter: {
						exclude: true
					}
				}
			}),
			activiteiten_table.column({
				accessor: 'activiteitstype',
				header: 'Activiteitstype',
				cell: ({ value }) => {
					return value == 'SPORT'
						? createRender(Badge, { variant:'outline', class: 'flex gap-2 items-center justify-center w-36' }).slot(createRender(Medal, {class:'h-4 w-4'}), 'Sportactiviteit')
						: value == 'CANTUS'
						? createRender(Badge, { variant:'outline', class: 'flex gap-2 items-center justify-center w-24' }).slot(createRender(MicVocal, {class:'h-4 w-4'}), 'Cantus')
						: value == 'BAR'
						? createRender(Badge, { variant:'outline', class: 'flex gap-2 items-center justify-center w-24' }).slot(createRender(Beer, {class:'h-4 w-4'}), 'Baravond')
						: value == 'FUIF'
						? createRender(Badge, { variant:'outline', class: 'flex gap-2 items-center justify-center w-24' }).slot(createRender(PartyPopper, {class:'h-4 w-4'}), 'Fuif')
						: value == 'CULTUUR' 
						? createRender(Badge, { variant:'outline', class: 'flex gap-2 items-center justify-center w-36' }).slot(createRender(Drama, {class:'h-4 w-4'}), 'Cultuuractiviteit')
						: createRender(Badge, { variant:'outline', class: 'flex gap-2 items-center justify-center w-36' }).slot(createRender(Ellipsis, {class:'h-4 w-4'}), 'Diverse activiteit')
				},
				plugins: { sort: { disable: true } }
			}),
			activiteiten_table.column({
				accessor: 'omschrijving',
				header: 'Omschrijving',
				cell: ({ value }: { value: string }) => {
					return value.length > 25 ? value.slice(0, 24) + '...' : value;
				},
				plugins: {
					sort: {
						disable: true
					},
					filter: {
						exclude: true
					}
				}
			}),
			activiteiten_table.column({
				accessor: 'locatie',
				header: 'Locatie',
				plugins: {
					sort: {
						disable: true
					},
					filter: {
						exclude: true
					}
				}
			}),
			activiteiten_table.column({
				accessor: 'formlink',
				header: 'Inschrijven',
				cell: ({ value }) => {
					return value
						? createRender(Button, { variant: 'ghost', href: value }).slot(
								'Ga naar inschrijvingspagina'
						  )
						: 'Niet beschikbaar';
				},
				plugins: {
					sort: {
						disable: true
					},
					filter: {
						exclude: true
					}
				}
			}),
			activiteiten_table.column({
				accessor: ({
					id,
					naam,
					omschrijving,
					datum,
					activiteitstype,
					locatie,
					formlink,
					banner
				}) => ({ id, naam, omschrijving, datum, activiteitstype, locatie, formlink, banner }),
				header: '',
				cell: ({ value }) => {
					return createRender(DataTableActions, {
						id: value.id,
						type: 'activiteit',
						data: {
							id: value.id,
							naam: value.naam,
							omschrijving: value.omschrijving,
							datum: value.datum,
							activiteitstype: value.activiteitstype,
							locatie: value.locatie,
							formlink: value.formlink,
							banner: value.banner
						},
						setter: set_geselecteerde_activiteit
					});
				},
				plugins: {
					sort: {
						disable: true
					},
					filter: {
						exclude: true
					}
				}
			})
		]);

		augustjes_columns = augustjes_table.createColumns([
			augustjes_table.column({
				accessor: 'naam',
				header: 'Titel',
				plugins: { sort: { disable: true } }
			}),
			augustjes_table.column({
				accessor: 'pdf',
				header: 'Bestand',
				plugins: {
					sort: {
						disable: true
					},
					filter: {
						exclude: true
					}
				},
				cell: ({ value }) => {
					return createRender(Button, {
						href: value,
						variant: 'link',
						target: '_blank',
						class: 'flex flex-row gap-2 w-52'
					}).slot(createRender(ExternalLink, { class: 'h-5 w-5' }), 'Open in nieuw tabblad');
				}
			}),
			augustjes_table.column({
				accessor: 'created',
				header: 'Datum',
				cell: ({ value }: { value: Date }) => {
					return new Date(value).toLocaleDateString('nl-BE', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					});
				},
				plugins: {
					filter: {
						exclude: true
					}
				}
			}),
			augustjes_table.column({
				accessor: ({ id, naam, pdf }) => ({ id, naam, pdf }),
				header: '',
				cell: ({ value }) => {
					return createRender(DataTableActions, {
						id: value.id,
						type: 'augustje',
						form: data.activiteiten_form,
						data: { id: value.id, naam: value.naam, pdf: value.pdf },
						setter: set_geselecteerd_augustje
					});
				},
				plugins: {
					sort: {
						disable: true
					},
					filter: {
						exclude: true
					}
				}
			})
		]);
		verslagen_columns = verslagen_table.createColumns([
			verslagen_table.column({
				accessor: 'naam',
				header: 'Titel',
				plugins: {
					sort: {
						disable: true
					}
				}
			}),
			verslagen_table.column({
				accessor: 'pdf',
				header: 'Bestand',
				plugins: {
					sort: {
						disable: true
					},
					filter: {
						exclude: true
					}
				},
				cell: ({ value }) => {
					return createRender(Button, {
						href: value,
						variant: 'link',
						target: '_blank',
						class: 'flex flex-row gap-2 w-52'
					}).slot(createRender(ExternalLink, { class: 'h-5 w-5' }), 'Open in nieuw tabblad');
				}
			}),
			verslagen_table.column({
				accessor: 'created',
				header: 'Datum',
				cell: ({ value }: { value: Date }) => {
					return new Date(value).toLocaleDateString('nl-BE', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					});
				}
			}),
			verslagen_table.column({
				accessor: ({ id, naam, pdf }) => ({ id, naam, pdf }),
				header: '',
				cell: ({ value }) => {
					return createRender(DataTableActions, {
						id: value.id,
						type: 'verslag',
						form: data.verslagen_form,
						data: { id: value.id, naam: value.naam, pdf: value.pdf },
						setter: set_geselecteerd_verslag
					});
				},
				plugins: {
					sort: {
						disable: true
					},
					filter: {
						exclude: true
					}
				}
			})
		]);

		({ headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } =
			activiteiten_table.createViewModel(activiteiten_columns));

		({ hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page);

		({ filterValue } = pluginStates.filter);

		({ hiddenColumnIds } = pluginStates.hide);

		if (flatColumns != undefined) {
			ids = flatColumns.map((col) => col.id);
			hideForId = Object.fromEntries(ids.map((id) => {
				if (window.matchMedia('(width <= 640px)').matches && (id == 'omschrijving' || id == 'activiteitstype' || id == 'locatie' || id == 'formlink' || id == 'banner')) {
					return [id, false];
				}
				return [id, true];
			}));
		}
	});

	$: {
		if (flatColumns != undefined && hideForId != undefined) {
			$hiddenColumnIds = Object.entries(hideForId)
				.filter(([, hide]) => !hide)
				.map(([id]) => id);
		}
	}
	let hidableCols = ['banner', 'activiteitstype', 'omschrijving', 'locatie', 'formlink'];

	function refreshTable(n: string) {
		if (n === 'activiteiten') {
			if (activiteiten_table != undefined) {
				({ headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns } =
					activiteiten_table.createViewModel(activiteiten_columns));

				({ hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page);
				({ filterValue } = pluginStates.filter);
				({ hiddenColumnIds } = pluginStates.hide);
			}
		} else if (n === 'augustjes') {
			if (augustjes_table != undefined) {
				({ headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
					augustjes_table.createViewModel(augustjes_columns));

				({ hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page);
				({ filterValue } = pluginStates.filter);
			}
		} else {
			if (verslagen_table != undefined) {
				({ headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
					verslagen_table.createViewModel(verslagen_columns));
				({ hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page);
				({ filterValue } = pluginStates.filter);
			}
		}
	}

	let geselecteerde_activiteit: object | undefined = undefined;
	let bewerk_activiteit_open = false;
	let geselecteerd_augustje: object | undefined = undefined;
	let bewerk_augustje_open = false;
	let geselecteerd_verslag: object | undefined = undefined;
	let bewerk_verslag_open = false;

	function set_geselecteerde_activiteit(activiteit: object) {
		geselecteerde_activiteit = activiteit;
		bewerk_activiteit_open = true;
	}

	function set_geselecteerd_augustje(augustje: object) {
		geselecteerd_augustje = augustje;
		bewerk_augustje_open = true;
	}
	function set_geselecteerd_verslag(verslag: object) {
		geselecteerd_verslag = verslag;
		bewerk_verslag_open = true;
	}
</script>

{#if geselecteerde_tab == 'activiteiten'}
	<Activiteitenmodal
		id="nieuw"
		geselecteerde_activiteit={undefined}
		data={data.activiteiten_form}
		bind:modal_open
	/>
	<Activiteitenmodal
		id="bewerk_activiteit"
		{geselecteerde_activiteit}
		data={data.activiteiten_form}
		bind:modal_open={bewerk_activiteit_open}
	/>
{:else if geselecteerde_tab == 'augustjes'}
	<AugustjesModal
		id="nieuw_augustje"
		geselecteerd_augustje={undefined}
		data={data.augustjes_form}
		bind:modal_open
	/>
	<AugustjesModal
		id="bewerk_augustje"
		{geselecteerd_augustje}
		data={data.augustjes_form}
		bind:modal_open={bewerk_augustje_open}
	/>
{:else}
	<VerslagenModal
		id="nieuw_verslag"
		geselecteerd_verslag={undefined}
		data={data.verslagen_form}
		bind:modal_open
	/>
	<VerslagenModal
		id="bewerk_verslag"
		{geselecteerd_verslag}
		data={data.verslagen_form}
		bind:modal_open={bewerk_verslag_open}
	/>
{/if}

<Tabs.Root
	bind:value={geselecteerde_tab}
	onValueChange={(n) => refreshTable(n)}
	class="overflow-x-auto"
>
	<div class="flex items-center">
		<Tabs.List>
			<Tabs.Trigger value="activiteiten" class="flex gap-2 items-center"
				><Calendar class="h-3.5 w-3.5" />
				<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Activiteiten</span></Tabs.Trigger
			>
			<Tabs.Trigger value="augustjes" class="flex gap-2 items-center"
				><BookOpen class="h-3.5 w-3.5" />
				<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Augustjes</span></Tabs.Trigger
			>
			<Tabs.Trigger value="verslagen" class="flex gap-2 items-center"
				><ScrollText class="h-3.5 w-3.5" />
				<span class="sr-only sm:not-sr-only sm:whitespace-nowrap">Verslagen</span></Tabs.Trigger
			>
		</Tabs.List>
		<div class="ml-auto flex items-center gap-2">
			<Button on:click={() => (modal_open = true)} size="sm" class="h-8 gap-1">
				<CirclePlus class="h-3.5 w-3.5" />
				<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Voeg toe </span>
			</Button>
		</div>
	</div>
	<Card.Root class="mt-5">
		<Card.Header>
			<Card.Title>
				{geselecteerde_tab == 'activiteiten'
					? 'Activiteiten'
					: geselecteerde_tab == 'augustjes'
					? 'Augustjes'
					: 'Verslagen'}
			</Card.Title>
			<Card.Description>
				Bekijk en bewerk de {geselecteerde_tab == 'activiteiten'
					? 'activiteiten'
					: geselecteerde_tab == 'augustjes'
					? 'augustjes'
					: 'verslagen'} die worden weergegeven op de site.
			</Card.Description>
			<div class="flex flex-row items-center gap-5">
				{#if filterValue != undefined}
					<div class="flex items-center py-4">
						<Input
							class="max-w-sm"
							placeholder={`Filter ${geselecteerde_tab}...`}
							type="text"
							bind:value={$filterValue}
						/>
					</div>
				{/if}
				{#if geselecteerde_tab === 'activiteiten' && hideForId != undefined}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button variant="outline" class="ml-auto" builders={[builder]}>
								Kolommen <ChevronDown class="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							{#each flatColumns as col}
								{#if hidableCols.includes(col.id)}
									<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
										{col.header}
									</DropdownMenu.CheckboxItem>
								{/if}
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{/if}
			</div>
		</Card.Header>
		<Card.Content>
			{#if headerRows != undefined}
				<Table.Root {...$tableAttrs}>
					<Table.Header>
						{#each $headerRows as headerRow}
							<Subscribe rowAttrs={headerRow.attrs()}>
								<Table.Row>
									{#each headerRow.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
											<Table.Head {...attrs}>
												{#if cell.id === 'datum' || cell.id === 'created'}
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
			{/if}
		</Card.Content>
		<Card.Footer class="flex items-center justify-end space-x-4 py-4"
			>{#if $pageIndex != undefined}
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
			{/if}</Card.Footer
		>
	</Card.Root>
</Tabs.Root>
