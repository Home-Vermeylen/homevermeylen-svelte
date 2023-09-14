<script lang="ts">
	import { Navbar } from '$lib/components';
	import '../../app.postcss';
	import { Facebook, Instagram, Linkedin, Music2 } from 'lucide-svelte';

	export let data;
	export let form: any;
</script>

<Navbar bind:form {data} />

<slot />

<footer class="footer footer-center p-10 bg-primary text-primary-content">
	<div>
		<img
			alt="Schild Home Vermeylen"
			class="w-20 h-20 object-contain"
			width={1080}
			height={901}
			src="/logo.png"
		/>
		<p class="font-bold">Homeraad Vermeylen</p>
		<p>© 2023 Homeraad Vermeylen. Alle rechten voorbehouden</p>
	</div>
	<div>
		<div class="grid grid-flow-col gap-4">
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
			<!-- TODO: Voeg Linkedin toe -->
			<a class="btn btn-ghost" href="/">
				<Linkedin />
			</a>
		</div>
	</div>
</footer>
