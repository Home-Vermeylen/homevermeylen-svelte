import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$lib/components/ui/data-table';
import DataTableActions from './data-table-actions.svelte';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'naam',
    header: 'Naam'
  },
  {
    accessorKey: 'ambitie',
    header: 'Ambitie'
  },
  {
    accessorKey: 'opties',
    header: 'Opties',
    cell: ({ row }) => {
      return row.getValue('opties').length == 3 ? "Voor, Tegen, Onthouding" : "Voor, Tegen"

    }
  },
  {
    id: 'acties',
    header: 'Acties',
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { kandidaat: row.original, id: 'joe' });
    }
  }
];
