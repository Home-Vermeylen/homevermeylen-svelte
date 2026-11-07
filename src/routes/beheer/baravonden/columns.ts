import type { ColumnDef } from '@tanstack/table-core';

type Baravond = {
	id: string;
	naam?: string;
	datum?: Date | string;
	praesidium?: string;
	afgesloten?: boolean;
	expand?: {
		praesidium?: {
			id: string;
			academiejaar?: string;
			naam?: string;
		};
	};
};

export const columns: ColumnDef<Baravond>[] = [
	{
		accessorKey: 'naam',
		header: 'Naam'
	},
	{
		accessorKey: 'datum',
		header: 'Datum',
		cell: ({ row }) =>
			new Date(row.getValue('datum')).toLocaleDateString('nl-BE', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			})
	},
	{
		id: 'praesidium',
		header: 'Praesidium',
		cell: ({ row }) => row.original.expand?.praesidium?.academiejaar ?? 'Onbekend'
	},
	{
	id: 'status',
	header: 'Status',
	enableHiding: false,
	cell: ({ row }) => (row.original.afgesloten ? 'Closed' : 'Open')
},
	{
		id: 'actie',
		header: '',
		enableHiding: false,
		cell: () => '›'
	}
];