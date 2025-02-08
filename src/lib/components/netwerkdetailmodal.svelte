<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		geselecteerde_node: any;
		personen: any;
		connecties: any;
	}

	let { geselecteerde_node = $bindable(), personen, connecties }: Props = $props();
</script>

<Dialog.Root
	open={true}
	onOpenChange={(open) => {
		if (open == false) {
			history.back();
		}
	}}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title
				>{#if geselecteerde_node}
					<b>{geselecteerde_node.label}</b> <i>({geselecteerde_node.group})</i>
				{/if}</Dialog.Title
			>
		</Dialog.Header>

		{#if geselecteerde_node}
			<ul>
				{#each connecties.filter((c) => {
					return c.from == geselecteerde_node.id;
				}) as connectie (connectie.id)}
					<li class="flex flex-col">
						Wat? {connectie.color.color == '#a3f307'
							? 'Gemuild'
							: connectie.color.color == '#05f9e2'
								? 'Seks'
								: 'Relatie'} met {personen.find((p) => p.id == connectie.to)?.label} ({personen.find(
							(p) => p.id == connectie.to
						)?.group})
					</li>
				{/each}
				{#each connecties.filter((c) => {
					return c.to == geselecteerde_node.id;
				}) as connectie (connectie.id)}
					<li class="flex flex-col">
						Wat? {connectie.color.color == '#a3f307'
							? 'Gemuild'
							: connectie.color.color == '#05f9e2'
								? 'Seks'
								: 'Relatie'} met {personen.find((p) => p.id == connectie.from)?.label} ({personen.find(
							(p) => p.id == connectie.from
						)?.group})
						{#if connectie.locatie}
							Waar? {connectie.locatie}
						{/if}
						{#if connectie.commentaar}
							Commentaar: {connectie.commentaar}
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</Dialog.Content>
</Dialog.Root>
