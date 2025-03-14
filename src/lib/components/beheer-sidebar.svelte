<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { ChevronsUpDown, Flame, Globe, Heart, LogOut, UserCog, Vote } from 'lucide-svelte';
	import type { ComponentProps } from 'svelte';
	import BeheerNavMain from './beheer_nav_main.svelte';
	import { goto, pushState } from '$app/navigation';
	import { useSidebar } from '$lib/components/ui/sidebar';

	const data = {
		navMain: [
			{
				title: 'Fakkels & Bakken',
				url: '/beheer',
				icon: Flame,
				isActive: true
			},
			{
				title: 'Publieke Gegevens',
				url: '#',
				icon: Globe,
				items: [
					{
						title: 'Activiteiten',
						url: '/beheer/activiteiten'
					},
					{
						title: 'Verslagen',
						url: '/beheer/verslagen'
					},
					{
						title: 'Augustjes',
						url: '/beheer/augustjes'
					}
				]
			},
			{
				title: 'Vriendschapsnetwerk',
				url: '/beheer/vriendschapsnetwerk',
				icon: Heart
			},
			{
				title: 'Verkiezingen',
				url: '/beheer/verkiezingen',
				icon: Vote
			}
		]
	};

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		gebruiker,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();

	const sidebar = useSidebar();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem onclick={() => goto('/')}>
				<Sidebar.MenuButton
					size="lg"
					class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<div
						class="text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg"
					>
						<span class="flex items-center">
							<img src="/logo.png" alt="Home Vermeylen" />
							<span class="sr-only">Home Vermeylen</span>
						</span>
					</div>
					<div class="grid flex-1 text-left text-sm leading-tight">
						<span class="truncate font-semibold">Home Vermeylen</span>
						<span class="truncate text-xs">Beheerspagina</span>
					</div>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<BeheerNavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								size="lg"
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								{...props}
							>
								<Avatar.Root class="h-8 w-8 rounded-lg">
									<Avatar.Image src={gebruiker.avatar} alt={gebruiker.voornaam} />
									<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
								</Avatar.Root>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-semibold"
										>{gebruiker.voornaam} {gebruiker.familienaam}</span
									>
									<span class="truncate text-xs">{gebruiker.expand.functie.username}</span>
								</div>
								<ChevronsUpDown class="ml-auto size-4" />
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						class="w-[--bits-dropdown-menu-anchor-width] min-w-56 rounded-lg"
						side={sidebar.isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<DropdownMenu.Label class="p-0 font-normal">
							<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar.Root class="h-8 w-8 rounded-lg">
									<Avatar.Image src={gebruiker.avatar} alt={gebruiker.voornaam} />
									<Avatar.Fallback class="rounded-lg"
										>{gebruiker.voornaam} {gebruiker.familienaam}</Avatar.Fallback
									>
								</Avatar.Root>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-semibold">{gebruiker.voornaam}</span>
									<span class="truncate text-xs">{gebruiker.expand.functie.username}</span>
								</div>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={() => pushState('', { profiel: true })}>
							<UserCog />
							Profiel
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={async () => await goto('/logout')}>
							<LogOut />
							Log out
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
