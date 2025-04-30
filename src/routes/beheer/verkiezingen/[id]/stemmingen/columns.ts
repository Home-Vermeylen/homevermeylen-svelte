import { renderComponent } from '$lib/components/ui/data-table';
import type { ColumnDef } from '@tanstack/table-core';
import { v4 } from 'uuid';
import DataTableActions from './data-table-actions.svelte';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'naam',
    header: 'Naam'
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
    id: 'acties',
    header: 'Acties',
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { stemming: row.original, id: v4() });
    }
  }
];
