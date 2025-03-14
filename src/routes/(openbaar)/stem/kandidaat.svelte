<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Input } from '$lib/components/ui/input';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { StemSchema } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { LoaderCircle, Send } from 'lucide-svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	interface Props {
		data: PageData;
		kandidaat: object;
		verkiezing: object;
		stemmer_id: object;
	}

	let { data = $bindable(), kandidaat, verkiezing, stemmer_id }: Props = $props();

	const form = superForm(data.stem_form, {
		id: kandidaat.id,
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
		<Card.Title>{kandidaat.naam}</Card.Title>
		<Card.Description
			>Stelt zich kandidaat voor <strong>{kandidaat.ambitie}</strong></Card.Description
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
			<Form.Field {form} name="kandidaat_id">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} type="hidden" bind:value={kandidaat.id} />
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
			<Form.Fieldset {form} name="optie_titel" class="space-y-3">
				<Form.Legend>Breng je stem uit</Form.Legend>
				<RadioGroup.Root
					bind:value={$formData.optie_titel}
					class="flex flex-col space-y-1"
					name="optie_titel"
				>
					{#each kandidaat.opties as optie (optie.titel)}
						<div class="flex items-center space-x-3 space-y-0">
							<Form.Control>
								{#snippet children({ props })}
									<RadioGroup.Item value={optie.titel} {...props} />
									<Form.Label class="font-normal">{optie.titel}</Form.Label>
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
