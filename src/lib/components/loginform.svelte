<script lang="ts">
	import { cn, useMediaQuery } from '$lib/utils';
	import { Check, ChevronsUpDown, LoaderCircle } from 'lucide-svelte';
	import { Button, buttonVariants } from './ui/button';
	import * as Command from './ui/command';
	import * as Form from './ui/form';
	import { Input } from './ui/input';
	import * as Popover from './ui/popover';
	import { sorteer_door_functie } from '$lib/utils/functieSort';

	let {
		login_form,
		praesidium_leden
	}: {
		login_form: any;
		praesidium_leden: any[];
	} = $props();

	let combobox_open = $state(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');

	// Superforms-waarden reactief ophalen
	let login_formData = $derived(login_form.form);
	let login_enhance = $derived(login_form.enhance);
	let login_delayed = $derived(login_form.delayed);

	// Leden sorteren volgens gedeelde functie_rank
	const sorted_praesidium_leden = $derived(
		[...praesidium_leden].sort((a: any, b: any) =>
			sorteer_door_functie(
				a.expand?.functie?.username,
				b.expand?.functie?.username
			)
		)
	);

	// Naam van de geselecteerde gebruiker bepalen
	const geselecteerdeGebruiker = $derived.by(() => {
		if ($login_formData.gebruikersnaam === 'tablet') {
			return 'Tablet';
		}

		const lid = praesidium_leden.find(
			(v: any) => v.expand?.functie?.username === $login_formData.gebruikersnaam
		);

		if (!lid) {
			return 'Selecteer homeraadslid';
		}

		const functieNaam = lid.expand.functie.username.replace(/[0-9]/g, '');

		return `${functieNaam} (${lid.voornaam} ${lid.familienaam})`;
	});
</script>

<form
	class={$isDesktop ? 'grid items-start gap-4' : 'flex flex-col items-center'}
	method="post"
	action="/"
	use:login_enhance
>
	<Form.Field form={login_form} name="gebruikersnaam" class="text-center">
		<Popover.Root bind:open={combobox_open}>
			<Form.Control>
				{#snippet children({ props })}
					<Popover.Trigger
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'justify-between',
							!$login_formData.gebruikersnaam && 'text-muted-foreground',
							'w-54'
						)}
						role="combobox"
						{...props}
					>
						{geselecteerdeGebruiker}

						<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Popover.Trigger>

					<input
						hidden
						value={$login_formData.gebruikersnaam}
						name={props.name}
					/>
				{/snippet}
			</Form.Control>

			<Popover.Content class="w-[250px] md:w-[400px] max-h-52 overflow-scroll p-0">
				<Command.Root>
					<Command.Input
						autofocus
						placeholder="Zoek homeraadslid..."
						class="h-9"
					/>

					<Command.Empty>
						Geen homeraadsleden gevonden.
					</Command.Empty>

					<Command.Group>
						{#each sorted_praesidium_leden as praesidium_lid}
							<Command.Item
								value={`${praesidium_lid.expand.functie.username.replace(/[0-9]/g, '')} (${praesidium_lid.voornaam} ${praesidium_lid.familienaam})`}
								onSelect={() => {
									$login_formData.gebruikersnaam =
										praesidium_lid.expand.functie.username;

									combobox_open = false;
								}}
							>
								{`${praesidium_lid.expand.functie.username.replace(/[0-9]/g, '')} (${praesidium_lid.voornaam} ${praesidium_lid.familienaam})`}

								<Check
									class={cn(
										'ml-auto h-4 w-4',
										praesidium_lid.expand.functie.username !==
											$login_formData.gebruikersnaam &&
											'text-transparent'
									)}
								/>
							</Command.Item>
						{/each}

						<!-- Tabletaccount -->
						<Command.Item
							value="tablet"
							onSelect={() => {
								$login_formData.gebruikersnaam = 'tablet';
								combobox_open = false;
							}}
						>
							Tablet

							<Check
								class={cn(
									'ml-auto h-4 w-4',
									'tablet' !== $login_formData.gebruikersnaam &&
										'text-transparent'
								)}
							/>
						</Command.Item>
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>

		<Form.FieldErrors />
	</Form.Field>

	<Form.Field
		class={`${isDesktop ? '' : 'w-80 self-center'}`}
		form={login_form}
		name="wachtwoord"
	>
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Wachtwoord</Form.Label>
				<Input
					{...props}
					type="password"
					bind:value={$login_formData.wachtwoord}
				/>
			{/snippet}
		</Form.Control>

		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	{#if !$login_delayed}
		<Button class="my-5" type="submit">
			Verzenden
		</Button>
	{:else}
		<Button disabled>
			<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			Even geduld...
		</Button>
	{/if}
</form>