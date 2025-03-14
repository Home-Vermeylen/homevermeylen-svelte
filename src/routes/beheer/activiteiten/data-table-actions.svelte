<script lang="ts">
	import { goto, pushState } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Ellipsis, Pencil } from 'lucide-svelte';
	import type { ActiviteitenRecord } from '../../../../types/pocketbase-types';

	let { activiteit }: { activiteit: ActiviteitenRecord } = $props();

	function updateGeselecteerdeActiviteit(activiteit: ActiviteitenRecord) {
		pushState('', { activiteit });
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
			<DropdownMenu.Item onclick={() => updateGeselecteerdeActiviteit(activiteit)}
				>Bewerken</DropdownMenu.Item
			>
			<DropdownMenu.Item onclick={() => pushState('', { verwijder_activiteit: activiteit.id })}
				>Verwijder</DropdownMenu.Item
			>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
