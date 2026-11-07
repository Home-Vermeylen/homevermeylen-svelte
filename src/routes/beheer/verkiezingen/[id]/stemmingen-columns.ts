import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import Statusknoppen from './statusknoppen.svelte';

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

export const stemmingen_columns: ColumnDef<Stemming>[] = [
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
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			return renderComponent(Statusknoppen, {
				status: row.original.status,
				stemming_id: row.original.id
			});
		}
	}
];