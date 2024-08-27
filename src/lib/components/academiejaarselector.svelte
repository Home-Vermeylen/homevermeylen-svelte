<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { Button } from './ui/button';
	import * as Command from './ui/command';
	import * as Popover from './ui/popover';

	export let academiejaren: string[];
	export let geselecteerd_academiejaar: string | undefined;

	let open = false;

	const nav = (academiejaar: string) => {
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('aj', academiejaar);
		goto(`?${query.toString()}`, { invalidateAll: true });
	};
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[200px] justify-between"
		>
			{geselecteerd_academiejaar}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Selecteer een academiejaar" />
			<Command.Empty>Geen academiejaar gevonden.</Command.Empty>
			<Command.Group>
				{#each academiejaren as academiejaar}
					<Command.Item
						value={academiejaar}
						onSelect={(currentValue) => {
							nav(currentValue);
						}}
					>
						<Check
							class={cn(
								'mr-2 h-4 w-4',
								geselecteerd_academiejaar !== academiejaar && 'text-transparent'
							)}
						/>
						{academiejaar}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
