import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import DataTableSortButton from './data-table-sort-button.svelte';
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
				text: 'Bakken'
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
