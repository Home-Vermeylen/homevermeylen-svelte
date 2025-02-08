<script lang="ts">
	import { cn } from '$lib/utils';
	import { Check, ChevronsUpDown, LoaderCircle } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { useMediaQuery } from '$lib/utils';
	import { Button, buttonVariants } from './ui/button';
	import * as Command from './ui/command';
	import * as Form from './ui/form';
	import { Input } from './ui/input';
	import * as Popover from './ui/popover';

	let {
		login_enhance,
		login_form,
		login_formData,
		login_submitting,
		login_delayed,
		login_timeout,
		praesidium_leden
	} = $props();

	let combobox_open = $state(false);

	const isDesktop = useMediaQuery('(min-width: 768px)');

	function closeAndFocusTrigger(triggerId: string) {
		combobox_open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
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
						{`${praesidium_leden
							.find((v) => v.expand.functie.username === $login_formData.gebruikersnaam)
							?.expand.functie.username.replace(/[0-9]/g, '')} (${
							praesidium_leden.find(
								(v) => v.expand.functie.username == $login_formData.gebruikersnaam
							)?.voornaam
						} ${
							praesidium_leden.find(
								(v) => v.expand.functie.username == $login_formData.gebruikersnaam
							)?.familienaam
						})` ?? 'Selecteer homeraadslid'}
						<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Popover.Trigger>
					<input hidden value={$login_formData.gebruikersnaam} name={props.name} />
				{/snippet}
			</Form.Control>
			<Popover.Content class="w-[250px] md:w-[400px] max-h-52 overflow-scroll p-0">
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
									$login_formData.gebruikersnaam = praesidium_lid.expand.functie.username;
									combobox_open = false;
								}}
							>
								{`${praesidium_lid.expand.functie.username.replace(/[0-9]/g, '')} (${
									praesidium_lid.voornaam
								} ${praesidium_lid.familienaam})`}
								<Check
									class={cn(
										'ml-auto h-4 w-4',
										praesidium_lid.expand.functie.username !== $login_formData.gebruikersnaam &&
											'text-transparent'
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
	<Form.Field class={`${isDesktop ? '' : 'w-80 self-center'}`} form={login_form} name="wachtwoord">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Wachtwoord</Form.Label>
				<Input {...props} type="password" bind:value={$login_formData.wachtwoord} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	{#if !$login_delayed}
		<Button class="my-5" type="submit">Verzenden</Button>
	{:else}
		<Button disabled>
			<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			Even geduld...
		</Button>
	{/if}
</form>
