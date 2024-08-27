<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { Facebook, Instagram, Linkedin, Music2 } from 'lucide-svelte';
	import '../../app.postcss';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Navbar profiel_form={data.profiel_form} login_data={data.login_data} praesidium_leden={data.praesidium_leden} functie_id={data.functie_id} />

<slot />

<footer class="flex items-center gap-5 flex-col p-10 bg-background">
	<img
		alt="Schild Home Vermeylen"
		class="w-20 h-20 object-contain"
		width={1080}
		height={901}
		src="/logo.png"
	/>
	<p class="font-bold">Homeraad Vermeylen</p>
	<p>© 2024 Homeraad Vermeylen. Alle rechten voorbehouden</p>
	<div class="grid grid-flow-col gap-4 justify-evenly">
		<a class="btn btn-ghost" href="https://www.facebook.com/Home-Vermeylen-845283782203005/"
			><Facebook /></a
		>
		<a class="btn btn-ghost" href="https://www.instagram.com/homevermeylen/">
			<Instagram />
		</a>
		<a class="btn btn-ghost" href="https://www.tiktok.com/@homevermeylen/video/7177768007366659333">
			<Music2 />
		</a>
		<!-- TODO: Voeg Linkedin toe -->
		<a class="btn btn-ghost" href="/">
			<Linkedin />
		</a>
	</div>
</footer>
