<script lang="ts">
	import PraesidiumBadge from '$lib/components/praesidiumbadge.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import { GraduationCap, Home } from 'lucide-svelte';
	import type { PraesidiumLedenRecord } from '../../../types/pocketbase-types';
	import Badge from './ui/badge/badge.svelte';

	interface Props {
		lid: PraesidiumLedenRecord;
	}

	let { lid }: Props = $props();
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
	<Card.Content class="flex flex-col gap-4 items-center">
		{#if lid.woonplaats}
			<Badge variant="secondary" class="flex flex-row gap-x-2 text-center">
				<Home class="h-4 w-4" />
				{lid.woonplaats}
			</Badge>
		{/if}

		{#if lid.studierichting}
			<Badge class="flex flex-row gap-x-2 text-center">
				<GraduationCap class="h-4 w-4" />
				{lid.studierichting}
			</Badge>
		{/if}
	</Card.Content>
</Card.Root>
