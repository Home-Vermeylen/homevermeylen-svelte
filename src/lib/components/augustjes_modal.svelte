<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { AugustjesSchema } from '$lib/schemas';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Input } from './ui/input';
	import { ScrollArea } from './ui/scroll-area';

    export let data: SuperValidated<Infer<typeof AugustjesSchema>>;
	export let geselecteerd_augustje: { id: string, naam: string, pdf: string}| undefined;
	export let modal_open: boolean;
	export let id: string;

	const form = superForm(data, {
		id,
		validators: zod(AugustjesSchema),
		onUpdated(event) {
			modal_open = false;
			goto('/beheer', { invalidateAll: true });
		}
	});

	let pdf_url: string | null = null;

	const { form: formData, enhance } = form;

	$: {
		if (geselecteerd_augustje) {
            $formData.id = geselecteerd_augustje.id;
			$formData.naam = geselecteerd_augustje.naam;
		}
	}
</script>

<Dialog.Root preventScroll bind:open={modal_open}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				{#if geselecteerd_augustje}
				<strong>{geselecteerd_augustje?.naam}</strong> bewerken
				{:else}
					Nieuw augustje
				{/if}
			</Dialog.Title>
		</Dialog.Header>
		<form method="POST" use:enhance enctype="multipart/form-data" action="/api/augustjes">
			<ScrollArea class="h-full">
				<div class="flex flex-col items-center gap-2">
					<Form.Field {form} name="pdf">
						<Form.Control let:attrs>
							<Input
								{...attrs}
								type="file"
								on:input={(e) => {
									$formData.pdf = e.currentTarget.files?.item(0) ?? undefined;
									pdf_url =
										$formData.pdf != undefined ? URL.createObjectURL($formData.pdf) : null;
								}}
								accept="image/pdf"
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Form.Field {form} name="id">
					<Form.Control let:attrs>
						<Input {...attrs} type="hidden" bind:value={$formData.id} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="naam">
					<Form.Control let:attrs>
						<Form.Label>Naam</Form.Label>
						<Input {...attrs} bind:value={$formData.naam} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Opslaan</Form.Button>
			</ScrollArea>
		</form>
	</Dialog.Content>
</Dialog.Root>