import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$lib/components/ui/data-table';
import Statusknoppen from './statusknoppen.svelte';

export const kandidaten_columns: ColumnDef<object>[] = [
  {
    accessorKey: 'naam',
    header: 'Naam',
  },
  {
    accessorKey: 'ambitie',
    header: 'Ambitite',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return renderComponent(Statusknoppen, { status: row.getValue('status'), kandidaat_id: row.original.id })
    }
  },
];
