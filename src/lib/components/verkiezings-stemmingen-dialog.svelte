<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { StemmingSchema } from '$lib/schemas';
	import { LoaderCircle } from 'lucide-svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { Input } from './ui/input';

	interface Props {
    	data: SuperValidated<Infer<typeof StemmingSchema>>;
    	verkiezing_id: string;
    	stemming?: any;
	}
	let { data, verkiezing_id, stemming }: Props = $props();

	const form = superForm(data, {
    	async onUpdated() {
        	if ($page.state.stemming || $page.state.bewerk_stemming) {
            	history.back();
        	}
    	}
	});
	const { form: formData, enhance, delayed, isTainted, tainted } = form;

	$effect(() => {
    	if (stemming) {
        	$formData.id = stemming.id;
        	$formData.naam = stemming.naam;
        	$formData.opties = stemming.opties?.map((o: any) => o.naam).join(', ');
    	}
	});
</script>

<Dialog.Root
	onOpenChange={(open) => {
    	if (open == false) {
        	history.back();
    	}
	}}
	open={$page.state.stemming != null || $page.state.bewerk_stemming != null}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{stemming ? 'Stemming bewerken' : 'Stemming toevoegen'}</Dialog.Title>
		</Dialog.Header>
		<form
			method="POST"
			class="flex flex-col"
			use:enhance
			enctype="multipart/form-data"
			action={`/api/verkiezingen/${verkiezing_id}/stemmingen`}
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

			<Form.Field {form} name="opties_str">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Opties</Form.Label>
						<Input {...props} bind:value={$formData.opties} placeholder="bv. Petra De Sutter, Rik Van De Walle, Tegen, Onthouding"/>
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
