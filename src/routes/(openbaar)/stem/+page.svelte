<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';
	import { StemSchema } from '$lib/schemas';
	import { Send } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	export let data: PageData;

	const form = superForm(data.stem_form, {
		validators: zodClient(StemSchema)
	});

	const { form: formData, enhance } = form;

	let tainted: string[] = [];
</script>

<svelte:head>
	<meta name="description" content="Stempagina voor Homeraadsleden"/>
	<meta name="robots" content="noindex,nofollow">
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center">
	<div class="flex flex-col items-center text-center">
		<h1
			class="scroll-m-20 border-b text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-32 mb-8"
		>
			Stemmen als homeraadslid
		</h1>
	</div>
	{#each data.verkiezingen as verkiezing (verkiezing.id)}
		<Card.Root>
			<Card.Header>
				<Card.Title>{verkiezing.naam}</Card.Title>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Voornaam</Table.Head>
							<Table.Head>Familienaam</Table.Head>
							<Table.Head>Ambitie</Table.Head>
							<Table.Head>Opties</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each verkiezing.kandidaten as kandidaat (kandidaat.id)}
							{#if kandidaat.status == 'zichtbaar' && !kandidaat.gestemd.includes(data.functie_id)}
								<Table.Row>
									<Table.Cell>{kandidaat.voornaam}</Table.Cell>
									<Table.Cell>{kandidaat.familienaam}</Table.Cell>
									<Table.Cell>{kandidaat.ambitie}</Table.Cell>
									<Table.Cell class="flex flex-row">
										<form
											method="POST"
											use:enhance
											action={`/api/verkiezingen/${verkiezing.id}/stem`}
											class="flex flex-row gap-2 items-center"
										>
											<div>
												<Form.Field {form} name="verkiezing_id">
													<Form.Control let:attrs>
														<Input {...attrs} type="hidden" bind:value={verkiezing.id} />
													</Form.Control>
													<Form.FieldErrors />
												</Form.Field>
												<Form.Field {form} name="kandidaat_id">
													<Form.Control let:attrs>
														<Input {...attrs} type="hidden" bind:value={kandidaat.id} />
													</Form.Control>
													<Form.FieldErrors />
												</Form.Field>
												<Form.Field {form} name="stemmer_id">
													<Form.Control let:attrs>
														<Input {...attrs} type="hidden" bind:value={data.functie_id} />
													</Form.Control>
													<Form.FieldErrors />
												</Form.Field>
												<Form.Field {form} name="optie_titel">
													<Form.Control let:attrs>
														<Select.Root
															onSelectedChange={(v) => {
																v && ($formData.optie_titel = v.value);
																tainted = [...tainted, kandidaat.id];
															}}
														>
															<Select.Trigger {...attrs}>
																<Select.Value placeholder="Selecteer een optie" />
															</Select.Trigger>
															<Select.Content>
																{#each kandidaat.opties as optie (optie.titel)}
																	<Select.Item value={optie.titel} label={optie.titel} />
																{/each}
															</Select.Content>
														</Select.Root>
														<input hidden bind:value={$formData.optie_titel} name={attrs.name} />
													</Form.Control>
													<Form.FieldErrors />
												</Form.Field>
											</div>

											{#if tainted.includes(kandidaat.id)}
												<Button type="submit"><Send class="h-4 w-4" /></Button>
											{/if}
										</form>
									</Table.Cell>
								</Table.Row>
							{/if}
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
			<Card.Footer />
		</Card.Root>
	{/each}
</div>
