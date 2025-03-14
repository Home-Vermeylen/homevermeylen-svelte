<script lang="ts">
	import Activiteitenmodal from '$lib/components/activiteitenmodal.svelte';
	import DataTable from '$lib/components/data-table.svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { page } from '$app/stores';
	import { columns } from './columns.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CalendarPlus, LoaderCircle } from 'lucide-svelte';
	import { pushState } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod } from 'sveltekit-superforms/adapters';
	import { VerwijderActiviteitSchema } from '$lib/schemas.js';

	let { data } = $props();

	const form = superForm(data.verwijder_activiteit_form, {
		validators: zod(VerwijderActiviteitSchema),
		async onUpdated() {
			if ($page.state.verwijder_activiteit) {
				history.back();
			}
		}
	});

	const { form: formData, enhance, delayed, isTainted, tainted } = form;
</script>

{#if $page.state.verwijder_activiteit}
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
					action="?/verwijder_activiteit"
				>
					<Form.Field {form} name="id">
						<Form.Control>
							{#snippet children({ props })}
								<Input {...props} type="hidden" value={$page.state.verwijder_activiteit} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</form>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}

{#if $page.state.activiteit || $page.state.new_modal}
	<Activiteitenmodal data={data.activiteiten_form} />
{/if}

{#await data.activiteiten_promise}
	<div class="flex items-center space-x-4">
		<Skeleton class="size-12 rounded-full" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</div>
{:then activiteiten}
	<Button onclick={() => pushState('', { new_modal: true })}
		><CalendarPlus class="h-4 w-4" /> Nieuwe Activiteit</Button
	>
	<DataTable modelsPerPage={5} data={activiteiten} {columns} />
{/await}
