import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table';
import DataTableSortButton from './data-table-sort-button.svelte';
import { Button } from '$lib/components/ui/button';
import { pushState } from '$app/navigation';
import EditButton from './edit_button.svelte';
export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'voornaam',
		header: 'Voornaam'
	},
	{
		accessorKey: 'familienaam',
		header: 'Familienaam'
	},
	{
		accessorKey: 'fakkels',
		header: ({ column }) =>
			renderComponent(DataTableSortButton, {
				onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
				text: 'Fakkels'
			})
	},
	{
		accessorKey: 'bakken',
		header: ({ column }) =>
			renderComponent(DataTableSortButton, {
				onclick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
				text: 'Bakkels'
			})
	},
	{
		id: 'acties',
		header: 'Acties',
		cell: ({ row, table }) => {
			return renderComponent(EditButton, {
				fakkels_bakken: row.original
			});
		}
	}
];
