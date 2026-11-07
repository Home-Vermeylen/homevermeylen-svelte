<script lang="ts">
	import { page } from '$app/stores';
	import ProfielModal from '$lib/components/profielmodal.svelte';
	import * as Avatar from '$lib/components/ui/avatar/';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import '../../app.postcss';
	import type { PageData } from './$types';
	import BeheerSidebar from '$lib/components/beheer-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Separator } from '$lib/components/ui/separator';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';

	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();

	let huidige_pagina = $derived.by(() => {
	const breadcrumb = ($page.data as PageData & {
		breadcrumb?: {
			label: string;
			href?: string;
		};
	}).breadcrumb;

	if (breadcrumb) {
		return breadcrumb.label;
	}

	return '';
});

	let baravond = $derived(
	($page.data as PageData & {
		baravond?: { id: string; naam: string };
	}).baravond
);

	type PraesidiumLidMetKiescomite = NonNullable<PageData['praesidium_leden']>[number] & {
		kiescomite?: boolean;
	};

	let ingelogd_lid = $derived(
		data.praesidium_leden?.find(
			(v) => v.functie == data.functie_id
		) as PraesidiumLidMetKiescomite | undefined
	);
</script>

<svelte:head>
	<title>Beheer</title>
	<meta name="description" content="De beheerspagina van de website van Home Vermeylen" />
</svelte:head>

{#if $page.state.profiel}
	<ProfielModal data={data.profiel_form} {ingelogd_lid} />
{/if}

<Sidebar.Provider>
	<BeheerSidebar gebruiker={ingelogd_lid} kiescomite={ingelogd_lid?.kiescomite ?? false} />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
	<Sidebar.Trigger class="-ml-1" />

	<Separator orientation="vertical" class="mr-2 h-4" />

	<Button
		variant="ghost"
		size="icon"
		class="h-8 w-8"
		onclick={() => window.history.back()}
		aria-label="Ga terug"
		title="Ga terug"
	>
		<ArrowLeft class="h-4 w-4" />
	</Button>

	<Button
		variant="ghost"
		size="icon"
		class="h-8 w-8"
		onclick={() => window.history.forward()}
		aria-label="Ga vooruit"
		title="Ga vooruit"
	>
		<ArrowRight class="h-4 w-4" />
	</Button>

	<Separator orientation="vertical" class="mr-2 h-4" />

				<Breadcrumb.Root>
	<Breadcrumb.List>
		<!-- Beheerspagina -->
		<Breadcrumb.Item>
			{#if huidige_pagina || baravond}
				<Breadcrumb.Link href="/beheer">Beheerspagina</Breadcrumb.Link>
			{:else}
				<Breadcrumb.Page>Beheerspagina</Breadcrumb.Page>
			{/if}
		</Breadcrumb.Item>

				<!-- Hoofdpagina -->
{#if baravond || huidige_pagina === 'Druktebarometer'}
	<Breadcrumb.Separator />
	<Breadcrumb.Item>
		<Breadcrumb.Link href="/beheer/baravonden">
			Baravonden
		</Breadcrumb.Link>
	</Breadcrumb.Item>
	{#if huidige_pagina === 'Druktebarometer'}
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page>Druktebarometer</Breadcrumb.Page>
		</Breadcrumb.Item>
	{/if}
{:else if huidige_pagina}
	<Breadcrumb.Separator />
	<Breadcrumb.Item>
		{#if ($page.data as PageData & {
			breadcrumb?: {
				label: string;
				href?: string;
			};
		}).breadcrumb?.href}
			<Breadcrumb.Link
				href={($page.data as PageData & {
					breadcrumb?: {
						label: string;
						href?: string;
					};
				}).breadcrumb?.href}
			>
				{huidige_pagina}
			</Breadcrumb.Link>
		{:else}
			<Breadcrumb.Page>{huidige_pagina}</Breadcrumb.Page>
		{/if}
	</Breadcrumb.Item>
{/if}

		<!-- Specifieke baravond -->
		{#if baravond}
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href={`/beheer/baravonden/${baravond.id}`}>
					{baravond.naam}
				</Breadcrumb.Link>
			</Breadcrumb.Item>
		{/if}

		<!-- Verkoopoverzicht -->
		{#if $page.url.pathname.endsWith('/overzicht')}
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>Verkoopoverzicht</Breadcrumb.Page>
			</Breadcrumb.Item>
		{/if}
	</Breadcrumb.List>
</Breadcrumb.Root>
			</div>
		</header>

		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children?.()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>