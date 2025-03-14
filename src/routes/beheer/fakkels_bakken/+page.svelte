<script lang="ts">
	import DataTable from './data-table.svelte';
	import type { PageData } from './$types';
	import { columns } from './columns.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import { FakkelsBakkenSchema } from '$lib/schemas';
	import { zod } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { LoaderCircle } from 'lucide-svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const form = superForm(data.fakkels_bakken_form, {
		validators: zod(FakkelsBakkenSchema),
		async onUpdated() {
			if ($page.state.fakkels_bakken) {
				history.back();
			}
		}
	});

	const { form: formData, enhance, delayed, isTainted, tainted } = form;

	$effect(() => {
		if ($page.state.fakkels_bakken) {
			$formData.fakkels = $page.state.fakkels_bakken.fakkels;
			$formData.bakken = $page.state.fakkels_bakken.bakken;
			$formData.id = $page.state.fakkels_bakken.id;
		}
	});
</script>

{#if $page.state.fakkels_bakken}
	<Dialog.Root
		onOpenChange={(open) => {
			if (open == false) {
				history.back();
			}
		}}
		open={true}
	>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>
					Gegevens voor <strong>{$page.state.fakkels_bakken.voornaam}</strong>
				</Dialog.Title>
			</Dialog.Header>
			<form
				method="POST"
				class="flex flex-col"
				use:enhance
				enctype="multipart/form-data"
				action="/api/fakkels_bakken"
			>
				<Form.Field {form} name="id">
					<Form.Control>
						{#snippet children({ props })}
							<Input {...props} type="hidden" bind:value={$formData.id} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="fakkels">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Fakkels</Form.Label>
							<Input {...props} type="number" bind:value={$formData.fakkels} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="bakken">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Bakken</Form.Label>
							<Input {...props} type="number" bind:value={$formData.bakken} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				{#if $delayed}<Button disabled>
						<LoaderCircle class="animate-spin" />
						Even geduld
					</Button>
				{:else}
					<Form.Button disabled={!isTainted($tainted)} class="text-center">Opslaan</Form.Button>
				{/if}
			</form>
		</Dialog.Content>
	</Dialog.Root>
{/if}

{#await data.fakkels_bakken then fakkels_bakken}
	<DataTable data={fakkels_bakken} {columns} />
{/await}
