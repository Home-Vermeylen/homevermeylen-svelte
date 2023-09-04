<script lang="ts">
	import { Avatar } from '$lib/components';
	import Praesidiumbadge from '$lib/components/praesidiumbadge.svelte';
	import { Home, Users, Calendar, Newspaper, ScrollText, Settings } from 'lucide-svelte';
	import type { LayoutData } from './$types';

	export let data: any;

	let huidig_paneel: string;
</script>

<div>
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<slot />
		</div>
		<div class="drawer-side">
			<label for="my-drawer-2" class="drawer-overlay" />
			<aside
				class="flex flex-col w-72 h-screen px-4 py-8 overflow-y-auto bg-base-200 shadow-2xl rounded-sm"
			>
				<a href="/" class="mx-auto">
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
					<a class={`btn ${huidig_paneel != 'DASH' ? 'btn-outline' : ''}`} href="/beheer">
						<Home />
						Thuispagina
					</a>
					<a
						class={`btn ${huidig_paneel != 'ACTIVITEITEN' ? 'btn-outline' : ''}`}
						href="/beheer/activiteiten"
					>
						<Calendar />
						Activiteiten
					</a>

					<a
						class={`btn ${huidig_paneel != 'AUGUSTJE' ? 'btn-outline' : ''}`}
						href="/beheer/augustje"
					>
						<Newspaper />
						Augustjes
					</a>

					<a
						class={`btn ${huidig_paneel != 'VERSLAGEN' ? 'btn-outline' : ''}`}
						href="/beheer/verslagen"
					>
						<ScrollText />
						Verslagen & Statuten
					</a>

					<a
						class={`btn ${huidig_paneel != 'INSTELLINGEN' ? 'btn-outline' : ''}`}
						href="/beheer/instellingen"
					>
						<Settings />
						ICT
					</a>
				</div>
			</aside>
		</div>
	</div>
</div>
