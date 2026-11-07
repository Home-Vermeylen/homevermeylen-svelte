<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { BaravondSchema } from '$lib/schemas';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { LoaderCircle } from 'lucide-svelte';
    import { invalidateAll } from '$app/navigation';

	interface Props {
		data: SuperValidated<Infer<typeof BaravondSchema>>;
		baravond?: any;
		onClose: () => void;
	}

	let { data, baravond, onClose }: Props = $props();

const form = superForm(data, {
	validators: zod4(BaravondSchema),
	resetForm: false,
	invalidateAll: false,
	async onResult({ result }) {
		console.log('1. onResult uitgevoerd:', result.type);

		if (result.type === 'success') {
			console.log('2. Start invalidateAll');

			await invalidateAll();

			console.log('3. invalidateAll voltooid');

			onClose();
			console.log('4. Modal gesloten');
		} else if (result.type === 'error' || result.type === 'failure') {
			console.error('Fout bij opslaan baravond:', result);
		}
	}
});

const { form: formData, enhance, delayed, isTainted, tainted } = form;

	$effect(() => {
		if (baravond) {
			$formData.id = baravond.id;
			$formData.naam = baravond.naam;
			$formData.datum = baravond.datum;
		} else {
			$formData.id = undefined;
			$formData.naam = '';
			$formData.datum = '';
		}
	});
</script>

<Dialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				{baravond ? 'Baravond bewerken' : 'Nieuwe baravond'}
			</Dialog.Title>
		</Dialog.Header>

		<form
			method="POST"
			use:enhance
			enctype="multipart/form-data"
			action="/api/baravonden"
			class="flex flex-col gap-4"
		>
			<Form.Field {form} name="id">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} type="hidden" bind:value={$formData.id} />
					{/snippet}
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="naam">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Naam</Form.Label>
						<Input
							{...props}
							bind:value={$formData.naam}
							placeholder="Bijvoorbeeld Openingsbar"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="datum">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Datum</Form.Label>
						<Input {...props} type="date" bind:value={$formData.datum} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			{#if $delayed}
				<Button disabled>
					<LoaderCircle class="animate-spin" />
					Even geduld
				</Button>
			{:else}
				<Form.Button disabled={!isTainted($tainted)}>Opslaan</Form.Button>
			{/if}
		</form>
	</Dialog.Content>
</Dialog.Root>