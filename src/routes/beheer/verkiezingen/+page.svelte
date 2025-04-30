<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import DataTable from '$lib/components/data-table.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import VerkiezingenModal from '$lib/components/verkiezingen-modal.svelte';
	import { VerwijderVerkiezingenSchema } from '$lib/schemas.js';
	import { CirclePlus, LoaderCircle } from 'lucide-svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import { columns } from './columns.js';

	let { data } = $props();

	const form = superForm(data.verwijder_form, {
		validators: zod(VerwijderVerkiezingenSchema),
		async onUpdated() {
			if ($page.state.verwijder_id) {
				history.back();
			}
		}
	});

	const { form: formData, enhance, delayed, isTainted, tainted } = form;
</script>

{#if $page.state.verwijder_id}
	<AlertDialog.Root open={true}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Ben je zeker?</AlertDialog.Title>
				<AlertDialog.Description>
					Deze actie kan niet ongedaan gemaakt worden. Dit zal de verkiezingen permanent
					verwijderen.
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
					action="?/verwijder_verkiezing"
				>
					<Form.Field {form} name="id">
						<Form.Control>
							{#snippet children({ props })}
								<Input {...props} type="hidden" value={$page.state.verwijder_id} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</form>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}

{#if $page.state.verkiezing || $page.state.new_modal}
	<VerkiezingenModal data={data.form} />
{/if}

{#await data.verkiezingen_promise}
	<div class="flex items-center space-x-4">
		<Skeleton class="size-12 rounded-full" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</div>
{:then verkiezingen}
	<Button onclick={() => pushState('', { new_modal: true })}
		><CirclePlus class="h-4 w-4" /> Nieuwe Verkiezing</Button
	>
	<DataTable modelsPerPage={5} data={verkiezingen} {columns} />
{/await}
