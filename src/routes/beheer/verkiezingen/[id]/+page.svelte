<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import DataTable from '$lib/components/data-table.svelte';
	import Praesidiumlidselector from '$lib/components/praesidiumlidselector.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import * as Tabs from '$lib/components/ui/tabs';
	import { ChevronLeft, ExternalLink, QrCode } from 'lucide-svelte';
	import type { PageData } from './$types';
	import QrCodeModal from './qr-code-modal.svelte';
	import { resultaten_columns } from './resultaten-columns';
	import { stemmingen_columns } from './stemmingen-columns';
	import { VerkiezingState } from './verkiezing-beheer-state.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let geselecteerde_functies: string[] = $state([]);
	let van_toegang = $state(false);

	$effect(() => {
		data.verkiezing_promise.then((verkiezing) => {
			VerkiezingState.verkiezing = verkiezing;
			geselecteerde_functies = verkiezing.stemgerechtigde_functies;
		});
	});
</script>

{#await data.verkiezing_promise}
	<div class="flex items-center space-x-4">
		<Skeleton class="size-12 rounded-full" />
		<div class="space-y-2">
			<Skeleton class="h-4 w-[250px]" />
			<Skeleton class="h-4 w-[200px]" />
		</div>
	</div>
{:then verkiezing}
	{#if $page.state.qr}
		<QrCodeModal verkiezing_id={verkiezing.id} />
	{/if}
	<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
		<div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
			<div class="flex flex-row justify-between gap-4">
				<div class="flex flex-row gap-4">
					<Button href="/beheer/verkiezingen" variant="outline" size="icon" class="h-7 w-7">
						<ChevronLeft class="h-4 w-4" />
						<span class="sr-only">Terug</span>
					</Button>
					<h1
						class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0"
					>
						{verkiezing.naam}
					</h1>
				</div>
				<Badge variant="outline" class="ml-auto sm:ml-0"
					>{verkiezing.actief ? 'Actief' : 'Inactief'}</Badge
				>
			</div>
			<div class="grid gap-4">
				<div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
					<Tabs.Root
						value={van_toegang ? 'toegang' : 'stemmingen'}
						class="max-w-[300px] md:max-w-[600px] lg:max-w-[900px] lg:w-[900px]"
					>
						<Tabs.List>
							<Tabs.Trigger value="stemmingen">Stemmingen</Tabs.Trigger>
							<Tabs.Trigger value="resultaten">Resultaten</Tabs.Trigger>
							<Tabs.Trigger value="toegang">Toegang</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="stemmingen">
							<Card.Root>
								<Card.Header>
									<Card.Title>Stemmingen</Card.Title>
									<Card.Description>
										Stemmingen worden weergeven in volgorde van toevoegen
									</Card.Description>
								</Card.Header>
								<Card.Content class="flex flex-col gap-2">
									<div class="flex flex-col md:flex-row justify-between">
										<Button
											href={`/beheer/verkiezingen/${verkiezing.id}/stemmingen`}
											class="flex items-center gap-2 self-center"
											><ExternalLink class="h-4 w-4" /> Stemmingen
										</Button>
									</div>
									<DataTable
										modelsPerPage={5}
										data={verkiezing.stemmingen}
										columns={stemmingen_columns}
									/>
								</Card.Content>
							</Card.Root>
						</Tabs.Content>
						<Tabs.Content value="resultaten">
							<Card.Root>
								<Card.Header>
									<Card.Title>Resultaten</Card.Title>
									<Card.Description>Bekijk hier de resultaten van de verkiezing</Card.Description>
								</Card.Header>
								<Card.Content class="flex flex-col gap-2">
									<DataTable
										modelsPerPage={5}
										data={verkiezing.stemmingen}
										columns={resultaten_columns}
									/>
								</Card.Content>
							</Card.Root>
						</Tabs.Content>
						<Tabs.Content value="toegang">
							<Card.Root>
								<Card.Header>
									<Card.Title>Toegang</Card.Title>
									<Card.Description>Bewerk hier wie toegang krijgt om te stemmen</Card.Description>
								</Card.Header>
								<Card.Content class="flex flex-col items-center gap-10">
									{#await data.praesidium_leden then praesidium_leden}
										<Praesidiumlidselector
											verkiezing_id={verkiezing.id}
											{praesidium_leden}
											{geselecteerde_functies}
										/>
									{/await}
									<Button
										class="flex gap-2 items-center"
										onclick={() => pushState('', { qr: true })}
									>
										<QrCode />Toevoegen via QR-Code</Button
									>
								</Card.Content>
							</Card.Root>
						</Tabs.Content>
					</Tabs.Root>
				</div>
			</div>
		</div>
	</main>
{/await}
