import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import Resultaten from './resultaten.svelte';

type Stemoptie = {
	id: string;
	naam: string;
};

type Stemming = {
	id: string;
	naam: string;
	opties: Stemoptie[];
	status: string;
};

export const resultaten_columns: ColumnDef<Stemming>[] = [
	{
		accessorKey: 'naam',
		header: 'Naam'
	},
	{
		header: 'Resultaten',
		cell: ({ row }) => {
			return renderComponent(Resultaten, {
				opties: row.original.opties,
				status: row.original.status
			});
		}
	}
];