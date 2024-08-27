<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Ellipsis } from 'lucide-svelte';

	

	export let id: string;
    export let data: object;
    export let setter;
	export let type: 'activiteit' | 'verslag' | 'augustje';

	let alert_open = false;
</script>

<AlertDialog.Root bind:open={alert_open}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Ben je zeker?</AlertDialog.Title>
			<AlertDialog.Description>
				Deze handeling kan niet worden ongedaan gemaakt. {type == 'activiteit' ? 'De' : 'Het'}
				{type} zal permanent verwijderd worden.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel
				on:click={() => {
					alert_open = false;
				}}>Annuleer</AlertDialog.Cancel
			>
			<AlertDialog.Action
				on:click={async () => {
					await fetch(
						`/api/${
							type == 'activiteit'
								? 'activiteiten'
								: type == 'augustje'
								? 'augustjes'
								: type == 'verslag'
								? 'verslagen'
								: ''
						}`,
						{
							method: 'DELETE',
							body: JSON.stringify({ id })
						}
					).finally(() => {
						alert_open = false;
					});
				}}>Verwijder</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

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
			<DropdownMenu.Item on:click={ setter(data) }>Bewerken</DropdownMenu.Item>
			<DropdownMenu.Item on:click={ () => alert_open = true }>Verwijderen</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
