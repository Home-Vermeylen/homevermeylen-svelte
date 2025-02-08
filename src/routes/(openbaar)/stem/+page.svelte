<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';
	import { StemSchema } from '$lib/schemas';
	import { CircleAlert, Send } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data = $bindable() }: Props = $props();

	const form = superForm(data.stem_form, {
		validators: zodClient(StemSchema),
		onUpdated: ({form}) => {
			if (form.message) {
				form.message.type == "success" ? toast.success(form.message.text) : toast.error(form.message.text)
			}
		}
	});

	const { form: formData, enhance } = form;

	let tainted: string[] = $state([]);
</script>

<svelte:head>
	<meta name="description" content="Stempagina voor Homeraadsleden" />
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="flex flex-col min-h-[calc(100vh)] gap-2 items-center mx-5">
	<div class="flex flex-col items-center">
		<h1
			class="scroll-m-20 border-b text-2xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center pt-32 mb-8"
		>
			Stemmen als homeraadslid
		</h1>
		<Alert.Root class="w-50">
			<CircleAlert class="h-4 w-4" />
			<Alert.Title>Belangrijk</Alert.Title>
			<Alert.Description
				>Vergeet niet om op de verzend knop te klikken nadat je een stem hebt uitgebracht voor een
				kandidaat. Indien je dit vergeet zal de stem niet worden geregistreerd!</Alert.Description
			>
		</Alert.Root>
	</div>
	{#each data.verkiezingen as verkiezing (verkiezing.id)}
		<Card.Root class="w-full mx-5">
			<Card.Header>
				<Card.Title>{verkiezing.naam}</Card.Title>
			</Card.Header>
			<Card.Content>
				{#if verkiezing.kandidaten.filter(a => a.status == 'zichtbaar').length == 0}
					<h3 class="scroll-m-20 text-sm font-semibold tracking-tight">
						Momenteel zijn er nog geen stemmingen geopend
					</h3>
				{:else}
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
										<Table.Cell class="flex flex-row w-52">
											<form
												method="POST"
												use:enhance
												action={`/api/verkiezingen/${verkiezing.id}/stem`}
												class="flex flex-row gap-2 items-center"
											>
												<div>
													<Form.Field {form} name="verkiezing_id">
														<Form.Control >
															{#snippet children({ attrs })}
																														<Input {...attrs} type="hidden" bind:value={verkiezing.id} />
																																												{/snippet}
																												</Form.Control>
														<Form.FieldErrors />
													</Form.Field>
													<Form.Field {form} name="kandidaat_id">
														<Form.Control >
															{#snippet children({ attrs })}
																														<Input {...attrs} type="hidden" bind:value={kandidaat.id} />
																																												{/snippet}
																												</Form.Control>
														<Form.FieldErrors />
													</Form.Field>
													<Form.Field {form} name="stemmer_id">
														<Form.Control >
															{#snippet children({ attrs })}
																														<Input {...attrs} type="hidden" bind:value={data.functie_id} />
																																												{/snippet}
																												</Form.Control>
														<Form.FieldErrors />
													</Form.Field>
													<Form.Field {form} name="optie_titel">
														<Form.Control >
															{#snippet children({ attrs })}
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
																																												{/snippet}
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
				{/if}
			</Card.Content>
			<Card.Footer />
		</Card.Root>
	{/each}
</div>
