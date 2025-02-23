<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import * as Sheet from '$lib/components/ui/sheet';
	import { LoginGebruikerSchema, ProfielSchema } from '$lib/schemas';
	import {
		Calendar,
		ChevronDown,
		ChevronUp,
		History,
		Home,
		Info,
		LucideEarthLock,
		LucideLogOut,
		Mail,
		MessageCircleQuestion,
		Music,
		Newspaper,
		PanelLeft,
		Rocket,
		ScrollText,
		UserCog,
		Users,
		UsersRound,
		HeartHandshake
	} from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PraesidiumLedenRecord } from '../../../types/pocketbase-types';
	import Loginform from './loginform.svelte';
	import * as Avatar from './ui/avatar';
	import { Button, buttonVariants } from './ui/button';
	import * as DropdownMenu from './ui/dropdown-menu';
	import { goto, pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import { useMediaQuery } from '$lib/utils';
	interface Props {
		functie_id: string;
		login_data: SuperValidated<Infer<typeof LoginGebruikerSchema>>;
		profiel_form: SuperValidated<Infer<typeof ProfielSchema>>;
		praesidium_leden: PraesidiumLedenRecord[] | undefined;
	}

	let { functie_id, login_data, profiel_form, praesidium_leden }: Props = $props();
	let login_open = $state(false);
	let profiel_open = $state(false);
	let isDesktop = $state(true);

	onMount(() => {
		isDesktop = useMediaQuery('(min-width: 716px)');
	});

	const login_form = superForm(login_data, {
		validators: zodClient(LoginGebruikerSchema),
		async onUpdated({ form }) {
			if (form.message) {
				if (form.message.type == 'error') {
					toast.error(form.message.text);
				}
			} else {
				toast.success('Ingelogd.');
				login_open = false;
			}
		}
	});

	const {
		form: login_formData,
		enhance: login_enhance,
		submitting: login_submitting,
		delayed: login_delayed,
		timeout: login_timeout
	} = login_form;

	import * as Accordion from '$lib/components/ui/accordion';
	import { onMount } from 'svelte';
	import Image from './image.svelte';
	import Profielmodal from './profielmodal.svelte';

	let homeraad_dropdown_open = $state(false);
	let info_dropdown_open = $state(false);
	let ingelogd_lid = $derived(praesidium_leden?.find((v) => v.functie == functie_id));
</script>

{#if $page.state.profiel}
	<Profielmodal data={profiel_form} {ingelogd_lid} />
{/if}
<nav class="fixed z-50 h-[64px] w-full bg-background shadow-sm dark:bg-gray-950/90">
	<div class="w-full max-w-7xl mx-auto px-4">
		<div class="flex justify-evenly h-14 items-center">
			<div class="sm:hidden">
				<Sheet.Root>
					<Sheet.Trigger>
						<Button size="icon" variant="outline" class="sm:hidden">
							<PanelLeft class="h-5 w-5" />
							<span class="sr-only">Toon navigatiemenu</span>
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="left" class="sm:max-w-xs">
						<nav class="grid gap-6 text-lg font-medium">
							<a href="/" class="flex items-center gap-4 px-2.5 hover:text-muted-foreground">
								<Home class="h-5 w-5" />
								Thuispagina
							</a>
							<a
								href="/activiteiten"
								class="flex items-center gap-4 px-2.5 hover:text-muted-foreground"
							>
								<Calendar class="h-5 w-5" />
								Activiteiten
							</a>
							<a
								href="/augustjes"
								class="flex items-center gap-4 px-2.5 hover:text-muted-foreground"
							>
								<Newspaper class="h-5 w-5" />
								Augustjes
							</a>
							<Accordion.Root>
								<Accordion.Item value="homeraad">
									<Accordion.Trigger
										><span class="flex items-center gap-4 px-2.5 hover:text-muted-foreground">
											<Users class="h-5 w-5" />
											Homeraad
										</span></Accordion.Trigger
									>
									<Accordion.Content class="ml-8 grid gap-6 text-lg font-medium">
										<a
											href="/homeraad/leden"
											class="flex items-center gap-4 px-2.5 hover:text-muted-foreground"
										>
											<Users class="h-5 w-5" />
											Homeraadsleden
										</a>
										<a
											href="/homeraad/werking"
											class="flex items-center gap-4 px-2.5 hover:text-muted-foreground"
										>
											<Rocket class="h-5 w-5" />
											Werking
										</a>
										<a
											href="/homeraad/verslagen"
											class="flex items-center gap-4 px-2.5 hover:text-muted-foreground"
										>
											<ScrollText class="h-5 w-5" />
											Verslagen
										</a>
										<a
											href="/homeraad/clublied"
											class="flex items-center gap-4 px-2.5 hover:text-muted-foreground"
										>
											<Music class="h-5 w-5" />
											Clublied
										</a>
										<a
											href="/homeraad/sponsors"
											class="flex items-center gap-4 px-2.5 hover:text-muted-foreground"
										>
											<HeartHandshake class="h-5 w-5" />
										</a>
										<a
											href="/homeraad/contact"
											class="flex items-center gap-4 px-2.5 hover:text-muted-foreground"
										>
											<Mail class="h-5 w-5" />
											Contact
										</a>
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="info">
									<Accordion.Trigger
										><span class="flex items-center gap-4 px-2.5 hover:text-muted-foreground">
											<Info class="h-5 w-5" />
											Info
										</span></Accordion.Trigger
									>
									<Accordion.Content class="ml-8 grid gap-6 text-lg font-medium">
										<a
											href="/info/geschiedenis"
											class="flex items-center gap-4 px-2.5 hover:text-muted-foreground"
										>
											<History class="h-5 w-5" />
											Geschiedenis
										</a>
										<a
											href="/info/faq"
											class="flex items-center gap-4 px-2.5 hover:text-muted-foreground"
										>
											<MessageCircleQuestion class="h-5 w-5" />
											Veelgestelde vragen
										</a>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>
						</nav>
					</Sheet.Content>
				</Sheet.Root>
			</div>
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
							<DropdownMenu.Item onSelect={() => goto('/homeraad/leden')}
								>Homeraadsleden</DropdownMenu.Item
							>
							<DropdownMenu.Item onSelect={() => goto('/homeraad/werking')}
								>Werking</DropdownMenu.Item
							>

							<DropdownMenu.Item onSelect={() => goto('/homeraad/verslagen')}
								>Verslagen</DropdownMenu.Item
							>
							<DropdownMenu.Item onSelect={() => goto('/homeraad/clublied')}
								>Clublied</DropdownMenu.Item
							>
							<DropdownMenu.Item onSelect={() => goto('/homeraad/sponsors')}>
								Sponsors</DropdownMenu.Item
							>
							<DropdownMenu.Item onSelect={() => goto('/homeraad/contact')}
								>Contact</DropdownMenu.Item
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
							<DropdownMenu.Item onSelect={() => goto('/info/faq')}
								>Veelgestelde Vragen</DropdownMenu.Item
							>
							<DropdownMenu.Item onSelect={() => goto('/info/geschiedenis')}
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
								<DropdownMenu.Item class="flex gap-1 items-center" onSelect={() => goto('/beheer')}
									><LucideEarthLock class="h-4 w-4" /> Beheerspagina</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="flex gap-1 items-center"
									onSelect={() => pushState('', { profiel: true })}
									><UserCog class="h-4 w-4" /> Profiel</DropdownMenu.Item
								>
								<DropdownMenu.Item
									class="flex gap-1 items-center"
									onSelect={() => {
										goto('/logout');
									}}><LucideLogOut class="h-4 w-4" /> Uitloggen</DropdownMenu.Item
								>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else if isDesktop}
					<Dialog.Root bind:open={login_open}>
						<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Inloggen</Dialog.Trigger>
						<Dialog.Content class="sm:max-w-[425px]">
							<Dialog.Header>
								<Dialog.Title>Inloggen</Dialog.Title>
								<Dialog.Description>Log in als Homeraadslid</Dialog.Description>
							</Dialog.Header>
							<Loginform
								{login_enhance}
								{login_form}
								{login_formData}
								{login_submitting}
								{login_delayed}
								{login_timeout}
								{praesidium_leden}
							/>
						</Dialog.Content>
					</Dialog.Root>
				{:else}
					<Drawer.Root bind:open={login_open}>
						<Drawer.Trigger>
							<Button class={buttonVariants({ variant: 'default' })}>Inloggen</Button>
						</Drawer.Trigger>
						<Drawer.Content>
							<Drawer.Header>
								<Drawer.Title>Inloggen</Drawer.Title>
								<Drawer.Description>Log in als Homeraadslid</Drawer.Description>
							</Drawer.Header>
							<Loginform
								{login_enhance}
								{login_form}
								{login_formData}
								{praesidium_leden}
								{login_delayed}
								{login_timeout}
								{login_submitting}
							/>
						</Drawer.Content>
					</Drawer.Root>
				{/if}
			</div>
		</div>
	</div>
</nav>
