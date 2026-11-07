import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import { v4 } from 'uuid';
import DataTableActions from './data-table-actions.svelte';

type Stemoptie = {
	id: string;
	naam: string;
};

type Stemming = {
	id: string;
	naam: string;
	opties: Stemoptie[];
	[key: string]: unknown;
};

export const columns: ColumnDef<Stemming>[] = [
	{
		accessorKey: 'naam',
		header: 'Naam'
	},
	{
		accessorKey: 'opties',
		header: 'Opties',
		cell: ({ row }) => {
			const opties = row.original.opties;

			if (opties.length > 0) {
				return opties.map((optie) => optie.naam).join(', ');
			}

			return 'Geen opties.';
		}
	},
	{
		id: 'acties',
		header: 'Acties',
		cell: ({ row }) => {
			return renderComponent(DataTableActions, {
				stemming: row.original,
				id: v4()
			});
		}
	}
];