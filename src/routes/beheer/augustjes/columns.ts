import type { ColumnDef } from '@tanstack/table-core';
import type { AugustjesRecord } from '../../../../types/pocketbase-types';
import { renderComponent } from '$lib/components/ui/data-table';
import DataTableActions from './data-table-actions.svelte';
import DataTableDatumButton from './data-table-datum-button.svelte';

export const columns: ColumnDef<AugustjesRecord>[] = [
	{
		accessorKey: 'naam',
		header: 'Naam'
	},
	{
		accessorKey: 'created',
		header: ({ column }) =>
			renderComponent(DataTableDatumButton, {
				onclick: () => column.toggleSorting(column.getIsSorted() === 'asc')
			}),
		cell: ({ row }) => {
			return new Date(row.getValue('created')).toLocaleDateString('nl-BE', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			});
		}
	},
	{
		id: 'acties',
		header: 'Acties',
		cell: ({ row, table }) => {
			return renderComponent(DataTableActions, { verslag: row.original });
		}
	}
];
