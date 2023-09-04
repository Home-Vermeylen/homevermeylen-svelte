<script lang="ts">
	import { GraduationCap, Home, Instagram, Mail, Quote } from 'lucide-svelte';
	import { PraesidiumBadge } from '.';
	import Avatar from './avatar.svelte';

	export let lid: any;
	export let isHuidigPraesidium: boolean;
</script>

<div class="card w-96 h-[500px]">
	<figure class="avatar">
		<div class="w-52 h-52 rounded-full object-scale-down">
			<Avatar gebruiker={lid.expand.gebruiker} />
		</div>
	</figure>
	<div class="card-body items-center text-center">
		<h1 class="card-title">
			{lid.voornaam}
			{lid.familienaam}
		</h1>

		<div class="flex flex-col gap-5 items-center text-center">
			<PraesidiumBadge functie={lid.functie} />

			{#if lid.expand.gebruiker?.quote}
				<div class="flex flex-row gap-x-2 text-center">
					<Quote class="h-5 w-5" />
					{lid.expand.gebruiker?.quote}
				</div>
			{/if}

			{#if lid.expand.gebruiker?.woonplaats}
				<div class="flex flex-row gap-x-2 text-center">
					<Home class="h-5 w-5" />
					{lid.expand.gebruiker?.woonplaats}
				</div>
			{/if}

			{#if lid.expand.gebruiker?.studierichting}
				<div class="flex flex-row gap-x-2 text-center">
					<GraduationCap class="h-5 w-5" />
					{lid.expand.gebruiker?.studierichting}
				</div>
			{/if}
		</div>

		<div class="card-actions justify-end">
			{#if isHuidigPraesidium}
				<a
					target="_blank"
					href={`mailto:${lid.functie.toLowerCase().replaceAll('-', '')}@homevermeylen.be`}
					class="btn btn-ghost"
				>
					<Mail class="h-5 w-5" />
				</a>
			{/if}

			{#if lid.expand.gebruiker?.instagram}
				<a href={lid.expand.gebruiker?.instagram} target="_blank" class="btn btn-ghost">
					<Instagram class="h-5 w-5" />
				</a>
			{/if}
		</div>
	</div>
</div>
