<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { ProfielSchema } from '$lib/schemas';
	import {
		type Infer,
		superForm,
		type SuperValidated
	} from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { PraesidiumLedenRecord } from '../../../types/pocketbase-types';

	export let data: SuperValidated<Infer<typeof ProfielSchema>>;
	export let ingelogd_lid: PraesidiumLedenRecord | undefined;
    export let profiel_open: boolean;

	const form = superForm(data, { validators: zod(ProfielSchema), onUpdated(event) {
        profiel_open = false;
        goto('/', { invalidateAll: true });
    } });

	form.form.set({
		voornaam: ingelogd_lid?.voornaam,
		familienaam: ingelogd_lid?.familienaam,
		id: ingelogd_lid?.id,
		studierichting: ingelogd_lid?.studierichting,
		woonplaats: ingelogd_lid?.woonplaats
	});

	let avatar_url: string | null = null;

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance enctype="multipart/form-data" action="/api/profiel">
		<div class="flex flex-col items-center gap-2">
			<Avatar.Root class="h-40 w-40">
				<Avatar.Image
					class="object-cover"
					src={avatar_url ?? ingelogd_lid?.avatar}
					alt={`${ingelogd_lid?.voornaam} ${ingelogd_lid?.familienaam}`}
				/>

				<Avatar.Fallback
					>{ingelogd_lid?.voornaam?.at(0)}{ingelogd_lid?.familienaam?.at(0)}</Avatar.Fallback
				>
			</Avatar.Root>
			<Form.Field {form} name="avatar">
				<Form.Control let:attrs>
					<Input
						{...attrs}
						type="file"
						on:input={(e) => {
							$formData.avatar = e.currentTarget.files?.item(0) ?? undefined;
							avatar_url =
								$formData.avatar != undefined ? URL.createObjectURL($formData.avatar) : null;
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
		<Form.Field {form} name="voornaam">
			<Form.Control let:attrs>
				<Form.Label>Voornaam</Form.Label>
				<Input {...attrs} bind:value={$formData.voornaam} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="familienaam">
			<Form.Control let:attrs>
				<Form.Label>Familienaam</Form.Label>
				<Input {...attrs} bind:value={$formData.familienaam} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="studierichting">
			<Form.Control let:attrs>
				<Form.Label>Studierichting</Form.Label>
				<Input {...attrs} bind:value={$formData.studierichting} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="woonplaats">
			<Form.Control let:attrs>
				<Form.Label>Woonplaats</Form.Label>
				<Input {...attrs} bind:value={$formData.woonplaats} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="oud_wachtwoord">
			<Form.Control let:attrs>
				<Form.Label>Oud wachtwoord</Form.Label>
				<Input {...attrs} bind:value={$formData.oud_wachtwoord} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="nieuw_wachtwoord">
			<Form.Control let:attrs>
				<Form.Label>Nieuw wachtwoord</Form.Label>
				<Input {...attrs} bind:value={$formData.nieuw_wachtwoord} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<!-- <SuperDebug display={import.meta.env.DEV} data={$formData} /> -->
		<Form.Button>Opslaan</Form.Button>
</form>
