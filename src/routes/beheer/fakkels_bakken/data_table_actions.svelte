<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { FakkelsBakkenSchema } from '$lib/schemas';
	import { Pencil } from 'lucide-svelte';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let lid: {
		id: string;
		voornaam: string;
		familienaam: string;
		fakkels: number;
		bakken: number;
	};

	export let fakkels_bakken_form: SuperValidated<Infer<typeof FakkelsBakkenSchema>>;

	const form = superForm(fakkels_bakken_form, {
		validators: zodClient(FakkelsBakkenSchema),
		onUpdate: (r) => {
			$formData.bakken = r.form.data.bakken;
			$formData.fakkels = r.form.data.fakkels;
		},
		id: lid.id
	});

	const { form: formData, enhance } = form;

	$: {
		$formData.fakkels = lid.fakkels;
		$formData.bakken = lid.bakken;
	}
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder
		><Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Toon menu</span>
			<Pencil class="h-4 w-4" />
		</Button></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Bewerk aantallen voor {lid.voornaam} {lid.familienaam}</Dialog.Title>
		</Dialog.Header>

		<form method="POST" use:enhance action="/api/fakkels_bakken">
			<input name="id" type="hidden" value={lid.id} />
			<Form.Field {form} name="bakken">
				<Form.Control let:attrs>
					<Form.Label>Bakken</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.bakken} />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="fakkels">
				<Form.Control let:attrs>
					<Form.Label>Fakkels</Form.Label>
					<Input {...attrs} type="number" bind:value={$formData.fakkels} />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<Dialog.Footer>
				<Button type="submit">Opslaan</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
