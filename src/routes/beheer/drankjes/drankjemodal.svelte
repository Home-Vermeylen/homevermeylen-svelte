<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { DrankjeSchema } from '$lib/schemas';
	import { fileProxy, superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button';
	import { LoaderCircle } from 'lucide-svelte';

	interface Props {
		data: SuperValidated<Infer<typeof DrankjeSchema>>;
		drankje?: any;
		onClose: () => void;
	}

	let { data, drankje, onClose }: Props = $props();

	const form = superForm(data, {
		validators: zod4(DrankjeSchema),
		async onUpdated({ form: updatedForm }) {
			if (updatedForm.valid) {
				onClose();
			}
		}
	});

	let foto = fileProxy(form, 'foto');
	let fotoUrl: string | null = $state(null);

	const { form: formData, enhance, delayed, isTainted, tainted } = form;

	$effect(() => {
		if (drankje) {
			$formData.id = drankje.id;
			$formData.naam = drankje.naam;
			$formData.actief = drankje.actief;
			$formData.volgorde = drankje.volgorde;
			fotoUrl = drankje.foto ?? null;
		} else {
			$formData.naam = '';
			$formData.actief = true;
			$formData.volgorde = 0;
		}
	});
</script>

<Dialog.Root open={true} onOpenChange={(open) => !open && onClose()}>
	<Dialog.Content class="max-h-[90vh] overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>
				{#if drankje}
					{drankje.naam} bewerken
				{:else}
					Nieuw drankje
				{/if}
			</Dialog.Title>
		</Dialog.Header>

		<form
			method="POST"
			use:enhance
			enctype="multipart/form-data"
			action="?/opslaan_drankje"
			class="flex flex-col gap-4"
		>
			<Form.Field {form} name="id">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} type="hidden" bind:value={$formData.id} />
					{/snippet}
				</Form.Control>
			</Form.Field>

			<div class="flex flex-col items-center gap-2">
				{#if fotoUrl}
					<img
						src={fotoUrl}
						alt="Foto drankje"
						class="h-40 w-40 rounded-md object-cover"
					/>
				{/if}

				<Form.Field {form} name="foto">
					<Form.Control>
						{#snippet children({ props })}
							<input
								{...props}
								type="file"
								accept="image/*"
								bind:files={$foto}
								class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
								onchange={(event) => {
									const file = event.currentTarget.files?.[0];
									fotoUrl = file ? URL.createObjectURL(file) : fotoUrl;
								}}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<Form.Field {form} name="naam">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Naam</Form.Label>
						<Input {...props} bind:value={$formData.naam} placeholder="Bijvoorbeeld Jupiler" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="volgorde">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Volgorde</Form.Label>
						<Input {...props} type="number" bind:value={$formData.volgorde} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="actief">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center gap-2">
							<input
								{...props}
								type="checkbox"
								bind:checked={$formData.actief}
							/>
							<Form.Label>Actief</Form.Label>
						</div>
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