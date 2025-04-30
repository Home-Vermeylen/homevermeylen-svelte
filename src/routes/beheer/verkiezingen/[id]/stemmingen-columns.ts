import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import Statusknoppen from './statusknoppen.svelte';

export const stemmingen_columns: ColumnDef<object>[] = [
  {
    accessorKey: 'naam',
    header: 'Naam',
  },
  {
    accessorKey: 'opties',
    header: 'Opties',
    cell: ({ row }) => {
      if (row.getValue('opties')?.length > 0) {
        return ''.concat(row.getValue('opties').map(optie => optie.naam))
      }
      return 'Geen opties.'
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return renderComponent(Statusknoppen, { status: row.getValue('status'), stemming_id: row.original.id })
    }
  },
];
