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

	export let praesidium_leden;
	export let geselecteerde_functies: string[];
	export let verkiezing_id;
	export let van_toegang: boolean;

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

	let open = false;
</script>

<form method="POST" use:enhance action={`/api/verkiezingen/${verkiezing_id}`}>
	<Form.Field {form} name="geselecteerde_functies" class="flex flex-col items-center">
		<Popover.Root bind:open let:ids>
			<Form.Control let:attrs>
				<Form.Label>Stemgerechtigde Homeraadsleden</Form.Label>
				<Input type="hidden" {...attrs} bind:value={$formData.geselecteerde_functies} />
				<Popover.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						class="w-[200px] justify-between"
					>
						{$formData.geselecteerde_functies.length}
						{$formData.geselecteerde_functies.length == 1 ? 'lid' : 'leden'} geselecteerd
						<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-[400px] p-0">
					<Command.Root>
						<Command.Input autofocus placeholder="Zoek homeraadslid..." class="h-9" />
						<Command.Empty>Geen homeraadsleden gevonden.</Command.Empty>
						<Command.Group>
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
			</Form.Control>
		</Popover.Root>

		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
</form>
