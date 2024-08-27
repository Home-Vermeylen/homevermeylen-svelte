<script lang="ts">
	import PraesidiumBadge from '$lib/components/praesidiumbadge.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import { GraduationCap, Home } from 'lucide-svelte';
	import type { PraesidiumLedenRecord } from '../../../types/pocketbase-types';

	export let lid: PraesidiumLedenRecord;
</script>

<Card.Root class="w-[300px] md:w-[350px] flex flex-col items-center">
	<Card.Header class="flex flex-col items-center">
		<Avatar.Root class="h-40 w-40">
			<Avatar.Image class="object-cover" src={lid.avatar} alt={`${lid?.voornaam} ${lid?.familienaam}`} />
			<Avatar.Fallback>{lid.voornaam?.at(0)}{lid.familienaam?.at(0)}</Avatar.Fallback>
		</Avatar.Root>
		<Card.Title>{lid.voornaam} {lid.familienaam}</Card.Title>
		<PraesidiumBadge functie={lid.expand?.functie.username.replace(/[0-9]/g, '')} />
	</Card.Header>
	<Card.Content>
		{#if lid.woonplaats}
			<div class="flex flex-row gap-x-2 text-center">
				<Home class="h-5 w-5" />
				{lid.woonplaats}
			</div>
		{/if}

		{#if lid.studierichting}
			<div class="flex flex-row gap-x-2 text-center">
				<GraduationCap class="h-5 w-5" />
				{lid.studierichting}
			</div>
		{/if}
	</Card.Content>
</Card.Root>
