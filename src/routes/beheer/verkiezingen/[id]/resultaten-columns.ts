import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import Resultaten from './resultaten.svelte';

export const resultaten_columns: ColumnDef<object>[] = [
  {
    accessorKey: 'naam',
    header: 'Naam',
  },
  {
    header: 'Resultaten',
    cell: ({ row }) => {
      return renderComponent(Resultaten, { opties: row.original.opties, status: row.original.status })
    }
  },
];
