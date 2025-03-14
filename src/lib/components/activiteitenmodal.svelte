<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { ActiviteitSchema } from '$lib/schemas';
	import { fileProxy, superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Input } from './ui/input';
	import { Textarea } from './ui/textarea';
	import * as Accordion from '$lib/components/ui/accordion';
	import { page } from '$app/stores';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { CalendarIcon, LoaderCircle } from 'lucide-svelte';
	import Activiteitstypebadge from './activiteitstypebadge.svelte';
	import DateInput from './forms/date_input.svelte';

	interface Props {
		data: SuperValidated<Infer<typeof ActiviteitSchema>>;
	}

	let { data }: Props = $props();

	const form = superForm(data, {
		validators: zod(ActiviteitSchema),
		async onUpdated() {
			if ($page.state.activiteit) {
				history.back();
			}
		}
	});

	let banner = fileProxy(form, 'banner');
	let banner_url: string | null = $state(null);

	const { form: formData, enhance, delayed, isTainted, tainted } = form;

	$effect(() => {
		if ($page.state.activiteit) {
			$formData.naam = $page.state.activiteit.naam ?? '';
			$formData.omschrijving = $page.state.activiteit.omschrijving ?? '';
			$formData.activiteitstype = $page.state.activiteit.activiteitstype as string;
			$formData.datum = $page.state.activiteit.datum;
			$formData.formlink = $page.state.activiteit.formlink ?? '';
			$formData.id = $page.state.activiteit.id;
			$formData.locatie = $page.state.activiteit.locatie;
		}
	});
</script>

<Dialog.Root
	onOpenChange={(open) => {
		if (open == false) {
			history.back();
		}
	}}
	open={true}
>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				{#if $page.state.activiteit != null}
					<strong>{$page.state.activiteit?.naam}</strong> bewerken
				{:else}
					Nieuwe activiteit
				{/if}
			</Dialog.Title>
		</Dialog.Header>
		<form
			method="POST"
			class="flex flex-col"
			use:enhance
			enctype="multipart/form-data"
			action="/api/activiteiten"
		>
			<Form.Field {form} name="id">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} type="hidden" bind:value={$formData.id} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="flex flex-col items-center gap-2">
				{#if banner_url || $page.state.activiteit?.banner}
					<img
						loading="lazy"
						src={banner_url ?? $page.state.activiteit?.banner}
						class="aspect-square rounded-md object-cover"
						height={100}
						width={200}
						alt="Banner"
					/>
				{/if}
				<Form.Field {form} name="banner">
					<Form.Control>
						{#snippet children({ props })}
							<input
								class={'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'}
								{...props}
								type="file"
								bind:files={$banner}
								oninput={(e) => {
									banner_url =
										e.currentTarget.files?.item(0) != undefined
											? URL.createObjectURL(e.currentTarget.files?.item(0))
											: null;
								}}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Field {form} name="naam">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Naam</Form.Label>
						<Input {...props} bind:value={$formData.naam} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Accordion.Root type="single">
				<Accordion.Item value="type&omschrijving">
					<Accordion.Trigger>Type & Omschrijving</Accordion.Trigger>
					<Accordion.Content class="m-2"
						><Form.Field {form} name="activiteitstype">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Activiteitstype</Form.Label>
									<Select.Root
										type="single"
										bind:value={$formData.activiteitstype}
										name={props.name}
									>
										<Select.Trigger {...props}>
											{$formData.activiteitstype == ''
												? 'Selecteer een activiteitstype.'
												: $formData.activiteitstype}</Select.Trigger
										>
										<Select.Content>
											<Select.Item value="BAR">
												<Activiteitstypebadge activiteitstype="BAR" />
											</Select.Item>
											<Select.Item value="CANTUS">
												<Activiteitstypebadge activiteitstype="CANTUS" />
											</Select.Item>
											<Select.Item value="CULTUUR">
												<Activiteitstypebadge activiteitstype="CULTUUR" />
											</Select.Item>
											<Select.Item value="FEEST">
												<Activiteitstypebadge activiteitstype="FEEST" />
											</Select.Item>
											<Select.Item value="SPORT">
												<Activiteitstypebadge activiteitstype="SPORT" />
											</Select.Item>
											<Select.Item value="ANDERE"
												><Activiteitstypebadge activiteitstype="ANDERE" /></Select.Item
											>
										</Select.Content>
									</Select.Root>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field {form} name="omschrijving">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Omschrijving</Form.Label>
									<Textarea
										{...props}
										placeholder="Geef wat informatie over de activiteit"
										class="resize-none"
										bind:value={$formData.omschrijving}
									/>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</Accordion.Content>
				</Accordion.Item>
				<Accordion.Item class="mb-5" value="locatie&datum&formlink"
					><Accordion.Trigger>Plaats, Datum en Locatie</Accordion.Trigger>
					<Accordion.Content class="m-5">
						<Form.Field {form} name="locatie">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Locatie</Form.Label>
									<Input {...props} bind:value={$formData.locatie} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<DateInput {form} field="datum" />
						<Form.Field {form} name="formlink">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Formlink</Form.Label>
									<Input {...props} bind:value={$formData.formlink} />
								{/snippet}
							</Form.Control>
							<Form.Description
								>Wanneer een Google Forms URL wordt toegevoegd zullen gebruikers kunnen inschrijven
								via de website</Form.Description
							>
							<Form.FieldErrors />
						</Form.Field>
					</Accordion.Content></Accordion.Item
				>
			</Accordion.Root>

			{#if $delayed}<Button disabled>
					<LoaderCircle class="animate-spin" />
					Even geduld
				</Button>
			{:else}
				<Form.Button disabled={!isTainted($tainted)} class="text-center">Opslaan</Form.Button>
			{/if}
		</form>
	</Dialog.Content>
</Dialog.Root>
