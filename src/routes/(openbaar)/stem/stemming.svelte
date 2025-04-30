<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { StemSchema } from '$lib/schemas';
	import { LoaderCircle, Send } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	interface Props {
		data: PageData;
		stemming: object;
		verkiezing: object;
		stemmer_id: object;
	}

	let { data = $bindable(), stemming, verkiezing, stemmer_id }: Props = $props();

	const form = superForm(data.stem_form, {
		id: stemming.id,
		validators: zodClient(StemSchema),
		onUpdated: ({ form }) => {
			if (form.message) {
				form.message.type == 'success'
					? toast.success(form.message.text)
					: toast.error(form.message.text);
			}
		}
	});

	const { form: formData, enhance, tainted, delayed, isTainted } = form;
</script>

<Card.Root class="w-[250px] sm:w-[350px]">
	<Card.Header>
		<Card.Title>{stemming.naam}</Card.Title>
		<Card.Description
			>Stem op één van de {stemming.opties.length} opties</Card.Description
		>
	</Card.Header>
	<Card.Content class="p-0 px-6 pb-6">
		<form
			method="POST"
			use:enhance
			action={`/api/verkiezingen/${verkiezing.id}/stem`}
			class="flex flex-col"
		>
			<Form.Field {form} name="verkiezing_id">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} type="hidden" bind:value={verkiezing.id} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="stemming_id">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} type="hidden" bind:value={stemming.id} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="stemmer_id">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} type="hidden" bind:value={stemmer_id} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Fieldset {form} name="optie" class="space-y-3">
				<Form.Legend>Breng je stem uit</Form.Legend>
				<RadioGroup.Root
					bind:value={$formData.optie}
					class="flex flex-col space-y-1"
					name="optie"
				>
					{#each stemming.opties as optie (optie.id)}
						<div class="flex items-center space-x-3 space-y-0">
							<Form.Control>
								{#snippet children({ props })}
									<RadioGroup.Item value={optie.id} {...props} />
									<Form.Label class="font-normal">{optie.naam}</Form.Label>
								{/snippet}
							</Form.Control>
						</div>
					{/each}
				</RadioGroup.Root>
				<Form.FieldErrors />
			</Form.Fieldset>

			{#if $delayed}<Button disabled>
					<LoaderCircle class="animate-spin" />
					Even geduld
				</Button>
			{:else}
				<Form.Button disabled={!isTainted($tainted)} class="text-center"><Send /></Form.Button>
			{/if}
		</form>
	</Card.Content>
</Card.Root>
