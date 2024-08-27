<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { VerkiezingenSchema } from '$lib/schemas';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { VerkiezingenResponse } from '../../../../types/pocketbase-types';

	export let verkiezing: VerkiezingenResponse;

	export let data: SuperValidated<Infer<typeof VerkiezingenSchema>>;

	const form = superForm(data, {
		validators: zodClient(VerkiezingenSchema)
	});

	const { form: formData, enhance } = form;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Acties</DropdownMenu.Label>
			<form action={`/api/verkiezingen/${verkiezing.id}`} method="post" use:enhance>
				<Form.Field {form} name="id">
					<Form.Control let:attrs>
						<Input {...attrs} type="hidden" bind:value={verkiezing.id} />
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="actief">
					<Form.Control let:attrs>
						<Input {...attrs} type="hidden" value={!verkiezing.actief} />
					</Form.Control>
				</Form.Field>
				<DropdownMenu.Item on:click={() => form.submit()}>
					{verkiezing.actief ? 'Deactiveer' : 'Activeer'} verkiezing
				</DropdownMenu.Item>
			</form>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group class="flex flex-col">
			<DropdownMenu.Label>Bewerken</DropdownMenu.Label>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<DropdownMenu.Item
						href={`/beheer/verkiezingen/${verkiezing.id}/kandidaten`}
						disabled={verkiezing.actief}>Kandidaten</DropdownMenu.Item
					>
				</Tooltip.Trigger>
				{#if verkiezing.actief}
					<Tooltip.Content side="right">
						Deactiveer de verkiezing alvorens kandidaten te bewerken
					</Tooltip.Content>
				{/if}
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<DropdownMenu.Item disabled={verkiezing.actief} on:click={async () => { await fetch(`/api/verkiezingen/${verkiezing.id}`, { method: 'delete' }); await invalidateAll()}}>Verwijder</DropdownMenu.Item>
				</Tooltip.Trigger>
				{#if verkiezing.actief}
					<Tooltip.Content side="right">
						Deactiveer de verkiezing alvorens ze te verwijderen
					</Tooltip.Content>
				{/if}
			</Tooltip.Root>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
