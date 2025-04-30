<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import DataTable from '$lib/components/data-table.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import VerkiezingsStemmingenDialog from '$lib/components/verkiezings-stemmingen-dialog.svelte';
	import { VerwijderStemmingSchema } from '$lib/schemas';
	import { ChevronLeft, LoaderCircle, UserPlus } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import { columns } from './columns';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const form = superForm(data.verwijder_stemming_form, {
		validators: zod(VerwijderStemmingSchema),
		async onUpdated() {
			if ($page.state.verwijder_stemming) {
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
	{#if $page.state.verwijder_stemming}
		<AlertDialog.Root open={true}>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Ben je zeker?</AlertDialog.Title>
					<AlertDialog.Description>
						Deze actie kan niet ongedaan gemaakt worden. Dit zal de stemming permanent
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
						action="?/verwijder_stemming"
					>
						<Form.Field {form} name="stemming_id">
							<Form.Control>
								{#snippet children({ props })}
									<Input {...props} type="hidden" value={$page.state.verwijder_stemming} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</form>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	{/if}

	{#if $page.state.stemming}
		<VerkiezingsStemmingenDialog data={data.form} verkiezing_id={verkiezing.id} />
	{/if}<div class="flex flex-row gap-2 w-full"><Button variant="outline" href={`/beheer/verkiezingen/${verkiezing.id}`}><ChevronLeft /></Button><Button onclick={() => pushState('', { stemming: true })}
		><UserPlus class="h-4 w-4" /> Nieuwe stemming</Button
	></div>

	<DataTable modelsPerPage={10} data={verkiezing.stemmingen} {columns} />
{/await}
