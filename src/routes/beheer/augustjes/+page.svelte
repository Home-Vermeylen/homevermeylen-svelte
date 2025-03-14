<script lang="ts">
	import AugustjesModal from '$lib/components/augustjes_modal.svelte';
	import DataTable from '$lib/components/data-table.svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { page } from '$app/stores';
	import { columns } from './columns.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CirclePlus, LoaderCircle } from 'lucide-svelte';
	import { pushState } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import { VerwijderAugustjeSchema } from '$lib/schemas.js';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';

	let { data } = $props();

	const form = superForm(data.verwijder_augustje_form, {
		validators: zod(VerwijderAugustjeSchema),
		async onUpdated() {
			if ($page.state.verwijder_augustje) {
				history.back();
			}
		}
	});

	const { form: formData, enhance, delayed, isTainted, tainted } = form;
</script>

{#if $page.state.verwijder_augustje}
	<AlertDialog.Root open={true}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Ben je zeker?</AlertDialog.Title>
				<AlertDialog.Description>
					Deze actie kan niet ongedaan gemaakt worden. Dit zal het augustje permanent verwijderen.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel onclick={() => history.back()}>Annuleer</AlertDialog.Cancel>
				{#if $delayed}<Button disabled>
						<LoaderCircle class="animate-spin" />
						Even geduld
					</Button>
				{:else}
					<AlertDialog.Action onclick={() => form.submit()}>Verwijder</AlertDialog.Action>
				{/if}
				<form
					method="POST"
					class="flex flex-col"
					use:enhance
					enctype="multipart/form-data"
					action="?/verwijder_augustje"
				>
					<Form.Field {form} name="id">
						<Form.Control>
							{#snippet children({ props })}
								<Input {...props} type="hidden" value={$page.state.verwijder_augustje} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</form>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}

{#if $page.state.augustje || $page.state.new_modal}
	<AugustjesModal data={data.augustjes_form} />
{/if}

{#await data.augustjes_promise}
	<div class="flex items-center space-x-4">
		<Skeleton class="size-12 rounded-full" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</div>
{:then augustjes}
	<Button onclick={() => pushState('', { new_modal: true })}
		><CirclePlus class="h-4 w-4" /> Nieuw Augustje</Button
	>
	<div>
		<DataTable modelsPerPage={5} data={augustjes} {columns} />
	</div>
{/await}
