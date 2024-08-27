<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import { NieuweConnectieSchema, NieuwePersoonSchema } from '$lib/schemas';
	import { cn } from '$lib/utils.js';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { buttonVariants } from './ui/button';
	import { Input } from './ui/input';

	export let nieuwe_connectie_data: SuperValidated<Infer<typeof NieuweConnectieSchema>>;
	export let nieuwe_persoon_data: SuperValidated<Infer<typeof NieuwePersoonSchema>>;

	export let modal_open = false;
	export let personen: any;

	const nieuwe_connectie_form = superForm(nieuwe_connectie_data, {
		validators: zodClient(NieuweConnectieSchema),
		onUpdated: async () => {
			modal_open = false;
		},
		invalidateAll: true
	});

	const nieuwe_persoon_form = superForm(nieuwe_persoon_data, {
		validators: zodClient(NieuwePersoonSchema),
		onUpdated: () => {
			modal_open = false
		},
		invalidateAll: true
	})

	const { form: nieuwe_connectie_formData, enhance: nieuwe_connectie_enhance } =
		nieuwe_connectie_form;

	const { form: nieuwe_persoon_formData, enhance: nieuwe_persoon_enhance } =
		nieuwe_persoon_form;

	let id1_open = false;
	let id2_open = false;

	$: id1_selectedValue =
		personen.find((f) => f.id === $nieuwe_connectie_formData.id1)?.label ?? 'Selecteer een persoon...';

	$: id2_selectedValue =
		personen.find((f) => f.id === $nieuwe_connectie_formData.id2)?.label ?? 'Selecteer een persoon...';

	$: geselecteerd_connectietype = $nieuwe_connectie_formData.type
		? {
				label: $nieuwe_connectie_formData.type,
				value: $nieuwe_connectie_formData.type
		  }
		: undefined;
	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function id_1_closeAndFocusTrigger(triggerId: string) {
		id1_open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	function id_2_closeAndFocusTrigger(triggerId: string) {
		id2_open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	let pagina: 'PERSOON' | 'CONNECTIE' = 'CONNECTIE';
</script>

<Dialog.Root bind:open={modal_open}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Connectie / persoon toevoegen</Dialog.Title>
		</Dialog.Header>
		<Tabs.Root value="connectie" class="w-[400px] flex flex-col items-center">
			<Tabs.List>
				<Tabs.Trigger value="connectie">Connectie</Tabs.Trigger>
				<Tabs.Trigger value="persoon">Persoon</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="connectie" class="">
				<form
					method="POST"
					class="space-y-6"
					action="/api/vriendschapsnetwerk/nieuwe_connectie"
					use:nieuwe_connectie_enhance
				>
					<Form.Field form={nieuwe_connectie_form} name="id1" class="flex flex-col">
						<Popover.Root bind:open={id1_open} let:ids>
							<Form.Control let:attrs>
								<Form.Label>Persoon 1</Form.Label>
								<Popover.Trigger
									class={cn(
										buttonVariants({ variant: 'outline' }),
										'w-[200px] justify-between',
										!$nieuwe_connectie_formData.id1 && 'text-muted-foreground'
									)}
									role="combobox"
									{...attrs}
								>
									{id1_selectedValue}
									<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Popover.Trigger>
								<input hidden value={$nieuwe_connectie_formData.id1} name={attrs.name} />
							</Form.Control>
							<Popover.Content class="w-[200px] p-0">
								<Command.Root>
									<Command.Input autofocus placeholder="Selecteer persoon..." class="h-9" />
									<Command.Empty>Geen personen gevonden...</Command.Empty>
									<Command.Group>
										{#each personen as persoon (persoon.id)}
											<Command.Item
												value={persoon.label}
												onSelect={() => {
													$nieuwe_connectie_formData.id1 = persoon.id;
													id_1_closeAndFocusTrigger(ids.trigger);
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
						<Popover.Root bind:open={id2_open} let:ids>
							<Form.Control let:attrs>
								<Form.Label>Persoon 2</Form.Label>
								<Popover.Trigger
									class={cn(
										buttonVariants({ variant: 'outline' }),
										'w-[200px] justify-between',
										!$nieuwe_connectie_formData.id2 && 'text-muted-foreground'
									)}
									role="combobox"
									{...attrs}
								>
									{id2_selectedValue}
									<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Popover.Trigger>
								<input hidden bind:value={$nieuwe_connectie_formData.id2} name={attrs.name} />
							</Form.Control>
							<Popover.Content class="w-[200px] p-0">
								<Command.Root>
									<Command.Input autofocus placeholder="Selecteer persoon..." class="h-9" />
									<Command.Empty>Geen personen gevonden...</Command.Empty>
									<Command.Group>
										{#each personen as persoon (persoon.id)}
											<Command.Item
												value={persoon.label}
												onSelect={() => {
													$nieuwe_connectie_formData.id2 = persoon.id;
													id_2_closeAndFocusTrigger(ids.trigger);
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
						<Form.Control let:attrs>
							<Form.Label>Connectietype</Form.Label>
							<Select.Root
								selected={geselecteerd_connectietype}
								onSelectedChange={(v) => {
									v && ($nieuwe_connectie_formData.type = v.value);
								}}
							>
								<Select.Trigger {...attrs}>
									<Select.Value placeholder="Selecteer een connectietype" />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="GEMUILD" label="GEMUILD" />
									<Select.Item value="SEKS" label="SEKS" />
									<Select.Item value="RELATIE" label="RELATIE" />
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$nieuwe_connectie_formData.type} name={attrs.name} />
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field form={nieuwe_connectie_form} name="commentaar">
						<Form.Control let:attrs>
						  <Form.Label>Commentaar</Form.Label>
						  <Input {...attrs} bind:value={$nieuwe_connectie_formData.commentaar} />
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					  </Form.Field>
					  <Form.Field form={nieuwe_connectie_form} name="locatie">
						<Form.Control let:attrs>
						  <Form.Label>Locatie</Form.Label>
						  <Input {...attrs} bind:value={$nieuwe_connectie_formData.locatie} />
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					  </Form.Field>
					<Form.Button>Opslaan</Form.Button>
				</form>
			</Tabs.Content>
			<Tabs.Content value="persoon"
				>
				<form
					method="POST"
					class="space-y-6"
					action="/api/vriendschapsnetwerk/nieuwe_persoon"
					use:nieuwe_persoon_enhance
				>	
					<Form.Field form={nieuwe_persoon_form} name="naam">
						<Form.Control let:attrs>
						  <Form.Label>Naam</Form.Label>
						  <Input {...attrs} bind:value={$nieuwe_persoon_formData.naam} />
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					  </Form.Field>
					  <Form.Field form={nieuwe_persoon_form} name="club">
						<Form.Control let:attrs>
						  <Form.Label>Club</Form.Label>
						  <Input {...attrs} bind:value={$nieuwe_persoon_formData.club} />
						</Form.Control>
						<Form.Description />
						<Form.FieldErrors />
					  </Form.Field>
					<Form.Button>Opslaan</Form.Button>
				</form></Tabs.Content
			>
		</Tabs.Root>

	</Dialog.Content>
</Dialog.Root>
<!-- <dialog bind:this={dialog} class="modal">
	<div class="modal-box flex flex-col gap-5 items-center align-middle">
		
		<div class="tabs">
			<button
				on:click={() => (pagina = 'CONNECTIE')}
				class={`tab tab-bordered ${pagina == 'CONNECTIE' ? 'tab-active' : ''}`}
			>
				Connectie
			</button>
			<button
				on:click={() => (pagina = 'PERSOON')}
				class={`tab tab-bordered ${pagina == 'PERSOON' ? 'tab-active' : ''}`}
			>
				Persoon
			</button>
		</div>
		{#if pagina == 'CONNECTIE'}
			<form
				method="post"
				use:enhance={updateNetwerk}
				action="/api/vriendschapsnetwerk/nieuwe_connectie"
				class="flex flex-col gap-5 items-center"
			>
				<div class="flex flex-row items-center">
					<span>Persoon 1:</span>
					<select required name="id1" class="select w-full max-w-xs">
						<option disabled selected> Kies een persoon </option>
						{#each personen as persoon (persoon.id)}
							<option value={persoon.id}>{persoon.label}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-row items-center">
					<span>Persoon 2:</span>
					<select required name="id2" class="select w-full max-w-xs">
						<option disabled selected> Kies een persoon </option>
						{#each personen as persoon (persoon.id)}
							<option value={persoon.id}>{persoon.label}</option>
						{/each}
					</select>
				</div>
				<div class="flex flex-row gap-2 items-center">
					<span>Type: </span>
					<select required name="type" class="select w-full max-w-xs">
						<option value="GEMUILD" selected> Gemuild </option>
						<option value="SEKS">Seks</option>
						<option value="RELATIE">Relatie</option>
					</select>
				</div>
				<Input id="locatie" label="Locatie" placeholder="Geef hier de locatie in." errors={null} />
				<Input
					id="commentaar"
					label="Commentaar"
					placeholder="Geef hier commentaar in."
					errors={null}
				/>
				<div class="modal-action">
					<button type="submit" formmethod="dialog" class="btn btn-ghost">Annuleer</button>
					<button
						type="submit"
						class={`btn btn-outline ${loading ? 'loading loading-spinner' : ''}`}>Opslaan</button
					>
				</div>
			</form>
		{:else}
			<form
				method="post"
				use:enhance={updateNetwerk}
				action="/api/vriendschapsnetwerk/nieuwe_persoon"
			>
				<Input
					id="naam"
					label="Naam"
					errors={null}
					placeholder="Geef hier de naam van de persoon in."
				/>
				<Input
					id="club"
					label="Club"
					errors={null}
					placeholder="Geef hier de club van de persoon in."
				/>
				<div class="modal-action">
					<button type="submit" formmethod="dialog" class="btn btn-ghost">Annuleer</button>
					<button
						type="submit"
						class={`btn btn-outline ${loading ? 'loading loading-spinner' : ''}`}>Opslaan</button
					>
				</div>
			</form>
		{/if}
	</div>
</dialog> -->
