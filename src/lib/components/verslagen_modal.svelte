<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { VerslagSchema } from '$lib/schemas';
	import { fileProxy, superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Input } from './ui/input';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { LoaderCircle } from 'lucide-svelte';

	interface Props {
		data: SuperValidated<Infer<typeof VerslagSchema>>;
	}

	let { data }: Props = $props();

	const form = superForm(data, {
		validators: zod(VerslagSchema),
		async onUpdated() {
			if ($page.state.activiteit) {
				history.back();
			}
		}
	});

	const { form: formData, enhance, delayed, isTainted, tainted } = form;

	let pdf = fileProxy(form, 'pdf');

	$effect(() => {
		if ($page.state.verslag) {
			$formData.naam = $page.state.verslag.naam ?? '';
			$formData.id = $page.state.verslag.id;
		}
	});
</script>

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
				{#if $page.state.verslag != null}
					<strong>{$page.state.verslag?.naam}</strong> bewerken
				{:else}
					Nieuw verslag
				{/if}
			</Dialog.Title>
		</Dialog.Header>
		<form
			method="POST"
			class="flex flex-col"
			use:enhance
			enctype="multipart/form-data"
			action="/api/verslagen"
		>
			<Form.Field {form} name="pdf">
				<Form.Control>
					{#snippet children({ props })}
						<input
							class={'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'}
							{...props}
							type="file"
							bind:files={$pdf}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="id">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} type="hidden" bind:value={$formData.id} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="naam">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Naam</Form.Label>
						<Input {...props} bind:value={$formData.naam} />
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

