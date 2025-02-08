<script lang="ts">
	import { cn } from '$lib/utils';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { Button } from './ui/button';
	import * as Command from './ui/command';
	import * as Form from './ui/form';
	import Input from './ui/input/input.svelte';
	import * as Popover from './ui/popover';

	interface Props {
		praesidium_leden: any;
		geselecteerde_functies: string[];
		verkiezing_id: any;
		van_toegang: boolean;
	}

	let {
		praesidium_leden,
		geselecteerde_functies,
		verkiezing_id,
		van_toegang = $bindable()
	}: Props = $props();

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	const form = superForm(
		{ geselecteerde_functies },
		{
			onChange: () => {
				van_toegang = true;
				form.submit();
			},
			invalidateAll: true
		}
	);

	const { form: formData, enhance } = form;

	let open = $state(false);
</script>

<form method="POST" use:enhance action={`/api/verkiezingen/${verkiezing_id}`}>
	<Form.Field {form} name="geselecteerde_functies" class="flex flex-col items-center">
		<Popover.Root bind:open >
			{#snippet children({ ids })}
						<Form.Control >
					{#snippet children({ attrs })}
								<Form.Label>Stemgerechtigde Homeraadsleden</Form.Label>
						<Input type="hidden" {...attrs} bind:value={$formData.geselecteerde_functies} />
						<Popover.Trigger asChild >
							{#snippet children({ builder })}
										<Button
									builders={[builder]}
									variant="outline"
									role="combobox"
									aria-expanded={open}
									class="w-[200px] md:w-[400px] justify-between"
								>
									{$formData.geselecteerde_functies.length}
									{$formData.geselecteerde_functies.length == 1 ? 'lid' : 'leden'} geselecteerd
									<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
																{/snippet}
								</Popover.Trigger>
						<Popover.Content class="w-[200px] md:w-[400px] h-56 p-0 overflow-y-auto">
							<Command.Root>
								<Command.Input autofocus placeholder="Zoek homeraadslid..." class="h-9" />
								<Command.Empty>Geen homeraadsleden gevonden.</Command.Empty>
								<Command.Group class="overflow-y-auto">
									{#each praesidium_leden as praesidium_lid}
										<Command.Item
											value={`${praesidium_lid.expand.functie.username.replace(/[0-9]/g, '')} (${
												praesidium_lid.voornaam
											} ${praesidium_lid.familienaam})`}
											onSelect={() => {
												if (
													$formData.geselecteerde_functies.find(
														(n) => n == praesidium_lid.expand.functie.id
													)
												) {
													$formData.geselecteerde_functies = $formData.geselecteerde_functies.filter(
														(n) => n != praesidium_lid.expand.functie.id
													);
												} else {
													$formData.geselecteerde_functies.push(praesidium_lid.expand.functie.id);
													$formData.geselecteerde_functies = $formData.geselecteerde_functies;
												}

												closeAndFocusTrigger(ids.trigger);
											}}
										>
											{`${praesidium_lid.expand.functie.username.replace(/[0-9]/g, '')} (${
												praesidium_lid.voornaam
											} ${praesidium_lid.familienaam})`}
											<Check
												class={cn(
													'ml-auto h-4 w-4',
													$formData.geselecteerde_functies.find(
														(n) => n == praesidium_lid.expand.functie.id
													)
														? ''
														: 'text-transparent'
												)}
											/>
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.Root>
						</Popover.Content>
												{/snippet}
						</Form.Control>
								{/snippet}
				</Popover.Root>

		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
</form>
