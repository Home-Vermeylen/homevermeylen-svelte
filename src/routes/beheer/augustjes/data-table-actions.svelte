<script lang="ts">
	import { pushState } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Ellipsis } from 'lucide-svelte';
	import type { AugustjesRecord } from '../../../../types/pocketbase-types';

	let { augustje }: { augustje: AugustjesRecord } = $props();

	function updateGeselecteerdAugustje(augustje: AugustjesRecord) {
		pushState('', { augustje });
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
			<DropdownMenu.Item onclick={() => updateGeselecteerdAugustje(augustje)}
				>Bewerken</DropdownMenu.Item
			>
			<DropdownMenu.Item onclick={() => pushState('', { verwijder_ids: [augustje.id] })}
				>Verwijder</DropdownMenu.Item
			>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
