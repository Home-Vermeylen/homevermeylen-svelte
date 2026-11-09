<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { NieuweConnectieSchema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { untrack } from 'svelte';

	let {
		data,
		onclose
	}: {
		data: any;
		onclose: () => void;
	} = $props();

	const form = superForm(untrack(() => data.nieuwe_connectie_form), {
		validators: zod4Client(NieuweConnectieSchema)
	});

	const { form: formData, enhance: superformEnhance, message } = form;

	let foutmelding = $state('');

	type PersoonControle = {
		gevonden: boolean;
		persoon: {
			id: string;
			naam: string;
			club: string;
		} | null;
		suggesties: {
			id: string;
			naam: string;
			club: string;
		}[];
	};

	let persoon1_controle = $state<PersoonControle | null>(null);
	let persoon1_laden = $state(false);
	let persoon1_suggesties_genegeerd = $state(false);

	let persoon2_controle = $state<PersoonControle | null>(null);
	let persoon2_laden = $state(false);
	let persoon2_suggesties_genegeerd = $state(false);

	let zoekTimer1: ReturnType<typeof setTimeout>;
	let zoekTimer2: ReturnType<typeof setTimeout>;

	function gebruikPersoon1(persoon: PersoonControle['suggesties'][number]) {
		$formData.persoon1_naam = persoon.naam;
		$formData.persoon1_club = persoon.club;

		persoon1_suggesties_genegeerd = false;

		persoon1_controle = {
			gevonden: true,
			persoon,
			suggesties: []
		};
	}

	function maakNieuwePersoon1() {
		persoon1_suggesties_genegeerd = true;
	}

	function gebruikPersoon2(persoon: PersoonControle['suggesties'][number]) {
		$formData.persoon2_naam = persoon.naam;
		$formData.persoon2_club = persoon.club;

		persoon2_suggesties_genegeerd = false;

		persoon2_controle = {
			gevonden: true,
			persoon,
			suggesties: []
		};
	}

	function maakNieuwePersoon2() {
		persoon2_suggesties_genegeerd = true;
	}

	async function controleerPersoon1(naam: string, club: string) {
		clearTimeout(zoekTimer1);
		persoon1_suggesties_genegeerd = false;
		persoon1_controle = null;

		if (!naam.trim() || !club.trim()) return;

		zoekTimer1 = setTimeout(async () => {
			persoon1_laden = true;

			try {
				const netwerkId = data.netwerk.netwerk.id;

				const params = new URLSearchParams({
					netwerk: netwerkId,
					naam,
					club
				});

				const response = await fetch(
					`/api/vriendschapsnetwerk/persoon?${params}`
				);

				if (response.ok) {
					persoon1_controle = await response.json();
				}
			} catch (error) {
				console.error('Fout bij controleren persoon 1:', error);
			} finally {
				persoon1_laden = false;
			}
		}, 400);
	}

	async function controleerPersoon2(naam: string, club: string) {
		clearTimeout(zoekTimer2);
		persoon2_suggesties_genegeerd = false;
		persoon2_controle = null;

		if (!naam.trim() || !club.trim()) return;

		zoekTimer2 = setTimeout(async () => {
			persoon2_laden = true;

			try {
				const netwerkId = data.netwerk.netwerk.id;

				const params = new URLSearchParams({
					netwerk: netwerkId,
					naam,
					club
				});

				const response = await fetch(
					`/api/vriendschapsnetwerk/persoon?${params}`
				);

				if (response.ok) {
					persoon2_controle = await response.json();
				}
			} catch (error) {
				console.error('Fout bij controleren persoon 2:', error);
			} finally {
				persoon2_laden = false;
			}
		}, 400);
	}

	const enhance = (node: HTMLFormElement) =>
		superformEnhance(node, {
			onResult: ({ result }) => {
				if (result.type === 'success') {
					onclose();
					return;
				}

				if (result.type === 'failure') {
					const data = result.data as {
						error?: string;
					};

					foutmelding = data?.error ?? 'Er is iets misgegaan.';
				}
			}
		});
</script>

<Dialog.Root
	open={true}
	onOpenChange={(open) => {
		if (!open) {
			onclose();
		}
	}}
>
	<Dialog.Content class="max-h-[90vh] max-w-lg overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Nieuwe connectie</Dialog.Title>
			<Dialog.Description>
				Voeg een nieuwe connectie toe aan het vriendschapsnetwerk.
			</Dialog.Description>
		</Dialog.Header>

		<form method="POST" action="?/nieuwe_connectie" use:enhance class="space-y-6">
			<div class="space-y-3">
				<h3 class="font-semibold">Persoon 1</h3>

				<Form.Field {form} name="persoon1_naam">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>
								Naam <span class="text-destructive">*</span>
							</Form.Label>

							<Input
								{...props}
								autocomplete="off"
								bind:value={$formData.persoon1_naam}
								oninput={() =>
									controleerPersoon1(
										$formData.persoon1_naam,
										$formData.persoon1_club
									)}
							/>

							{#if persoon1_laden}
								<p class="text-sm text-muted-foreground">
									Naam en club controleren...
								</p>
							{:else if persoon1_controle?.suggesties.length && !persoon1_suggesties_genegeerd}
								<div class="space-y-3 rounded-md border p-3">
									<p class="text-sm font-medium text-amber-600">
										Mogelijke overeenkomsten:
									</p>

									{#each persoon1_controle.suggesties as suggestie}
										<div class="flex items-center justify-between gap-2">
											<div class="text-sm">
												<strong>{suggestie.naam}</strong>
												<span class="text-muted-foreground">
													– {suggestie.club}
												</span>
											</div>

											<Button
												type="button"
												size="sm"
												variant="outline"
												onclick={() => gebruikPersoon1(suggestie)}
											>
												Gebruiken
											</Button>
										</div>
									{/each}

									<Button
										type="button"
										size="sm"
										variant="ghost"
										onclick={maakNieuwePersoon1}
									>
										Nee, nieuwe persoon aanmaken
									</Button>
								</div>
							{:else if persoon1_suggesties_genegeerd}
								<p class="text-sm text-muted-foreground">
									Er wordt een nieuwe persoon aangemaakt.
								</p>
							{/if}
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="persoon1_club">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>
								Club <span class="text-destructive">*</span>
							</Form.Label>

							<Input
								{...props}
								autocomplete="off"
								bind:value={$formData.persoon1_club}
								oninput={() =>
									controleerPersoon1(
										$formData.persoon1_naam,
										$formData.persoon1_club
									)}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="space-y-3">
				<h3 class="font-semibold">Persoon 2</h3>

				<Form.Field {form} name="persoon2_naam">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>
								Naam <span class="text-destructive">*</span>
							</Form.Label>

							<Input
								{...props}
								autocomplete="off"
								bind:value={$formData.persoon2_naam}
								oninput={() =>
									controleerPersoon2(
										$formData.persoon2_naam,
										$formData.persoon2_club
									)}
							/>

							{#if persoon2_laden}
								<p class="text-sm text-muted-foreground">
									Naam en club controleren...
								</p>
							{:else if persoon2_controle?.suggesties.length && !persoon2_suggesties_genegeerd}
								<div class="space-y-3 rounded-md border p-3">
									<p class="text-sm font-medium text-amber-600">
										Mogelijke overeenkomsten:
									</p>

									{#each persoon2_controle.suggesties as suggestie}
										<div class="flex items-center justify-between gap-2">
											<div class="text-sm">
												<strong>{suggestie.naam}</strong>
												<span class="text-muted-foreground">
													– {suggestie.club}
												</span>
											</div>

											<Button
												type="button"
												size="sm"
												variant="outline"
												onclick={() => gebruikPersoon2(suggestie)}
											>
												Gebruiken
											</Button>
										</div>
									{/each}

									<Button
										type="button"
										size="sm"
										variant="ghost"
										onclick={maakNieuwePersoon2}
									>
										Nee, nieuwe persoon aanmaken
									</Button>
								</div>
							{:else if persoon2_suggesties_genegeerd}
								<p class="text-sm text-muted-foreground">
									Er wordt een nieuwe persoon aangemaakt.
								</p>
							{/if}
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="persoon2_club">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>
								Club <span class="text-destructive">*</span>
							</Form.Label>

							<Input
								{...props}
								autocomplete="off"
								bind:value={$formData.persoon2_club}
								oninput={() =>
									controleerPersoon2(
										$formData.persoon2_naam,
										$formData.persoon2_club
									)}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<div class="space-y-3">
				<h3 class="font-semibold">Connectie</h3>

				<Form.Field {form} name="type">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>
								Type <span class="text-destructive">*</span>
							</Form.Label>

							<select
								{...props}
								bind:value={$formData.type}
								class="w-full rounded-md border px-3 py-2"
							>
								<option value="">Kies een type</option>
								<option value="GEMUILD">Gemuild</option>
								<option value="SEKS">Seks</option>
								<option value="RELATIE">Relatie</option>
							</select>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="extra_info">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Extra info</Form.Label>
							<Textarea {...props} bind:value={$formData.extra_info} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			{#if foutmelding}
				<div
					class="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
				>
					{foutmelding}
				</div>
			{/if}

			<Dialog.Footer>
				<Button type="submit">Toevoegen</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>