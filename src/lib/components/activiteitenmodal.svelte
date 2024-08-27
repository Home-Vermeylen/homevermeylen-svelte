<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { ActiviteitSchema } from '$lib/schemas';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Input } from './ui/input';
	import { Textarea } from './ui/textarea';

	export let data: SuperValidated<Infer<typeof ActiviteitSchema>>;
	export let geselecteerde_activiteit:
		| {
				id: string;
				naam: string;
				omschrijving: string;
				datum: Date;
				activiteitstype: string;
				locatie: string;
				formlink: string;
				banner: string;
		  }
		| undefined;
	export let modal_open: boolean;
	export let id: string;

	const form = superForm(data, {
		id,
		validators: zod(ActiviteitSchema),
		async onUpdated(event) {
			modal_open = false;
			geselecteerde_activiteit = undefined;
		}
	});

	let banner_url: string | null = null;

	const { form: formData, enhance } = form;

	$: {
		if (geselecteerde_activiteit) {
			$formData.naam = geselecteerde_activiteit.naam;
			$formData.omschrijving = geselecteerde_activiteit.omschrijving;
			$formData.activiteitstype = geselecteerde_activiteit.activiteitstype;
			$formData.datum = (new Date(
				geselecteerde_activiteit.datum.getTime() -
					geselecteerde_activiteit.datum.getTimezoneOffset() * 60000
			))
				.toISOString()
				.slice(0, -1);
			$formData.formlink = geselecteerde_activiteit.formlink;
			$formData.id = geselecteerde_activiteit.id;
			$formData.locatie = geselecteerde_activiteit.locatie;
		}
	}
</script>

<Dialog.Root bind:open={modal_open}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>
				{#if geselecteerde_activiteit}
					<strong>{geselecteerde_activiteit?.naam}</strong> bewerken
				{:else}
					Nieuwe activiteit
				{/if}
			</Dialog.Title>
		</Dialog.Header>
		<form method="POST" use:enhance enctype="multipart/form-data" action="/api/activiteiten">
			<div class="flex flex-col items-center gap-2">
				<img
					loading="lazy"
					src={banner_url ?? geselecteerde_activiteit?.banner}
					class="object-scale-down rounded-md border-2"
					height={200}
					width={400}
					alt="Banner"
				/>
				<Form.Field {form} name="banner">
					<Form.Control let:attrs>
						<Input
							{...attrs}
							type="file"
							on:input={(e) => {
								$formData.banner = e.currentTarget.files?.item(0) ?? undefined;
								banner_url =
									$formData.banner != undefined ? URL.createObjectURL($formData.banner) : null;
							}}
							accept="image/png, image/jpeg, image/jpg"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Form.Field {form} name="id">
				<Form.Control let:attrs>
					<Input {...attrs} type="hidden" bind:value={$formData.id} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="naam">
				<Form.Control let:attrs>
					<Form.Label>Naam</Form.Label>
					<Input {...attrs} bind:value={$formData.naam} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="activiteitstype">
				<Form.Control let:attrs>
					<Form.Label>Activiteitstype</Form.Label>
					<Select.Root
						onSelectedChange={(v) => {
							v && ($formData.activiteitstype = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Selecteer een activiteitstype" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="BAR" label="Baravond" />
							<Select.Item value="CANTUS" label="Cantus" />
							<Select.Item value="CULTUUR" label="Cultuuractiviteit" />
							<Select.Item value="FEEST" label="Fuif" />
							<Select.Item value="SPORT" label="Sportactiviteit" />
							<Select.Item value="ANDERE" label="Diverse activiteit" />
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.activiteitstype} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="omschrijving">
				<Form.Control let:attrs>
					<Form.Label>Omschrijving</Form.Label>
					<Textarea
						{...attrs}
						placeholder="Geef wat informatie over de activiteit"
						class="resize-none"
						bind:value={$formData.omschrijving}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="locatie">
				<Form.Control let:attrs>
					<Form.Label>Locatie</Form.Label>
					<Input {...attrs} bind:value={$formData.locatie} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="datum">
				<Form.Control let:attrs>
					<Form.Label>Datum</Form.Label>
					<Input {...attrs} type="datetime-local" bind:value={$formData.datum} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="formlink">
				<Form.Control let:attrs>
					<Form.Label>Formlink</Form.Label>
					<Input {...attrs} bind:value={$formData.formlink} />
				</Form.Control>
				<Form.Description>Wanneer een Google Forms URL wordt toegevoegd zullen gebruikers kunnen inschrijven via de website</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Opslaan</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
