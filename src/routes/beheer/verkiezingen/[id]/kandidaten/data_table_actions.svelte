<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';

	let { kandidaat, id } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild >
		{#snippet children({ builder })}
				<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
				<span class="sr-only">Open menu</span>
				<Ellipsis class="h-4 w-4" />
			</Button>
					{/snippet}
		</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Label>Acties</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>Bewerk</DropdownMenu.Item>
		<DropdownMenu.Item
			on:click={async () => {
				await fetch(`/api/verkiezingen/${id}/kandidaten`, {
					method: 'DELETE',
					body: JSON.stringify({ id: kandidaat.id }),
					headers: { 'Content-Type': 'application/json' }
				});

				await invalidateAll();
			}}>Verwijder</DropdownMenu.Item
		>
	</DropdownMenu.Content>
</DropdownMenu.Root>
