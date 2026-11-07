<script lang="ts">
	import { ChevronDown, Check } from 'lucide-svelte';
	import * as XLSX from 'xlsx';
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();

	let weergave = $state<'algemeen' | 'drankjes'>('algemeen');
	let dropdownOpen = $state(false);
	let grafiekElement: SVGSVGElement | undefined = $state();

	let geselecteerdeDrankjes = $state<string[]>(
		data.drankjes.map((drankje) => drankje.id)
	);

	const kleuren = [
		'#2563eb',
		'#dc2626',
		'#16a34a',
		'#9333ea',
		'#ea580c',
		'#0891b2',
		'#db2777',
		'#65a30d',
		'#7c3aed',
		'#ca8a04'
	];

	function kleurVoorDrankje(id: string) {
		const index = data.drankjes.findIndex((drankje) => drankje.id === id);
		return kleuren[index % kleuren.length];
	}

	function formatteerDatum(datum: string) {
		return new Date(datum).toLocaleDateString('nl-BE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}

	// Berekent automatisch een nette Y-as met ongeveer vijf tussenstappen.
	function berekenYAs(maxWaarde: number) {
		if (maxWaarde <= 0) {
			return {
				max: 10,
				stap: 2,
				waarden: [0, 2, 4, 6, 8, 10]
			};
		}

		const ruweStap = maxWaarde / 5;
		const macht = Math.pow(10, Math.floor(Math.log10(ruweStap)));
		const verhouding = ruweStap / macht;

		let mooieStap: number;

		if (verhouding <= 1) {
			mooieStap = macht;
		} else if (verhouding <= 2) {
			mooieStap = 2 * macht;
		} else if (verhouding <= 5) {
			mooieStap = 5 * macht;
		} else {
			mooieStap = 10 * macht;
		}

		const max = Math.ceil(maxWaarde / mooieStap) * mooieStap;
		const waarden: number[] = [];

		for (let waarde = 0; waarde <= max; waarde += mooieStap) {
			waarden.push(waarde);
		}

		return { max, stap: mooieStap, waarden };
	}

	const maxAantalAlgemeen = $derived(
		Math.max(...data.baravonden.map((baravond) => baravond.totaal), 0)
	);

	const yAsAlgemeen = $derived(berekenYAs(maxAantalAlgemeen));

	const geselecteerdeData = $derived(
		data.baravonden.map((baravond) => ({
			...baravond,
			drankjes: baravond.drankjes.filter((drankje) =>
				geselecteerdeDrankjes.includes(drankje.id)
			)
		}))
	);

	const maxAantalDrankjes = $derived(
		Math.max(
			...geselecteerdeData.flatMap((baravond) =>
				baravond.drankjes.map((drankje) => drankje.aantal)
			),
			0
		)
	);

	const yAsDrankjes = $derived(berekenYAs(maxAantalDrankjes));

	const yAs = $derived(
		weergave === 'algemeen' ? yAsAlgemeen : yAsDrankjes
	);

	function toggleDrankje(id: string) {
		if (geselecteerdeDrankjes.includes(id)) {
			geselecteerdeDrankjes = geselecteerdeDrankjes.filter(
				(drankjeId) => drankjeId !== id
			);
		} else {
			geselecteerdeDrankjes = [...geselecteerdeDrankjes, id];
		}
	}

	function alleDrankjesSelecteren() {
		geselecteerdeDrankjes = data.drankjes.map((drankje) => drankje.id);
	}

	function alleDrankjesDeselecteren() {
		geselecteerdeDrankjes = [];
	}

	function naamDrankjes() {
		if (geselecteerdeDrankjes.length === 0) {
			return 'Geen drankjes geselecteerd';
		}

		if (geselecteerdeDrankjes.length === data.drankjes.length) {
			return 'Alle drankjes';
		}

		return data.drankjes
			.filter((drankje) => geselecteerdeDrankjes.includes(drankje.id))
			.map((drankje) => drankje.naam)
			.join(', ');
	}

	function exporteerExcel() {
		const rijen = data.baravonden.map((baravond) => {
			const rij: Record<string, string | number> = {
				Baravond: baravond.naam,
				Datum: new Date(baravond.datum).toLocaleDateString('nl-BE'),
				Totaal: baravond.totaal
			};

			for (const drankje of data.drankjes) {
				rij[drankje.naam] =
					baravond.drankjes.find((item) => item.id === drankje.id)?.aantal ?? 0;
			}

			return rij;
		});

		const werkblad = XLSX.utils.json_to_sheet(rijen);

		werkblad['!cols'] = [
			{ wch: 25 },
			{ wch: 15 },
			{ wch: 12 },
			...data.drankjes.map(() => ({ wch: 15 }))
		];

		const werkboek = XLSX.utils.book_new();

		XLSX.utils.book_append_sheet(
			werkboek,
			werkblad,
			'Druktebarometer'
		);

		const datum = new Date().toISOString().slice(0, 10);

		XLSX.writeFile(
			werkboek,
			`druktebarometer_${datum}.xlsx`
		);
	}

	async function exporteerJpg() {
		if (!grafiekElement) return;

		const svg = grafiekElement.cloneNode(true) as SVGSVGElement;

		// Neem ook de extra ruimte links van de Y-as mee.
		svg.setAttribute('viewBox', '-35 0 1015 420');

		const viewBox = svg.viewBox.baseVal;
		const marge = 60;
		const breedte = 1800;
		const hoogte = Math.round((viewBox.height / viewBox.width) * breedte);

		const exportBreedte = breedte + marge * 2;
		const exportHoogte = hoogte + marge * 2;

		svg.setAttribute('width', String(breedte));
		svg.setAttribute('height', String(hoogte));

		const achtergrond = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'rect'
		);

		achtergrond.setAttribute('x', '-35');
		achtergrond.setAttribute('y', '0');
		achtergrond.setAttribute('width', '1015');
		achtergrond.setAttribute('height', '420');
		achtergrond.setAttribute('fill', '#ffffff');

		svg.insertBefore(achtergrond, svg.firstChild);

		const serializer = new XMLSerializer();
		const source = serializer.serializeToString(svg);

		const blob = new Blob([source], {
			type: 'image/svg+xml;charset=utf-8'
		});

		const url = URL.createObjectURL(blob);
		const afbeelding = new Image();

		afbeelding.onload = () => {
			const canvas = document.createElement('canvas');

			canvas.width = exportBreedte;
			canvas.height = exportHoogte;

			const ctx = canvas.getContext('2d');

			if (!ctx) {
				URL.revokeObjectURL(url);
				return;
			}

			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, exportBreedte, exportHoogte);

			ctx.drawImage(
				afbeelding,
				marge,
				marge,
				breedte,
				hoogte
			);

			URL.revokeObjectURL(url);

			canvas.toBlob((jpgBlob) => {
				if (!jpgBlob) return;

				const downloadUrl = URL.createObjectURL(jpgBlob);
				const link = document.createElement('a');

				link.href = downloadUrl;
				link.download = `druktebarometer_${new Date()
					.toISOString()
					.slice(0, 10)}.jpg`;

				link.click();

				URL.revokeObjectURL(downloadUrl);
			}, 'image/jpeg', 0.95);
		};

		afbeelding.onerror = () => {
			URL.revokeObjectURL(url);
			console.error('JPG-export mislukt');
		};

		afbeelding.src = url;
	}
</script>

<div class="space-y-6 p-6">
	<div>
		<h1 class="text-2xl font-bold">Druktebarometer</h1>
		<p class="text-muted-foreground">
			Bekijk de verkooptrends van je baravonden.
		</p>
	</div>

	<div class="flex flex-wrap gap-2">
		<button
			type="button"
			class={`rounded-md px-4 py-2 text-sm font-medium transition ${
				weergave === 'algemeen'
					? 'bg-primary text-primary-foreground'
					: 'bg-muted text-muted-foreground hover:bg-muted/80'
			}`}
			onclick={() => (weergave = 'algemeen')}
		>
			Algemeen
		</button>

		<button
			type="button"
			class={`rounded-md px-4 py-2 text-sm font-medium transition ${
				weergave === 'drankjes'
					? 'bg-primary text-primary-foreground'
					: 'bg-muted text-muted-foreground hover:bg-muted/80'
			}`}
			onclick={() => (weergave = 'drankjes')}
		>
			Per drankje
		</button>
	</div>

	{#if weergave === 'drankjes'}
		<div class="relative">
			<button
				type="button"
				class="flex w-full items-center justify-between rounded-md border bg-background px-4 py-3 text-left sm:w-[400px]"
				onclick={() => (dropdownOpen = !dropdownOpen)}
			>
				<div class="min-w-0">
					<div class="text-sm font-medium">Drankjes vergelijken</div>
					<div class="truncate text-sm text-muted-foreground">
						{naamDrankjes()}
					</div>
				</div>

				<ChevronDown
					class={`size-4 shrink-0 transition-transform ${
						dropdownOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{#if dropdownOpen}
				<div
					class="absolute z-20 mt-2 w-full rounded-md border bg-background p-2 shadow-lg sm:w-[400px]"
				>
					<div class="mb-2 flex gap-2 border-b pb-2">
						<button
							type="button"
							class="rounded px-2 py-1 text-xs hover:bg-muted"
							onclick={alleDrankjesSelecteren}
						>
							Alles selecteren
						</button>

						<button
							type="button"
							class="rounded px-2 py-1 text-xs hover:bg-muted"
							onclick={alleDrankjesDeselecteren}
						>
							Alles wissen
						</button>
					</div>

					<div class="max-h-64 overflow-y-auto">
						{#each data.drankjes as drankje}
							<button
								type="button"
								class="flex w-full items-center gap-3 rounded px-3 py-2 text-left hover:bg-muted"
								onclick={() => toggleDrankje(drankje.id)}
							>
								<div
									class={`flex size-4 shrink-0 items-center justify-center rounded border ${
										geselecteerdeDrankjes.includes(drankje.id)
											? 'border-primary bg-primary text-primary-foreground'
											: 'border-input'
									}`}
								>
									{#if geselecteerdeDrankjes.includes(drankje.id)}
										<Check class="size-3" />
									{/if}
								</div>

								<span>{drankje.naam}</span>
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<div class="rounded-xl border bg-card p-6">
		<h2 class="mb-6 text-lg font-semibold">
			{weergave === 'algemeen'
				? 'Verkochte drankjes per baravond'
				: 'Drankjes vergelijken'}
		</h2>

		{#if data.baravonden.length === 0}
			<p class="text-muted-foreground">
				Er zijn nog geen baravonden beschikbaar.
			</p>
		{:else if weergave === 'drankjes' && geselecteerdeDrankjes.length === 0}
			<p class="text-muted-foreground">
				Selecteer minstens één drankje om de grafiek te bekijken.
			</p>
		{:else}
			<div class="w-full overflow-x-auto">
				<div class="min-w-[700px]">
					<svg
						bind:this={grafiekElement}
						viewBox="-35 0 1015 420"
						class="h-[420px] w-full"
						preserveAspectRatio="xMidYMid meet"
					>
						<text
							x="490"
							y="25"
							text-anchor="middle"
							class="fill-foreground text-[18px] font-bold"
						>
							{weergave === 'algemeen'
								? 'Verkochte drankjes per baravond'
								: 'Drankjes vergelijken'}
						</text>

						<text
							x="18"
							y="190"
							text-anchor="middle"
							transform="rotate(-90 18 190)"
							class="fill-muted-foreground text-[13px] font-medium"
						>
							Aantal verkocht
						</text>

						{#each yAs.waarden as waarde}
							{@const grafiekHoogte = 300}
							{@const grafiekTop = 60}
							{@const percentage = waarde / yAs.max}
							{@const y = grafiekTop + grafiekHoogte - percentage * grafiekHoogte}

							<line
								x1="60"
								x2="950"
								y1={y}
								y2={y}
								stroke="currentColor"
								stroke-opacity="0.1"
							/>

							<text
								x="52"
								y={y + 4}
								text-anchor="end"
								class="fill-muted-foreground text-[12px]"
							>
								{waarde}
							</text>
						{/each}

						{#if weergave === 'algemeen'}
							{#each data.baravonden as baravond, index}
								{@const x =
									data.baravonden.length === 1
										? 505
										: 60 +
											(index / (data.baravonden.length - 1)) *
												890}

								{@const y =
									360 - (baravond.totaal / yAs.max) * 300}

								{#if index > 0}
									{@const vorige = data.baravonden[index - 1]}

									{@const vorigeX =
										data.baravonden.length === 1
											? 505
											: 60 +
												((index - 1) /
													(data.baravonden.length - 1)) *
													890}

									{@const vorigeY =
										360 - (vorige.totaal / yAs.max) * 300}

									<line
										x1={vorigeX}
										y1={vorigeY}
										x2={x}
										y2={y}
										stroke="currentColor"
										stroke-width="4"
										stroke-linecap="round"
									/>
								{/if}

								<circle
									cx={x}
									cy={y}
									r="6"
									fill="currentColor"
								/>

								<text
									x={x}
									y={y - 12}
									text-anchor="middle"
									class="fill-foreground text-[13px] font-semibold"
								>
									{baravond.totaal}
								</text>

								<a
									href={`/beheer/baravonden/${baravond.id}/overzicht`}
									aria-label={`Open verkoopoverzicht van ${baravond.naam}`}
								>
									<text
										x={x}
										y="385"
										text-anchor="middle"
										class="cursor-pointer fill-foreground text-[12px] font-medium hover:underline"
									>
										{baravond.naam}
									</text>
								</a>

								<text
									x={x}
									y="402"
									text-anchor="middle"
									class="fill-muted-foreground text-[11px]"
								>
									{formatteerDatum(baravond.datum)}
								</text>
							{/each}
						{:else}
							{#each data.drankjes.filter((drankje) =>
								geselecteerdeDrankjes.includes(drankje.id)
							) as drankje}
								{@const punten = geselecteerdeData.map(
									(baravond, index) => {
										const verkoop =
											baravond.drankjes.find(
												(item) => item.id === drankje.id
											)?.aantal ?? 0;

										return {
											x:
												data.baravonden.length === 1
													? 505
													: 60 +
														(index /
															(data.baravonden.length - 1)) *
															890,
											y:
												360 -
												(verkoop / yAs.max) * 300
										};
									}
								)}

								{#each punten as punt, index}
									{#if index > 0}
										<line
											x1={punten[index - 1].x}
											y1={punten[index - 1].y}
											x2={punt.x}
											y2={punt.y}
											stroke={kleurVoorDrankje(drankje.id)}
											stroke-width="3"
											stroke-linecap="round"
										/>
									{/if}

									<circle
										cx={punt.x}
										cy={punt.y}
										r="5"
										fill={kleurVoorDrankje(drankje.id)}
									/>
								{/each}
							{/each}

							{#each data.baravonden as baravond, index}
								{@const x =
									data.baravonden.length === 1
										? 505
										: 60 +
											(index /
												(data.baravonden.length - 1)) *
												890}

								<a
									href={`/beheer/baravonden/${baravond.id}/overzicht`}
									aria-label={`Open verkoopoverzicht van ${baravond.naam}`}
								>
									<text
										x={x}
										y="385"
										text-anchor="middle"
										class="cursor-pointer fill-foreground text-[12px] font-medium hover:underline"
									>
										{baravond.naam}
									</text>
								</a>

								<text
									x={x}
									y="402"
									text-anchor="middle"
									class="fill-muted-foreground text-[11px]"
								>
									{formatteerDatum(baravond.datum)}
								</text>
							{/each}
						{/if}
					</svg>
				</div>
			</div>

			{#if weergave === 'drankjes'}
				<div class="mt-4 flex flex-wrap gap-4 text-sm">
					{#each data.drankjes.filter((drankje) =>
						geselecteerdeDrankjes.includes(drankje.id)
					) as drankje}
						<div class="flex items-center gap-2 font-medium">
							<span
								class="size-3 rounded-full"
								style={`background-color: ${kleurVoorDrankje(drankje.id)}`}
							></span>

							{drankje.naam}
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</div>

	<div class="mt-6 flex justify-end gap-2 border-t pt-4">
		<Button onclick={exporteerExcel}>
			Download Excel
		</Button>

		<Button onclick={exporteerJpg}>
			Download JPG
		</Button>
	</div>
</div>