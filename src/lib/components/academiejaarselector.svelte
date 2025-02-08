<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { Button } from './ui/button';
	import * as Command from './ui/command';
	import * as Popover from './ui/popover';

	interface Props {
		academiejaren: string[];
		geselecteerd_academiejaar: string | undefined;
	}

	let { academiejaren, geselecteerd_academiejaar }: Props = $props();

	let open = $state(false);

	const nav = (academiejaar: string) => {
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('aj', academiejaar);
		goto(`?${query.toString()}`, { invalidateAll: true });
	};
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		<Button
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[200px] justify-between"
		>
			{geselecteerd_academiejaar}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[225px] p-0 mt-1 overflow-y-auto h-64">
		<Command.Root class="overflow-y-auto">
			<Command.Input placeholder="Selecteer een academiejaar" />
			<Command.Empty>Geen academiejaar gevonden.</Command.Empty>
			<Command.List>
				<Command.Group heading="Geselecteerd">
					<Command.Item class="justify-center" value={geselecteerd_academiejaar}>
						<span>{geselecteerd_academiejaar}</span>
					</Command.Item>
				</Command.Group>
				<Command.Group class="overflow-y-auto" heading="Overige academiejaren">
					{#each academiejaren as academiejaar}
						{#if academiejaar != geselecteerd_academiejaar}
							<Command.Item
								class="justify-center"
								value={academiejaar}
								onSelect={() => {
									nav(academiejaar);
								}}
							>
								<span class={geselecteerd_academiejaar == academiejaar && 'font-bold underline'}
									>{academiejaar}</span
								>
							</Command.Item>
						{/if}
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
