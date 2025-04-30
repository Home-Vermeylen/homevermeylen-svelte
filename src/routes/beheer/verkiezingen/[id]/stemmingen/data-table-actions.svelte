<script lang="ts">
	import { pushState } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Ellipsis } from 'lucide-svelte';

	let { stemming, id } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="ghost" size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Label>Acties</DropdownMenu.Label>
		<DropdownMenu.Item onclick={() => pushState('', { verwijder_stemming: stemming.id })}
			>Verwijder</DropdownMenu.Item
		>
	</DropdownMenu.Content>
</DropdownMenu.Root>
