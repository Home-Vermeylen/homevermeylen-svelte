<script lang="ts">
	import { pushState } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Ellipsis } from 'lucide-svelte';
	import type { AugustjesRecord, VerkiezingenRecord } from '../../../../types/pocketbase-types';

	let { verkiezing }: { verkiezing: VerkiezingenRecord } = $props();

	function updateGeselecteerdeVerkiezing(augustje: AugustjesRecord) {
		pushState('', { verkiezing });
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<Ellipsis />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Acties</DropdownMenu.GroupHeading>
			<DropdownMenu.Item onclick={() => updateGeselecteerdeVerkiezing(verkiezing)}
				>Bewerken</DropdownMenu.Item
			>
			<DropdownMenu.Item onclick={() => pushState('', { verwijder_id: verkiezing.id })}
				>Verwijder</DropdownMenu.Item
			>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
