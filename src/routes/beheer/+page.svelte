<script lang="ts">
	import Bakkendialog from '$lib/components/bakkendialog.svelte';
	import Fakkeldialog from '$lib/components/fakkeldialog.svelte';
	import { LucideBeer, LucideFlame, LucidePlus, LucidePlusCircle } from 'lucide-svelte';
	import { superForm, type SuperForm } from 'sveltekit-superforms/client';
	import type { RecordModel } from 'pocketbase';
	import type { PageData } from './$types';
	import toast from 'svelte-french-toast';

	export let data: PageData;
	const { form, enhance, errors, message, delayed } = superForm(data.BakkenForm, {
		onUpdated: ({ form }) => {
			if (form.valid) {
				geselecteerde_bak = null;
				bakken_dialog.close();
				toast.success('Bakken succesvol aangepast.', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
			}
		},
		onError: () => {
			geselecteerde_bak = null;
			bakken_dialog.close();
			toast.error('Er is een fout opgetreden.', {
				style: 'border-radius: 200px; background: #333; color: #fff;'
			});
		},
		delayMs: 500,
		timeoutMs: 8000
	});

	const {
		form: FakkelsForm,
		enhance: FakkelsEnhance,
		errors: FakkelsErrors,
		message: FakkelsMessage,
		delayed: FakkelsDelayed
	} = superForm(data.FakkelsForm, {
		onUpdated: ({ form }) => {
			if (form.valid) {
				geselecteerde_fakkel = null;
				fakkels_dialog.close();
				toast.success('Fakkels succesvol aangepast.', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
			}
		},
		onError: () => {
			geselecteerde_fakkel = null;
			fakkels_dialog.close();
			toast.error('Er is een fout opgetreden.', {
				style: 'border-radius: 200px; background: #333; color: #fff;'
			});
		},
		delayMs: 500,
		timeoutMs: 8000
	});

	let bakken_dialog: HTMLDialogElement;
	let fakkels_dialog: HTMLDialogElement;

	let geselecteerde_bak: RecordModel | null = null;
	let geselecteerde_fakkel: RecordModel | null = null;
</script>

<div class="flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
	<Fakkeldialog
		praesidium_leden={data.praesidium_leden}
		{FakkelsForm}
		{FakkelsEnhance}
		{FakkelsErrors}
		{FakkelsMessage}
		{FakkelsDelayed}
		fakkels={data.fakkels}
		bind:dialog={fakkels_dialog}
		gebruiker={data.gebruiker}
		{geselecteerde_fakkel}
	/>
	<Bakkendialog
		praesidium_leden={data.praesidium_leden}
		{form}
		{enhance}
		{errors}
		{message}
		{delayed}
		bakken={data.bakken}
		bind:dialog={bakken_dialog}
		gebruiker={data.gebruiker}
		{geselecteerde_bak}
	/>

	<div class="flex">
		<div class="card bg-base-200 shadow">
			<div class="card-body items-center">
				<h2 class="card-title">
					<LucideFlame class="h-4 w-4" /> Fakkels
				</h2>
				{#await data.fakkels}
					<div class="flex flex-col gap-4 w-52">
						<div class="skeleton h-32 w-full" />
						<div class="skeleton h-4 w-28" />
						<div class="skeleton h-4 w-full" />
						<div class="skeleton h-4 w-full" />
					</div>
				{:then fakkels}
					<table class="table">
						<thead>
							<th>Naam</th>
							<th>Aantal</th>
							<th>Actie</th>
						</thead>
						<tbody>
							{#each fakkels as fakkel (fakkel.id)}
								<tr>
									<td>
										{fakkel.expand.gebruiker.voornaam}
										{fakkel.expand.gebruiker.familienaam}
									</td>
									<td>{fakkel.aantal}</td>
									<td
										><button
											class="btn btn-ghost"
											on:click={() => {
												geselecteerde_fakkel = fakkel;
												fakkels_dialog.showModal();
											}}><LucidePlusCircle class="h-4 w-4" /></button
										></td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				{:catch}
					<h1>error</h1>
				{/await}
			</div>

			<div class="card-actions justify-center">
				<button
					class="btn btn-primary mb-5"
					on:click={() => {
						fakkels_dialog.showModal();
					}}>Voeg toe</button
				>
			</div>
		</div>
	</div>
	<div class="card bg-base-200 shadow mb-5">
		<div class="card-body items-center">
			<h2 class="card-title">
				<LucideBeer class="h-4 w-4" /> Bakken
			</h2>
			{#await data.bakken}
				<div class="flex flex-col gap-4 w-52">
					<div class="skeleton h-32 w-full" />
					<div class="skeleton h-4 w-28" />
					<div class="skeleton h-4 w-full" />
					<div class="skeleton h-4 w-full" />
				</div>
			{:then bakken}
				<table class="table">
					<thead>
						<th>Naam</th>
						<th>Aantal</th>
						<th>Actie</th>
					</thead>
					<tbody>
						{#each bakken as bak (bak.id)}
							<tr>
								<td>
									{bak.expand.gebruiker.voornaam}
									{bak.expand.gebruiker.familienaam}
								</td>
								<td>{bak.aantal}</td>
								<td
									><button
										class="btn btn-ghost"
										on:click={() => {
											geselecteerde_bak = bak;
											bakken_dialog.showModal();
										}}><LucidePlusCircle class="h-4 w-4" /></button
									></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			{:catch err}
				<h1>error</h1>
			{/await}
		</div>
		<div class="card-actions justify-center">
			<button class="btn btn-primary mb-5" on:click={() => bakken_dialog.showModal()}
				>Voeg toe</button
			>
		</div>
	</div>
</div>
