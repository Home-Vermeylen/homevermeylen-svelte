<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import { NieuweConnectieSchema, NieuwePersoonSchema } from '$lib/schemas';
	import { cn } from '$lib/utils.js';
	import { Check, ChevronsUpDown, LoaderCircle } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button, buttonVariants } from './ui/button';
	import { Input } from './ui/input';

	interface Props {
		nieuwe_connectie_data: SuperValidated<Infer<typeof NieuweConnectieSchema>>;
		nieuwe_persoon_data: SuperValidated<Infer<typeof NieuwePersoonSchema>>;
		personen: any;
	}

	let { nieuwe_connectie_data, nieuwe_persoon_data, personen }: Props = $props();

	const nieuwe_connectie_form = superForm(nieuwe_connectie_data, {
		validators: zodClient(NieuweConnectieSchema),
		onUpdated: async () => {
			history.back();
		},
		invalidateAll: true
	});

	const nieuwe_persoon_form = superForm(nieuwe_persoon_data, {
		validators: zodClient(NieuwePersoonSchema),
		onUpdated: () => {
			history.back();
		},
		invalidateAll: true
	});

	const {
		form: nieuwe_connectie_formData,
		enhance: nieuwe_connectie_enhance,
		delayed: nieuwe_connectie_delayed,
		isTainted: nieuwe_connectie_isTainted,
		tainted: nieuwe_connectie_tainted
	} = nieuwe_connectie_form;

	const {
		form: nieuwe_persoon_formData,
		enhance: nieuwe_persoon_enhance,
		delayed: nieuwe_persoon_delayed,
		isTainted: nieuwe_persoon_isTainted,
		tainted: nieuwe_persoon_tainted
	} = nieuwe_persoon_form;

	let id1_open = $state(false);
	let id2_open = $state(false);

	let id1_selectedValue = $derived(
		personen.find((f) => f.id === $nieuwe_connectie_formData.id1)?.label ??
			'Selecteer een persoon...'
	);

	let id2_selectedValue = $derived(
		personen.find((f) => f.id === $nieuwe_connectie_formData.id2)?.label ??
			'Selecteer een persoon...'
	);

	let geselecteerd_connectietype = $derived(
		$nieuwe_connectie_formData.type
			? {
					label: $nieuwe_connectie_formData.type,
					value: $nieuwe_connectie_formData.type
				}
			: undefined
	);
	let pagina: 'PERSOON' | 'CONNECTIE' = 'CONNECTIE';
</script>

<Dialog.Root
	open={true}
	onOpenChange={(open) => {
		if (open == false) {
			history.back();
		}
	}}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Connectie / persoon toevoegen</Dialog.Title>
		</Dialog.Header>
		<Tabs.Root value="connectie" class="flex flex-col">
			<Tabs.List class="self-center">
				<Tabs.Trigger value="connectie">Connectie</Tabs.Trigger>
				<Tabs.Trigger value="persoon">Persoon</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="connectie">
				<form
					method="POST"
					action="/api/vriendschapsnetwerk/nieuwe_connectie"
					class="flex flex-col"
					use:nieuwe_connectie_enhance
				>
					<Form.Field form={nieuwe_connectie_form} name="id1" class="flex flex-col">
						<Popover.Root bind:open={id1_open}>
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Persoon 1</Form.Label>
									<Popover.Trigger
										class={cn(
											buttonVariants({ variant: 'outline' }),
											'justify-between',
											!$nieuwe_connectie_formData.id1 && 'text-muted-foreground'
										)}
										role="combobox"
										{...props}
									>
										{id1_selectedValue}
										<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Popover.Trigger>
									<input hidden value={$nieuwe_connectie_formData.id1} name={props.name} />
								{/snippet}
							</Form.Control>
							<Popover.Content class="p-0">
								<Command.Root>
									<Command.Input autofocus placeholder="Selecteer persoon..." class="h-9" />
									<Command.Empty>Geen personen gevonden...</Command.Empty>
									<Command.Group>
										{#each personen as persoon (persoon.id)}
											<Command.Item
												value={persoon.label}
												onSelect={() => {
													$nieuwe_connectie_formData.id1 = persoon.id;
													id1_open = false;
												}}
											>
												{persoon.label}
												<Check
													class={cn(
														'ml-auto h-4 w-4',
														persoon.id !== $nieuwe_connectie_formData.id1 && 'text-transparent'
													)}
												/>
											</Command.Item>
										{/each}
									</Command.Group>
								</Command.Root>
							</Popover.Content>
						</Popover.Root>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={nieuwe_connectie_form} name="id2" class="flex flex-col">
						<Popover.Root bind:open={id2_open}>
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Persoon 2</Form.Label>
									<Popover.Trigger
										class={cn(
											buttonVariants({ variant: 'outline' }),
											'justify-between',
											!$nieuwe_connectie_formData.id2 && 'text-muted-foreground'
										)}
										role="combobox"
										{...props}
									>
										{id2_selectedValue}
										<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Popover.Trigger>
									<input hidden bind:value={$nieuwe_connectie_formData.id2} name={props.name} />
								{/snippet}
							</Form.Control>
							<Popover.Content class="p-0">
								<Command.Root>
									<Command.Input autofocus placeholder="Selecteer persoon..." class="h-9" />
									<Command.Empty>Geen personen gevonden...</Command.Empty>
									<Command.Group>
										{#each personen as persoon (persoon.id)}
											<Command.Item
												value={persoon.label}
												onSelect={() => {
													$nieuwe_connectie_formData.id2 = persoon.id;
													id2_open = false;
												}}
											>
												{persoon.label}
												<Check
													class={cn(
														'ml-auto h-4 w-4',
														persoon.id !== $nieuwe_connectie_formData.id2 && 'text-transparent'
													)}
												/>
											</Command.Item>
										{/each}
									</Command.Group>
								</Command.Root>
							</Popover.Content>
						</Popover.Root>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field form={nieuwe_connectie_form} name="type">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Connectietype</Form.Label>
								<Select.Root type="single" bind:value={$nieuwe_connectie_formData.type}>
									<Select.Trigger {...props}>
										{$nieuwe_connectie_formData.type
											? $nieuwe_connectie_formData.type
											: 'Selecteer een connectietype...'}
									</Select.Trigger>
									<Select.Content>
										<Select.Item value="GEMUILD" label="GEMUILD" />
										<Select.Item value="SEKS" label="SEKS" />
										<Select.Item value="RELATIE" label="RELATIE" />
									</Select.Content>
								</Select.Root>
								<input hidden bind:value={$nieuwe_connectie_formData.type} name={props.name} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={nieuwe_connectie_form} name="commentaar">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Commentaar</Form.Label>
								<Input {...props} bind:value={$nieuwe_connectie_formData.commentaar} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={nieuwe_connectie_form} name="locatie">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Locatie</Form.Label>
								<Input {...props} bind:value={$nieuwe_connectie_formData.locatie} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
					{#if $nieuwe_connectie_delayed}<Button class="self-center" disabled>
							<LoaderCircle class="animate-spin" />
							Even geduld
						</Button>
					{:else}
						<Form.Button
							disabled={!nieuwe_connectie_isTainted($nieuwe_connectie_tainted)}
							class="self-center">Opslaan</Form.Button
						>
					{/if}
				</form>
			</Tabs.Content>
			<Tabs.Content value="persoon">
				<form
					method="POST"
					class="flex flex-col"
					action="/api/vriendschapsnetwerk/nieuwe_persoon"
					use:nieuwe_persoon_enhance
				>
					<Form.Field form={nieuwe_persoon_form} name="naam">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Naam</Form.Label>
								<Input {...props} bind:value={$nieuwe_persoon_formData.naam} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={nieuwe_persoon_form} name="club">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Club</Form.Label>
								<Input {...props} bind:value={$nieuwe_persoon_formData.club} />
							{/snippet}
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
					{#if $nieuwe_persoon_delayed}<Button class="self-center" disabled>
							<LoaderCircle class="animate-spin" />
							Even geduld
						</Button>
					{:else}
						<Form.Button
							disabled={!nieuwe_persoon_isTainted($nieuwe_persoon_tainted)}
							class="self-center">Opslaan</Form.Button
						>
					{/if}
				</form></Tabs.Content
			>
		</Tabs.Root>
	</Dialog.Content>
</Dialog.Root>
