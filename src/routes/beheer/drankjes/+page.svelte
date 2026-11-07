<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll, pushState } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import Drankjesmodal from './drankjemodal.svelte';
	import { Plus, Pencil, GripVertical, Power, LoaderCircle } from 'lucide-svelte';

	let { data } = $props();

	let drankjes: any[] = $state([]);
	let geselecteerdDrankje: any = $state(null);
	let modalOpen = $state(false);
	let opslaanVolgorde = $state(false);

	$effect(() => {
		data.drankjes_promise.then((result: any[]) => {
			drankjes = result;
		});
	});

	function nieuwDrankje() {
		geselecteerdDrankje = null;
		modalOpen = true;
	}

	function bewerkDrankje(drankje: any) {
		geselecteerdDrankje = drankje;
		modalOpen = true;
	}

	async function deactiveerDrankje(drankje: any) {
		if (!confirm(`Ben je zeker dat je ${drankje.naam} wilt deactiveren?`)) {
			return;
		}

		const response = await fetch('/api/drankjes', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: drankje.id })
		});

		if (response.ok) {
			drankje.actief = false;
			drankjes = [...drankjes];
		}
	}

	async function activeerDrankje(drankje: any) {
		const formData = new FormData();

		formData.set('id', drankje.id);
		formData.set('naam', drankje.naam);
		formData.set('actief', 'true');
		formData.set('volgorde', String(drankje.volgorde));

		const response = await fetch('/api/drankjes', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			drankje.actief = true;
			drankjes = [...drankjes];
		}
	}

	function versleepDrankje(event: DragEvent, index: number) {
		event.dataTransfer?.setData('text/plain', String(index));
	}

	async function plaatsDrankje(event: DragEvent, nieuweIndex: number) {
		event.preventDefault();

		const oudeIndex = Number(event.dataTransfer?.getData('text/plain'));

		if (
			Number.isNaN(oudeIndex) ||
			oudeIndex < 0 ||
			oudeIndex >= drankjes.length ||
			oudeIndex === nieuweIndex
		) {
			return;
		}

		const nieuweDrankjes = [...drankjes];
		const [verplaatstDrankje] = nieuweDrankjes.splice(oudeIndex, 1);
		nieuweDrankjes.splice(nieuweIndex, 0, verplaatstDrankje);

		drankjes = nieuweDrankjes;
		opslaanVolgorde = true;

		try {
			const response = await fetch('/api/drankjes', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					volgorde: drankjes.map((drankje, index) => ({
						id: drankje.id,
						volgorde: index + 1
					}))
				})
			});

			if (!response.ok) {
				throw new Error('Volgorde opslaan mislukt.');
			}

			drankjes = drankjes.map((drankje, index) => ({
				...drankje,
				volgorde: index + 1
			}));
		} catch (error) {
			console.error(error);
			await invalidateAll();
		} finally {
			opslaanVolgorde = false;
		}
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold">Drankjes beheren</h1>

		<Button onclick={nieuwDrankje}>
			<Plus class="mr-2 size-4" />
			Nieuw drankje
		</Button>
	</div>

	{#if modalOpen}
		<Drankjesmodal
			data={data.drankjes_form}
			drankje={geselecteerdDrankje}
			onClose={() => {
				modalOpen = false;
				invalidateAll();
			}}
		/>
	{/if}

	{#if opslaanVolgorde}
		<p class="text-sm text-muted-foreground">
			<LoaderCircle class="mr-2 inline size-4 animate-spin" />
			Volgorde opslaan...
		</p>
	{/if}

	{#await data.drankjes_promise}
		<div class="flex flex-col gap-3">
			{#each Array(4) as _}
				<Skeleton class="h-16 w-full" />
			{/each}
		</div>
	{:then}
		{#if drankjes.length === 0}
			<p class="text-muted-foreground">Er zijn nog geen drankjes toegevoegd.</p>
		{:else}
			<div class="flex flex-col gap-2">
				{#each drankjes as drankje, index (drankje.id)}
					<div
	                    role="listitem"
	                    aria-roledescription="Versleepbaar drankje"
	                    aria-label={drankje.naam}
	                    class="flex items-center gap-3 rounded-lg border bg-card p-3"
	                    draggable="true"
	                    ondragstart={(event) => versleepDrankje(event, index)}
	                    ondragover={(event) => event.preventDefault()}
	                    ondrop={(event) => plaatsDrankje(event, index)}
                    >
						<GripVertical class="size-5 shrink-0 cursor-grab text-muted-foreground" />

						{#if drankje.foto}
							<img
								src={drankje.foto}
								alt={drankje.naam}
								class="size-14 rounded-md object-cover"
							/>
						{:else}
							<div class="flex size-14 items-center justify-center rounded-md bg-muted">
								<span class="text-xs text-muted-foreground">Geen foto</span>
							</div>
						{/if}

						<div class="min-w-0 flex-1">
							<p class="font-medium">{drankje.naam}</p>
							<p class="text-xs text-muted-foreground">
								Volgorde: {drankje.volgorde}
								·
								{drankje.actief ? 'Actief' : 'Gedeactiveerd'}
							</p>
						</div>

						<Button variant="outline" size="icon" onclick={() => bewerkDrankje(drankje)}>
							<Pencil class="size-4" />
						</Button>

						{#if drankje.actief}
							<Button
								variant="outline"
								size="icon"
								onclick={() => deactiveerDrankje(drankje)}
							>
								<Power class="size-4" />
							</Button>
						{:else}
							<Button
								variant="outline"
								size="icon"
								onclick={() => activeerDrankje(drankje)}
							>
								<Power class="size-4 text-green-600" />
							</Button>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{/await}
</div>