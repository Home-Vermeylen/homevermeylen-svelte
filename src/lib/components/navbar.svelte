<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { LoginGebruikerSchema, ProfielSchema } from '$lib/schemas';
	import {
		Calendar,
		ChevronDown,
		ChevronUp,
		Info,
		LucideEarthLock,
		LucideLogOut,
		Newspaper,
		UserCog,
		UsersRound
	} from 'lucide-svelte';
	import { mediaQuery } from 'svelte-legos';
	import { toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PraesidiumLedenRecord } from '../../../types/pocketbase-types';
	import Loginform from './loginform.svelte';
	import Profielform from './profielform.svelte';
	import * as Avatar from './ui/avatar';
	import { Button } from './ui/button';
	import * as DropdownMenu from './ui/dropdown-menu';

	let login_open = false;
	let profiel_open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');

	export let functie_id: string;
	export let login_data: SuperValidated<Infer<typeof LoginGebruikerSchema>>;
	export let profiel_form: SuperValidated<Infer<typeof ProfielSchema>>;
	export let praesidium_leden: PraesidiumLedenRecord[] | undefined;

	$: ingelogd_lid = praesidium_leden?.find((v) => v.functie == functie_id);

	const login_form = superForm(login_data, {
		validators: zodClient(LoginGebruikerSchema),
		async onUpdated({ form }) {
			if (form.message) {
				if (form.message.status == 'error') {
					toast.error(form.message.text);
				}
			} else {
				toast.success('Ingelogd.');
				login_open = false;
			}
		}
	});

	const { form: login_formData, enhance: login_enhance } = login_form;

	let homeraad_dropdown_open = false;
	let info_dropdown_open = false;
</script>

<nav class="fixed z-50 h-[64px] w-full bg-background shadow-sm dark:bg-gray-950/90">
	<Dialog.Root bind:open={profiel_open}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Profiel bewerken</Dialog.Title>
			</Dialog.Header>
			<Profielform bind:profiel_open data={profiel_form} {ingelogd_lid} />
		</Dialog.Content>
	</Dialog.Root>
	<div class="w-full max-w-7xl mx-auto px-4">
		<div class="flex justify-between h-14 items-center">
			<a href="/" class="flex items-center">
				<img src="/logo.png" alt="Home Vermeylen" class="h-10 w-10 object-contain" />
				<span class="sr-only">Home Vermeylen</span>
			</a>
			<nav class="hidden md:flex gap-4">
				<Button href="/activiteiten" variant="ghost" class="flex gap-2 items-center"
					><Calendar class="h-4 w-4" /> Activiteiten</Button
				>
				<Button href="/augustjes" variant="ghost" class="flex gap-2 items-center"
					><Newspaper class="h-4 w-4" /> Augustjes</Button
				>
				<DropdownMenu.Root bind:open={homeraad_dropdown_open}>
					<DropdownMenu.Trigger
						><Button variant="ghost" class="flex gap-2 items-center"
							><UsersRound class="h-4 w-4" /> Homeraad {#if homeraad_dropdown_open}
								<ChevronUp class="h-4 w-4 transition-transform" />
							{:else}<ChevronDown class="h-4 w-4" />{/if}</Button
						></DropdownMenu.Trigger
					>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Item data-sveltekit-reload href="/homeraad/leden"
								>Homeraadsleden</DropdownMenu.Item
							>
							<DropdownMenu.Item data-sveltekit-reload href="/homeraad/verslagen"
								>Verslagen</DropdownMenu.Item
							>
							<DropdownMenu.Item data-sveltekit-reload href="/homeraad/clublied"
								>Clublied</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<DropdownMenu.Root bind:open={info_dropdown_open}>
					<DropdownMenu.Trigger
						><Button variant="ghost" class="flex gap-2 items-center"
							><Info class="h-4 w-4" /> Info {#if info_dropdown_open}
								<ChevronUp class="h-4 w-4" />
							{:else}<ChevronDown class="h-4 w-4" />{/if}</Button
						></DropdownMenu.Trigger
					>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Label>Info</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.Item data-sveltekit-reload href="/info/faq"
								>Veelgestelde Vragen</DropdownMenu.Item
							>
							<DropdownMenu.Item data-sveltekit-reload href="/info/geschiedenis"
								>Geschiedenis</DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</nav>
			<div class="flex items-center gap-4">
				{#if ingelogd_lid}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							><Avatar.Root>
								<Avatar.Image
									class="object-cover"
									src={ingelogd_lid.avatar}
									alt={`${ingelogd_lid?.voornaam} ${ingelogd_lid?.familienaam}`}
								/>
								<Avatar.Fallback
									>{ingelogd_lid?.voornaam?.at(0)}{ingelogd_lid?.familienaam?.at(
										0
									)}</Avatar.Fallback
								>
							</Avatar.Root>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Label
									>{ingelogd_lid?.voornaam} {ingelogd_lid?.familienaam}</DropdownMenu.Label
								>
								<DropdownMenu.Separator />
								<DropdownMenu.Item
									class="flex gap-1 items-center"
									href="/beheer"
									data-sveltekit-reload
									><LucideEarthLock class="h-4 w-4" /> Beheerspagina</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="flex gap-1 items-center"
									on:click={() => (profiel_open = true)}
									><UserCog class="h-4 w-4" /> Profiel</DropdownMenu.Item
								>
								<DropdownMenu.Item class="flex gap-1 items-center" href="/logout"
									><LucideLogOut class="h-4 w-4" /> Uitloggen</DropdownMenu.Item
								>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else if $isDesktop}
					<Dialog.Root bind:open={login_open}>
						<Dialog.Trigger asChild let:builder>
							<Button builders={[builder]}>Inloggen</Button>
						</Dialog.Trigger>
						<Dialog.Content class="sm:max-w-[425px]">
							<Dialog.Header>
								<Dialog.Title>Inloggen</Dialog.Title>
								<Dialog.Description>Log in als Homeraadslid</Dialog.Description>
							</Dialog.Header>
							<Loginform {login_enhance} {login_form} {login_formData} {praesidium_leden} />
						</Dialog.Content>
					</Dialog.Root>
				{:else}
					<Drawer.Root bind:open={login_open}>
						<Drawer.Trigger asChild let:builder>
							<Button builders={[builder]}>Inloggen</Button>
						</Drawer.Trigger>
						<Drawer.Content>
							<Drawer.Header class="text-left">
								<Drawer.Title>Inloggen</Drawer.Title>
								<Drawer.Description>Log in als Homeraadslid</Drawer.Description>
							</Drawer.Header>
							<Loginform {login_enhance} {login_form} {login_formData} {praesidium_leden} />
						</Drawer.Content>
					</Drawer.Root>
				{/if}
			</div>
		</div>
	</div>
</nav>
