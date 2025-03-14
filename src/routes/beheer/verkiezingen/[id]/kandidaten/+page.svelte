<script lang="ts">
	import { page } from '$app/stores';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import VerkiezingskandidatenDialog from '$lib/components/verkiezingskandidaten-dialog.svelte';
	import type { PageData } from './$types';
	import DataTable from '$lib/components/data-table.svelte';
	import { columns } from './columns';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Button } from '$lib/components/ui/button';
	import { pushState } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { LoaderCircle, UserPlus } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { VerwijderKandidaatSchema } from '$lib/schemas';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const form = superForm(data.verwijder_kandidaat_form, {
		validators: zod(VerwijderKandidaatSchema),
		async onUpdated() {
			if ($page.state.verwijder_kandidaat) {
				history.back();
			}
		}
	});

	const { form: formData, enhance, delayed, isTainted, tainted } = form;
</script>

{#await data.verkiezing}
	<div class="flex items-center space-x-4">
		<Skeleton class="size-12 rounded-full" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</div>
{:then verkiezing}
	{#if $page.state.verwijder_kandidaat}
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
						action="?/verwijder_kandidaat"
					>
						<Form.Field {form} name="kandidaat_id">
							<Form.Control>
								{#snippet children({ props })}
									<Input {...props} type="hidden" value={$page.state.verwijder_kandidaat} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</form>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	{/if}

	{#if $page.state.kandidaat}
		<VerkiezingskandidatenDialog data={data.form} verkiezing_id={verkiezing.id} />
	{/if}<Button onclick={() => pushState('', { kandidaat: true })}
		><UserPlus class="h-4 w-4" /> Nieuwe kandidaat</Button
	>

	<DataTable modelsPerPage={10} data={verkiezing.kandidaten} {columns} />
{/await}
