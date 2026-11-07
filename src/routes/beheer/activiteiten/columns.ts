import type { ColumnDef } from '@tanstack/table-core';
import type { ActiviteitenRecord } from '../../../../types/pocketbase-types';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table';
import { createRawSnippet } from 'svelte';
import Activiteitstypebadge from '$lib/components/activiteitstypebadge.svelte';
import DataTableActions from './data-table-actions.svelte';
import DataTableDatumButton from './data-table-datum-button.svelte';

type Activiteitstype = 'SPORT' | 'CANTUS' | 'BAR' | 'FEEST' | 'CULTUUR' | 'ANDERE';

export const columns: ColumnDef<ActiviteitenRecord>[] = [
	{
		accessorKey: 'banner',
		header: 'Banner',
		cell: ({ row }) => {
			const bannerCellSnippet = createRawSnippet<[string]>((getBanner) => {
				const banner = getBanner();
				return {
					render: () =>
						`<img height="64" width="64" class="aspect-square rounded-md object-cover" src="${banner}"/>`
				};
			});

			return renderSnippet(bannerCellSnippet, row.getValue('banner') as string);
		}
	},
	{
		accessorKey: 'naam',
		header: 'Naam'
	},
	{
		accessorKey: 'datum',
		header: ({ column }) =>
			renderComponent(DataTableDatumButton, {
				onclick: () => column.toggleSorting(column.getIsSorted() === 'asc')
			}),
		cell: ({ row }) => {
			return new Date(row.getValue('datum') as string).toLocaleDateString('nl-BE', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			});
		}
	},
	{
		accessorKey: 'activiteitstype',
		header: 'Activiteitstype',
		cell: ({ row }) => {
			return renderComponent(Activiteitstypebadge, {
				activiteitstype: row.getValue('activiteitstype') as Activiteitstype
			});
		}
	},
	{
		accessorKey: 'omschrijving',
		header: 'Omschrijving',
		cell: ({ row }) => {
			const value = row.getValue('omschrijving') as string;

			return value.length > 25 ? value.slice(0, 24) + '...' : value;
		}
	},
	{
		accessorKey: 'locatie',
		header: 'Locatie'
	},
	{
		id: 'acties',
		header: 'Acties',
		cell: ({ row }) => {
			return renderComponent(DataTableActions, { activiteit: row.original });
		}
	}
];