<script lang="ts">
	import Badge from "./ui/badge/badge.svelte";

	interface Props {
		functie: string;
	}

	let { functie }: Props = $props();

	const map = [
		{
			functie: 'Praeses',
			color: 'badge-accent',
			tekst: 'PRAESES'
		},
		{
			functie: 'Vice-Praeses',
			color: 'badge-secondary',
			tekst: 'VICE'
		},
		{
			functie: 'Penning',
			color: 'badge-secondary',
			tekst: 'PENNING'
		},
		{
			functie: 'Secretaris',
			color: 'badge-primary',
			tekst: 'SECRETARIS'
		},
		{
			functie: 'Milieu',
			color: 'badge-primary',
			tekst: 'MILIEU'
		},
		{
			functie: 'ICT',
			color: 'badge-primary',
			tekst: 'ICT'
		},
		{
			functie: 'Sport',
			color: 'badge-error',
			tekst: 'SPORT'
		},
		{
			functie: 'Cultuur',
			color: 'badge-error',
			tekst: 'CULTUUR'
		},
		{
			functie: 'Feest',
			color: 'badge-error',
			tekst: 'FEEST'
		},
		{
			functie: 'Bar',
			color: 'badge-error',
			tekst: 'BAR'
		},
		{
			functie: 'PR-Intern',
			color: 'badge-info',
			tekst: 'PR-INTERN'
		},
		{
			functie: 'PR-Extern',
			color: 'badge-info',
			tekst: 'PR-EXTERN'
		},
		{
			functie: 'Scriptor',
			color: 'badge-info',
			tekst: 'SCRIPTOR'
		},
		{
			functie: 'Cantor',
			color: 'badge-success',
			tekst: 'CANTOR'
		},
		{
			functie: 'Zeden',
			color: 'badge-success',
			tekst: 'ZEDEN'
		},
		{
			functie: 'Schachtentemmer',
			color: 'badge-success',
			tekst: 'TEMMER'
		},
		{
			functie: 'Lustrum',
			color: 'badge-warning',
			tekst: 'LUSTRUM'
		},
		{
			functie: 'Internationaal',
			color: 'badge-warning',
			tekst: 'INTERNATIONAAL'
		},
		{
			functie: 'Meter',
			color: 'badge-warning',
			tekst: 'METER'
		},
		{
			functie: 'Peter',
			color: 'badge-warning',
			tekst: 'PETER'
		},
		{
			functie: 'VM',
			color: 'badge-ghost',
			tekst: 'VM'
		}
	];
</script>

{#each map as badge}
	{#if functie == badge.functie}
		<Badge variant="outline">{badge.tekst}</Badge>
		<span class={`badge font-bold ${badge.color}`}></span>
	{/if}
{/each}
