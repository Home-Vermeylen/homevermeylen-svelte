<script lang="ts">
	import { cn } from '$lib/utils';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { tick } from 'svelte';
	import SuperDebug from 'sveltekit-superforms';
	import { Button, buttonVariants } from './ui/button';
	import * as Command from './ui/command';
	import * as Form from './ui/form';
	import { Input } from './ui/input';
	import * as Popover from './ui/popover';

	export let login_enhance;
	export let login_form;
	export let login_formData;

	export let praesidium_leden;

	let combobox_open = false;

    function closeAndFocusTrigger(triggerId: string) {
		combobox_open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<form class="grid items-start gap-4" method="post" action="/" use:login_enhance>
	<Form.Field form={login_form} name="gebruikersnaam" class="text-center">
		<Popover.Root bind:open={combobox_open} let:ids>
			<Form.Control let:attrs>
				<Popover.Trigger
					class={cn(
						buttonVariants({ variant: 'outline' }),
						'w-[200px] justify-between',
						!$login_formData.gebruikersnaam && 'text-muted-foreground',
						"w-54"
					)}
					role="combobox"
					{...attrs}
				>
					{`${praesidium_leden.find(
						(v) => v.expand.functie.username === $login_formData.gebruikersnaam)?.expand.functie.username.replace(/[0-9]/g, '')} (${praesidium_leden.find(v => v.expand.functie.username == $login_formData.gebruikersnaam)?.voornaam} ${praesidium_leden.find(v => v.expand.functie.username == $login_formData.gebruikersnaam)?.familienaam}) ` ??
						'Selecteer homeraadslid'}
					<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Popover.Trigger>
				<input hidden value={$login_formData.gebruikersnaam} name={attrs.name} />
			</Form.Control>
			<Popover.Content class="w-[400px] p-0">
				<Command.Root>
					<Command.Input autofocus placeholder="Zoek homeraadslid..." class="h-9" />
					<Command.Empty>Geen homeraadsleden gevonden.</Command.Empty>
					<Command.Group>
						{#each praesidium_leden as praesidium_lid}
							<Command.Item
								value={`${praesidium_lid.expand.functie.username.replace(/[0-9]/g, '')} (${praesidium_lid.voornaam} ${praesidium_lid.familienaam})`}
								onSelect={() => {
									$login_formData.gebruikersnaam = praesidium_lid.expand.functie.username;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
                                {`${praesidium_lid.expand.functie.username.replace(/[0-9]/g, '')} (${praesidium_lid.voornaam} ${praesidium_lid.familienaam})`}
								<Check
									class={cn(
										'ml-auto h-4 w-4',
										praesidium_lid.expand.functie.username !== $login_formData.gebruikersnaam && 'text-transparent'
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
	<Form.Field form={login_form} name="wachtwoord">
		<Form.Control let:attrs>
			<Form.Label>Wachtwoord</Form.Label>
			<Input {...attrs} type="password" bind:value={$login_formData.wachtwoord} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<SuperDebug display={import.meta.env.DEV} data={$login_formData} />
	<Button type="submit">Verzenden</Button>
</form>
