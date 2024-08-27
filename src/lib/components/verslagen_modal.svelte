<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { VerslagSchema } from '$lib/schemas';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { VerslagenRecord } from '../../../types/pocketbase-types';
	import { Input } from './ui/input';
	import { ScrollArea } from './ui/scroll-area';

    export let data: SuperValidated<Infer<typeof VerslagSchema>>;
	export let geselecteerd_verslag: VerslagenRecord | undefined;
	export let modal_open: boolean;
	export let id: string;

	const form = superForm(data, {
		id,
		validators: zod(VerslagSchema),
		onUpdated(event) {
			modal_open = false;
			geselecteerd_verslag = undefined;
			goto('/beheer', { invalidateAll: true });
		}
	});

	let pdf_url: string | null = null;

	const { form: formData, enhance } = form;

	$: {
		if (geselecteerd_verslag) {
            $formData.id = geselecteerd_verslag.id;
			$formData.naam = geselecteerd_verslag.naam;
		}
	}
</script>

<Dialog.Root preventScroll bind:open={modal_open}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				{#if geselecteerd_verslag}
				<strong>{geselecteerd_verslag?.naam}</strong> bewerken
				{:else}
					Nieuw verslag
				{/if}
			</Dialog.Title>
		</Dialog.Header>
		<form method="POST" use:enhance enctype="multipart/form-data" action="/api/verslagen">
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