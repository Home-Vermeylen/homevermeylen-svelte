<script lang="ts">
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { superForm } from 'sveltekit-superforms';
	import { VerkiezingState } from './verkiezing-beheer-state.svelte';
	import { Button } from '$lib/components/ui/button';
	import { LoaderCircle, Send } from 'lucide-svelte';

	let { status, kandidaat_id } = $props();

	const form = superForm(
		{ status },
		{
			invalidateAll: true
		}
	);
	const { form: formData, enhance, tainted, delayed } = form;
</script>

<form
	action={`/api/verkiezingen/${VerkiezingState.verkiezing?.id}/kandidaten/${kandidaat_id}`}
	method="post"
	aria-disabled={!VerkiezingState.verkiezing?.actief}
	class="flex flex-row gap-2 justify-evenly items-center"
	use:enhance
>
	<Form.Fieldset {form} name="status" class="space-y-3">
		<RadioGroup.Root
			disabled={!VerkiezingState.verkiezing?.actief}
			bind:value={$formData.status}
			class="flex flex-col space-y-1"
			name="status"
		>
			<div class="flex items-center space-x-3 space-y-0">
				<Form.Control>
					{#snippet children({ props })}
						<RadioGroup.Item value="onzichtbaar" {...props} />
						<Form.Label class="font-normal">Onzichtbaar</Form.Label>
					{/snippet}
				</Form.Control>
			</div>
			<div class="flex items-center space-x-3 space-y-0">
				<Form.Control>
					{#snippet children({ props })}
						<RadioGroup.Item value="zichtbaar" {...props} />
						<Form.Label class="font-normal">Zichtbaar</Form.Label>
					{/snippet}
				</Form.Control>
			</div>
			<div class="flex items-center space-x-3 space-y-0">
				<Form.Control>
					{#snippet children({ props })}
						<RadioGroup.Item value="voltooid" {...props} />
						<Form.Label class="font-normal">Voltooid</Form.Label>
					{/snippet}
				</Form.Control>
			</div>
		</RadioGroup.Root>
		<Form.FieldErrors />
	</Form.Fieldset><Button disabled={!$tainted} onclick={() => form.submit()}
		>{#if $delayed}<LoaderCircle class="animate-spin" />
		{:else}<Send />{/if}</Button
	>
</form>
