<script lang="ts">
	import Bakkendialog from '$lib/components/bakkendialog.svelte';
	import Fakkeldialog from '$lib/components/fakkeldialog.svelte';
	import { LucideBeer, LucideFlame, LucidePlus, LucidePlusCircle } from 'lucide-svelte';
	import type { Record } from 'pocketbase';

	export let data: any;
  export let form: any;

  let bakken_dialog: HTMLDialogElement;
  let fakkels_dialog: HTMLDialogElement;

  let geselecteerde_bak: Record | null = null;
  let geselecteerde_fakkel: Record | null = null;
</script>

<div class="flex flex-col items-center gap-5">
	<Fakkeldialog bind:form bind:fakkels={data.fakkels} bind:dialog={fakkels_dialog} gebruiker={data.gebruiker} {geselecteerde_fakkel} />
	<Bakkendialog bind:form bind:bakken={data.bakken} bind:dialog={bakken_dialog} gebruiker={data.gebruiker} {geselecteerde_bak} />
	<div class="flex flex-row items-center mt-5">
		<div class="stats stats-vertical md:stats-horizontal shadow bg-base-200">
			<div class="stat">
				<div class="stat-title">Aantal unieke bezoekers</div>
				<div class="stat-value">89,400</div>
				<div class="stat-desc">21% more than last month</div>
			</div>
			<div class="stat">
				<div class="stat-title">Aantal gelezen augustjes</div>
				<div class="stat-value">3</div>
				<div class="stat-desc">21% more than last month</div>
			</div>
			<div class="stat">
				<div class="stat-title">Aantal gelezen verslagen</div>
				<div class="stat-value">3</div>
				<div class="stat-desc">21% more than last month</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col md:flex-row gap-5">
		<div class="card bg-base-200 shadow">
			<div class="card-body items-center">
				<h2 class="card-title">
					<LucideFlame class="h-4 w-4" /> Fakkels
				</h2>
				<table class="table">
					<thead>
						<th>Naam</th>
						<th>Aantal</th>
						<th>Actie</th>
					</thead>
					<tbody>
						{#each data.fakkels as fakkel (fakkel.id)}
							<tr>
								<td>
									{fakkel.expand.gebruiker.voornaam}
									{fakkel.expand.gebruiker.familienaam}
								</td>
								<td>{fakkel.aantal}</td>
								<td><button class="btn btn-ghost" on:click={() => { geselecteerde_fakkel = fakkel; fakkels_dialog.showModal()}}><LucidePlusCircle class="h-4 w-4" /></button></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="card-actions justify-center">
				<button class="btn btn-primary"  on:click={() => { fakkels_dialog.showModal() }} >Voeg toe</button>
			</div>
		</div>
	</div>
	<div class="card bg-base-200 shadow">
		<div class="card-body items-center">
			<h2 class="card-title">
				<LucideBeer class="h-4 w-4" /> Bakken
			</h2>

			<table class="table">
				<thead>
					<th>Naam</th>
					<th>Aantal</th>
					<th>Actie</th>
				</thead>
				<tbody>
					{#each data.bakken as bak (bak.id)}
						<tr>
							<td>
								{bak.expand.gebruiker.voornaam}
								{bak.expand.gebruiker.familienaam}
							</td>
							<td>{bak.aantal}</td>
							<td><button class="btn btn-ghost" on:click={() => { geselecteerde_bak = bak; bakken_dialog.showModal()}}><LucidePlusCircle class="h-4 w-4" /></button></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="card-actions justify-center">
			<button class="btn btn-primary" on:click={() => bakken_dialog.showModal()}>Voeg toe</button>
		</div>
	</div>
</div>
