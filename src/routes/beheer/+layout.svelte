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

	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();

	let huidige_pagina = $page.url.toString().includes('fakkels_bakken')
		? 'Fakkels & Bakken'
		: $page.url.toString().includes('vriendschapsnetwerk')
			? 'Vriendschapsnetwerk'
			: $page.url.toString().includes('verkiezingen')
				? 'Verkieziengen'
				: $page.url.toString().includes('activiteiten')
					? 'Activiteiten'
					: $page.url.toString().includes('verslagen')
						? 'Verslagen'
						: $page.url.toString().includes('augustjes')
							? 'Augustjes'
							: '';

	let ingelogd_lid = $derived(data.praesidium_leden?.find((v) => v.functie == data.functie_id));
</script>

{#if $page.state.profiel}
	<ProfielModal data={data.profiel_form} {ingelogd_lid} />
{/if}

<Sidebar.Provider>
	<BeheerSidebar gebruiker={ingelogd_lid} />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="#">Beheerspagina</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>{huidige_pagina}</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children?.()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
