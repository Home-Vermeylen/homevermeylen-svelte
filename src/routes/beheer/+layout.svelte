<script lang="ts">
	import { Avatar } from '$lib/components';
	import Praesidiumbadge from '$lib/components/praesidiumbadge.svelte';
	import { Home, Users, Calendar, Newspaper, ScrollText, Settings, LucideMenu, LucideX, Heart, LucideHome, Vote } from 'lucide-svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	export let data: any;
	let huidig_paneel: string;

	if ($page.url.pathname.includes('activiteiten')) {
		huidig_paneel = "ACTIVITEITEN"
	} else if ($page.url.pathname.includes('augustje')) {
		huidig_paneel = "AUGUSTJE"
	} else if ($page.url.pathname.includes('verslagen')) {
		huidig_paneel = "VERSLAGEN"
	} else if ($page.url.pathname.includes('instellingen')) {
		huidig_paneel = "INSTELLINGEN"
	} else if ($page.url.pathname.includes('vriendschapsnetwerk')) {
		huidig_paneel = "VRIENDSCHAPSNETWERK"
	} else if ($page.url.pathname.includes('verkiezingen')) {
		huidig_paneel = "VERKIEZINGEN"
	}else {
		huidig_paneel = "DASH"
	}
</script>

<svelte:head>
	<title>Beheer</title>
	<meta name="robots" content="none, noarchive">
</svelte:head>

<div>
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<div class="navbar lg:hidden bg-base-100 shadow flex flex-row max-w-full justify-evenly">
				<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
					<LucideMenu class="h-4 w-4" /> Menu
				</label>
				<img width={50} height={50} class="w-auto h-8 sm:h-9" src="/logo.png" alt="" />
				<a href="/" class="lg:hidden btn btn-primary">
					<LucideHome class="h-4 w-4" /> Thuispagina
				</a>
			  </div>
			<slot />
		</div>
		<div class="drawer-side">
			<label for="my-drawer-2" class="drawer-overlay" />
			<aside
				class="flex flex-col w-72 h-screen px-4 py-8 overflow-y-auto bg-base-200 shadow-2xl rounded-sm"
			>
				<a href="/" class="mx-auto hidden lg:block">
					<div
						class="flex flex-row gap-4 text-center items-center font-bold tracking-tight text-xl hover:bg-base-300 p-2 rounded-lg"
					>
						<img width={50} height={50} class="w-auto h-8 sm:h-9" src="/logo.png" alt="" />
						<h1>Home Vermeylen</h1>
					</div>
				</a>

				<div class="flex flex-col items-center mt-6 -mx-2 gap-2">
					<div class="avatar">
						<div class="w-24 rounded-full">
							<Avatar gebruiker={data.gebruiker} />
						</div>
					</div>

					<h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
						{data.gebruiker.voornaam}
						{data.gebruiker.familienaam}
					</h4>
					<Praesidiumbadge functie={data.gebruiker.expand.praesidiumlid.functie} />
				</div>

				<div class="flex flex-col justify-between align-center text-center mt-6 gap-2">
					<a class={`btn ${huidig_paneel != 'DASH' ? 'btn-neutral' : 'btn-primary'}`} href="/beheer" on:click={() => { huidig_paneel = 'DASH' }}>
						<Home class="h-4 w-4" />
						Thuispagina
					</a>
					<a
						class={`btn ${huidig_paneel != 'ACTIVITEITEN' ? 'btn-neutral' : 'btn-primary'}`}
						href="/beheer/activiteiten"
						on:click={() => { huidig_paneel = 'ACTIVITEITEN' }}
					>
						<Calendar class="h-4 w-4" />
						Activiteiten
					</a>

					<a
						class={`btn ${huidig_paneel != 'AUGUSTJE' ? 'btn-neutral' : 'btn-primary'}`}
						href="/beheer/augustje"
						on:click={() => { huidig_paneel = 'AUGUSTJE' }}
					>
						<Newspaper class="h-4 w-4" />
						Augustjes
					</a>

					<a
						class={`btn ${huidig_paneel != 'VERSLAGEN' ? 'btn-neutral' : 'btn-primary'}`}
						href="/beheer/verslagen"
						on:click={() => { huidig_paneel = 'VERSLAGEN' }}
					>
						<ScrollText class="h-4 w-4" />
						Verslagen & Statuten
					</a>

					<a
						class={`btn ${huidig_paneel != 'VRIENDSCHAPSNETWERK' ? 'btn-neutral' : 'btn-primary'}`}
						href="/beheer/vriendschapsnetwerk"
						on:click={() => { huidig_paneel = 'VRIENDSCHAPSNETWERK' }}
					>
						<Heart class="h-4 w-4" />
						Vriendschapsnetwerk
					</a>
					<a
						class={`btn ${huidig_paneel != 'VERKIEZINGEN' ? 'btn-neutral' : 'btn-primary'}`}
						href="/beheer/verkiezingen"
						on:click={() => { huidig_paneel = 'VERKIEZINGDN' }}
					>
						<Vote class="h-4 w-4" />
						Verkiezingen
					</a>
				</div>
			</aside>
		</div>
	</div>
</div>
