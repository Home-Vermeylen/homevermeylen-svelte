<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { ActiviteitSchema, KandidaatSchema } from '$lib/schemas';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Input } from './ui/input';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { LoaderCircle } from 'lucide-svelte';

	interface Props {
		data: SuperValidated<Infer<typeof KandidaatSchema>>;
		verkiezing_id: string;
	}

	let { data, verkiezing_id }: Props = $props();

	const form = superForm(data, {
		validators: zod(KandidaatSchema),
		async onUpdated() {
			if ($page.state.kandidaat) {
				history.back();
			}
		}
	});

	const { form: formData, enhance, delayed, isTainted, tainted } = form;
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
			<Dialog.Title>Kandidaat toevoegen</Dialog.Title>
		</Dialog.Header>
		<form
			method="POST"
			class="flex flex-col"
			use:enhance
			enctype="multipart/form-data"
			action={`/api/verkiezingen/${verkiezing_id}/kandidaten`}
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
			<Form.Field {form} name="ambitie">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Ambitie</Form.Label>
						<Input {...props} bind:value={$formData.ambitie} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="opties">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Opties</Form.Label>
						<Select.Root type="single" bind:value={$formData.activiteitstype} name={props.name}>
							<Select.Trigger {...props}>
								{$formData.opties == ''
									? 'Selecteer de stemopties.'
									: $formData.opties}</Select.Trigger
							>
							<Select.Content>
								<Select.Item value="standaard">Voor, Tegen, Onthouding</Select.Item>
								<Select.Item value="geen_onthouden">Voor, Tegen</Select.Item>
							</Select.Content>
						</Select.Root>
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
