<script lang="ts">
	import {
		Earth,
		Flame,
		Heart,
		Home,
		LogOut,
		PanelLeft,
		Settings,
		UserCog,
		Vote
	} from 'lucide-svelte';

	import { page } from '$app/stores';
	import ProfielForm from '$lib/components/profielform.svelte';
	import * as Avatar from '$lib/components/ui/avatar/';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import '../../app.postcss';
	import type { PageData } from './$types';

	export let data: PageData;

	let huidige_pagina = $page.url.toString().includes('fakkels_bakken')
		? 'FAKKELS_BAKKEN'
		: $page.url.toString().includes('vriendschapsnetwerk')
			? 'VRIENDSCHAPSNETWERK'
			: $page.url.toString().includes('verkiezingen') ? 'VERKIEZINGEN' : 'PUBLIEKE_GEGEVENS';

	let profiel_open = false;

	$: ingelogd_lid = data.praesidium_leden?.find((v) => v.functie == data.functie_id);
</script>

<div class="flex min-h-screen flex-col bg-muted/40">
	<Dialog.Root bind:open={profiel_open}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Profiel bewerken</Dialog.Title>
			</Dialog.Header>
			<ProfielForm bind:profiel_open data={data.profiel_form} {ingelogd_lid} />
		</Dialog.Content>
	</Dialog.Root>
	<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
		<nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/"
						use:builder.action
						{...builder}
						class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
					>
						<Home class="h-4 w-4 transition-all group-hover:scale-110" />
						<span class="sr-only">Terug naar thuispagina</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Terug naar thuispagina</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/beheer/fakkels_bakken"
						class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						use:builder.action
						class:text-muted-foreground={huidige_pagina != 'FAKKELS_BAKKEN'}
						class:text-accent-foreground={huidige_pagina == 'FAKKELS_BAKKEN'}
						class:bg-accent={huidige_pagina == 'FAKKELS_BAKKEN'}
						{...builder}
					>
						<Flame class="h-5 w-5" />
						<span class="sr-only">Fakkels & Bakken</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Fakkels & Bakken</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/beheer"
						class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						class:text-muted-foreground={huidige_pagina != 'PUBLIEKE_GEGEVENS'}
						class:text-accent-foreground={huidige_pagina == 'PUBLIEKE_GEGEVENS'}
						class:bg-accent={huidige_pagina == 'PUBLIEKE_GEGEVENS'}
						use:builder.action
						{...builder}
					>
						<Earth class="h-5 w-5" />
						<span class="sr-only">Publieke Gegevens</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Publieke Gegevens</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/beheer/vriendschapsnetwerk"
						class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						class:text-muted-foreground={huidige_pagina != 'VRIENDSCHAPSNETWERK'}
						class:text-accent-foreground={huidige_pagina == 'VRIENDSCHAPSNETWERK'}
						class:bg-accent={huidige_pagina == 'VRIENDSCHAPSNETWERK'}
						use:builder.action
						{...builder}
					>
						<Heart class="h-5 w-5" />
						<span class="sr-only">Vriendschapsnetwerk</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Vriendschapsnetwerk</Tooltip.Content>
			</Tooltip.Root>
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="/beheer/verkiezingen"
						class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						use:builder.action
						class:text-muted-foreground={huidige_pagina != 'VERKIEZINGEN'}
						class:text-accent-foreground={huidige_pagina == 'VERKIEZINGEN'}
						class:bg-accent={huidige_pagina == 'VERKIEZINGEN'}
						{...builder}
					>
						<Vote class="h-5 w-5" />
						<span class="sr-only">Verkiezingen</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Verkiezingen</Tooltip.Content>
			</Tooltip.Root>
		</nav>
		<nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						href="##"
						class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						use:builder.action
						{...builder}
					>
						<Settings class="h-5 w-5" />
						<span class="sr-only">Instellingen</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">Instellingen</Tooltip.Content>
			</Tooltip.Root>
		</nav>
	</aside>
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<header
			class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
		>
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
						<PanelLeft class="h-5 w-5" />
						<span class="sr-only">Toon navigatiemenu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="sm:max-w-xs">
					<nav class="grid gap-6 text-lg font-medium">
						<a
							href="/"
							class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
						>
							<Home class="h-5 w-5 transition-all group-hover:scale-110" />
							<span class="sr-only">Terug naar thuispagina</span>
						</a>
						<a
							href="/beheer/fakkels_bakken"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-muted-foreground={huidige_pagina != 'FAKKELS_BAKKEN'}
							class:text-accent-foreground={huidige_pagina == 'FAKKELS_BAKKEN'}
						>
							<Flame class="h-5 w-5" />
							Fakkels & Bakken
						</a>
						<a
							href="/beheer"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-muted-foreground={huidige_pagina != 'PUBLIEKE_GEGEVENS'}
							class:text-accent-foreground={huidige_pagina == 'PUBLIEKE_GEGEVENS'}
						>
							<Earth class="h-5 w-5" />
							Publieke Gegevens
						</a>

						<a
							href="/beheer/vriendschapsnetwerk"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-muted-foreground={huidige_pagina != 'VRIENDSCHAPSNETWERK'}
							class:text-accent-foreground={huidige_pagina == 'VRIENDSCHAPSNETWERK'}
						>
							<Heart class="h-5 w-5" />
							Vriendschapsnetwerk
						</a>
						<a
							href="/beheer/verkiezingen"
							class="flex items-center gap-4 px-2.5 hover:text-foreground"
							class:text-muted-foreground={huidige_pagina != 'VERKIEZINGEN'}
							class:text-accent-foreground={huidige_pagina == 'VERKIEZINGEN'}
						>
							<Vote class="h-5 w-5" />
							Verkiezingen
						</a>
						<a
							href="##"
							class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<Settings class="h-5 w-5" />
							Instellingen
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
			<div class="relative ml-auto flex-1 md:grow-0" />
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="rounded-full" builders={[builder]}>
						<Avatar.Root>
							<Avatar.Image
								class="object-cover"
								src={ingelogd_lid?.avatar}
								alt={`${ingelogd_lid?.voornaam} ${ingelogd_lid?.familienaam}`}
							/>
							<Avatar.Fallback
								>{ingelogd_lid?.voornaam?.at(0)}{ingelogd_lid?.familienaam?.at(0)}</Avatar.Fallback
							>
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label
						>{ingelogd_lid?.voornaam} {ingelogd_lid?.familienaam}</DropdownMenu.Label
					>
					<DropdownMenu.Separator />
					<DropdownMenu.Item class="flex gap-1 items-center" href="/" data-sveltekit-reload
						><Home class="h-4 w-4" /> Thuispagina</DropdownMenu.Item
					>
					<DropdownMenu.Item class="flex gap-1 items-center" on:click={() => (profiel_open = true)}
						><UserCog class="h-4 w-4" /> Profiel</DropdownMenu.Item
					>
					<DropdownMenu.Item class="flex gap-1 items-center" href="/logout"
						><LogOut class="h-4 w-4" /> Uitloggen</DropdownMenu.Item
					>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>

		<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<slot />
		</main>
	</div>
</div>
