<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { LoaderCircle } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { Input } from './ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { VerkiezingenSchema } from '$lib/schemas';
	import { page } from '$app/stores';
	import { Switch } from './ui/switch';
	interface Props {
		data: SuperValidated<Infer<typeof VerkiezingenSchema>>;
	}

	let { data }: Props = $props();

	const form = superForm(data, {
		validators: zod(VerkiezingenSchema),
		async onUpdated() {
			if ($page.state.verkiezing) {
				history.back();
			}
		}
	});

	const { form: formData, enhance, delayed, isTainted, tainted } = form;

	$effect(() => {
		if ($page.state.verkiezing) {
			$formData.naam = $page.state.verkiezing.naam ?? '';
			$formData.type = $page.state.verkiezing.type as string;
			$formData.actief = $page.state.verkiezing.actief;
			$formData.id = $page.state.verkiezing.id;
		}
	});

	$effect(() => console.log($formData.actief));
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
		<Dialog.Header
			><Dialog.Title>
				{#if $page.state.verkiezing != null}
					<strong>{$page.state.verkiezing?.naam}</strong> bewerken
				{:else}
					Nieuwe verkiezing
				{/if}
			</Dialog.Title></Dialog.Header
		>
		<form
			method="POST"
			class="flex flex-col"
			use:enhance
			enctype="multipart/form-data"
			action={$page.state.verkiezing?.id
				? `/api/verkiezingen/${$page.state.verkiezing?.id}`
				: '/api/verkiezingen'}
		>
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
			<Form.Field {form} name="type">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Activiteitstype</Form.Label>
						<Select.Root type="single" bind:value={$formData.type} name={props.name}>
							<Select.Trigger {...props}>
								{$formData.type == ''
									? 'Selecteer een verkiezingstype.'
									: $formData.type}</Select.Trigger
							>
							<Select.Content>
								<Select.Item value="NORMAAL">Normaal</Select.Item>
								<Select.Item value="">Andere</Select.Item>
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="space-y-5 pb-5">
				<Form.Field
					{form}
					class="flex flex-row items-center justify-between rounded-lg border p-4"
					name="actief"
				>
					<Form.Control>
						{#snippet children({ props })}
							<div class="space-y-0.5">
								<Form.Label>Actief</Form.Label>
								<Form.Description>
									Stel de verkiezing beschikbaar voor het publiek.
								</Form.Description>
							</div>
							<Switch {...props} bind:checked={$formData.actief} />
						{/snippet}
					</Form.Control>
				</Form.Field>
			</div>
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
