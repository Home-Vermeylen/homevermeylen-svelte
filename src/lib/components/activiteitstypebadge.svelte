<script lang="ts">
	import { Beer, Drama, Ellipsis, Medal, MicVocal, PartyPopper } from 'lucide-svelte';
	import { Badge } from './ui/badge';

	let {
		activiteitstype
	}: { activiteitstype: 'SPORT' | 'CANTUS' | 'BAR' | 'FEEST' | 'CULTUUR' | 'ANDERE' } = $props();
</script>

<Badge variant="outline" class="flex gap-2 items-center justify-center w-36">
	{#if activiteitstype == 'SPORT'}
		<Medal class="h-4 w-4" /> Sportactiviteit
	{:else if activiteitstype == 'CANTUS'}
		<MicVocal class="h-4 w-4" /> Cantus
	{:else if activiteitstype == 'BAR'}
		<Beer class="h-4 w-4" /> Baravond
	{:else if activiteitstype == 'FEEST'}
		<PartyPopper class="h-4 w-4" /> Fuif
	{:else if activiteitstype == 'CULTUUR'}
		<Drama class="h-4 w-4" /> Cultuur
	{:else}
		<Ellipsis class="h-4 w-4" /> Overige
	{/if}
</Badge>
