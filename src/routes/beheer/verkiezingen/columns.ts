import type { ColumnDef } from '@tanstack/table-core';
import type { VerkiezingenRecord } from '../../../../types/pocketbase-types';
import { renderComponent } from '$lib/components/ui/data-table';
import DataTableActions from './data-table-actions.svelte';
import DataTableDatumButton from './data-table-datum-button.svelte';
import VerkiezingLink from './verkiezing-link.svelte';

export const columns: ColumnDef<VerkiezingenRecord>[] = [
  {
    accessorKey: 'naam',
    header: 'Naam',
    cell: ({ row }) => renderComponent(VerkiezingLink, { verkiezing: row.original })
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
    accessorKey: 'actief',
    header: 'Actief',
    cell: ({ row }) => row.getValue('actief') ? 'Ja' : 'Neen'
  },
  {
    id: 'acties',
    header: 'Acties',
    cell: ({ row, table }) => {
      return renderComponent(DataTableActions, { verkiezing: row.original });
    }
  }
];
