<script lang="ts" module>
	const nav_items = [
		{
			title: 'Activiteiten',
			url: '/activiteiten',
			icon: Calendar
		},
		{
			title: 'Augustjes',
			url: '/augustjes',
			icon: Newspaper
		},
		{
			title: 'Homeraad',
			icon: Users,
			items: [
				{
					title: 'Leden',
					url: '/homeraad/leden'
				},
				{
					title: 'Verslagen',
					url: '/homeraad/verslagen'
				},
				{
					title: 'Sponsors',
					url: '/homeraad/sponsors'
				},
				{
					title: 'Clublied',
					url: '/homeraad/clublied'
				},
				{
					title: 'Contact',
					url: '/homeraad/contact'
				},
				{
					title: 'Vertrouwenspersonen',
					url: '/homeraad/vertrouwenspersonen'
				},
				{
					title: 'Statuten',
					url: '/statuten.pdf'
				}
			]
		},
		{
			title: 'Info',
			icon: Info,
			items: [
				{
					title: 'Geschiedenis',
					url: '/info/geschiedenis'
				},
				{
					title: 'Veelgestelde Vragen',
					url: '/info/faq'
				}
			]
		}
	];
</script>

<script lang="ts">
	import {
		Calendar,
		ChevronDown,
		Facebook,
		Info,
		Instagram,
		LucideEarthLock,
		LucideLogOut,
		Mail,
		Music2,
		Newspaper,
		UserCog,
		Users
	} from 'lucide-svelte';
	import '../../app.postcss';
	import type { PageData } from './$types';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import ThuisPaginaSidebar from '$lib/components/thuispagina-sidebar.svelte';
	import { page } from '$app/stores';
	import Profielmodal from '$lib/components/profielmodal.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Loginform from '$lib/components/loginform.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { LoginGebruikerSchema } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { goto, pushState } from '$app/navigation';

	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	const login_form = superForm(data.login_data, {
		validators: zodClient(LoginGebruikerSchema),
		async onUpdated({ form }) {
			if (form.message) {
				if (form.message.type == 'error') {
					toast.error(form.message.text);
				}
			} else {
				toast.success('Ingelogd.');
				history.back();
			}
		}
	});

	let ingelogd_lid = $derived(data.praesidium_leden?.find((v) => v.functie == data.functie_id));
</script>

{#if $page.state.profiel}
	<Profielmodal data={data.profiel_form} {ingelogd_lid} />
{/if}
{#if $page.state.login}
	<Dialog.Root open>
		<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>Inloggen</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Inloggen</Dialog.Title>
				<Dialog.Description>Log in als Homeraadslid</Dialog.Description>
			</Dialog.Header>
			<Loginform {login_form} praesidium_leden={data.praesidium_leden} />
		</Dialog.Content>
	</Dialog.Root>
{/if}
<Sidebar.Provider open={false}>
	<ThuisPaginaSidebar {nav_items} />
	<Sidebar.Inset>
		<header class="flex h-16 items-center justify-evenly gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1 sm:hidden" />
			<a href="/" class="sm:hidden">
				<img src="/logo.png" alt="Home Vermeylen" class="h-10 w-10 object-contain" />
				<span class="sr-only">Home Vermeylen</span>
			</a>

			<nav
				class="fixed md:flex hidden z-50 h-[64px] w-full bg-background shadow-sm dark:bg-gray-950/90"
			>
				<div class="w-full max-w-7xl mx-auto px-4">
					<div class="flex justify-evenly h-14 items-center">
						<a href="/" class="flex items-center">
							<img src="/logo.png" alt="Home Vermeylen" class="h-10 w-10 object-contain" />
							<span class="sr-only">Home Vermeylen</span>
						</a>
						<nav class="hidden md:flex gap-4">
							{#each nav_items as group}
								{#if group.items}
									<DropdownMenu.Root>
										<DropdownMenu.Trigger
											><Button variant="ghost" class="flex gap-2 items-center"
												>{#if group.icon}<group.icon />
												{/if}
												{group.title}
												<ChevronDown class="h-4 w-4" /></Button
											>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content>
											<DropdownMenu.Group>
												{#each group.items as subitem}
													<DropdownMenu.Item onSelect={() => goto(subitem.url)}>
														{subitem.title}
													</DropdownMenu.Item>
												{/each}
											</DropdownMenu.Group>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								{:else}
									<Button href={group.url} variant="ghost" class="flex gap-2 items-center"
										>{#if group.icon}<group.icon />{/if}
										{group.title}</Button
									>
								{/if}
							{/each}
						</nav>
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
											onSelect={() => goto('/beheer')}
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
							</DropdownMenu.Root>{:else}<Button onclick={() => pushState('', { login: true })}
								>Log In</Button
							>{/if}
					</div>
				</div>
			</nav>
			{#if ingelogd_lid}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="sm:hidden"
						><Avatar.Root>
							<Avatar.Image
								class="object-cover"
								src={ingelogd_lid.avatar}
								alt={`${ingelogd_lid?.voornaam} ${ingelogd_lid?.familienaam}`}
							/>
							<Avatar.Fallback
								>{ingelogd_lid?.voornaam?.at(0)}{ingelogd_lid?.familienaam?.at(0)}</Avatar.Fallback
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
				</DropdownMenu.Root>{:else}<Button onclick={() => pushState('', { login: true })}
					>Log In</Button
				>{/if}
		</header>
		{@render children?.()}
		<footer class="flex items-center gap-5 flex-col p-10 bg-background">
			<img
				alt="Schild Home Vermeylen"
				class="w-20 h-20 object-contain"
				width={1080}
				height={901}
				src="/logo.png"
			/>
			<p class="font-bold text-center">Homeraad Vermeylen</p>
			<p class="text-center">© 2024 Homeraad Vermeylen. Alle rechten voorbehouden</p>
			<div class="grid grid-flow-col gap-4 justify-evenly">
				<a class="btn btn-ghost" href="https://www.facebook.com/Home-Vermeylen-845283782203005/"
					><Facebook /></a
				>
				<a class="btn btn-ghost" href="https://www.instagram.com/homevermeylen/">
					<Instagram />
				</a>
				<a
					class="btn btn-ghost"
					href="https://www.tiktok.com/@homevermeylen/video/7177768007366659333"
				>
					<Music2 />
				</a>
				<a class="btn btn-ghost" href="mailto:homeraadvermeylen@gmail.com">
					<Mail />
				</a>
			</div>
		</footer>
	</Sidebar.Inset>
</Sidebar.Provider>

<!--<Navbar
	profiel_form={data.profiel_form}
	login_data={data.login_data}
	praesidium_leden={data.praesidium_leden}
	functie_id={data.functie_id}
/> -->
