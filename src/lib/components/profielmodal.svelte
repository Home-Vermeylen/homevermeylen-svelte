<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { ProfielSchema } from '$lib/schemas';
	import { fileProxy, type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { PraesidiumLedenRecord } from '../../../types/pocketbase-types';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Root } from 'postcss';
	import { Button } from './ui/button';
	import { LoaderCircle } from 'lucide-svelte';
	import { page } from '$app/stores';

	interface Props {
		data: SuperValidated<Infer<typeof ProfielSchema>>;
		ingelogd_lid: PraesidiumLedenRecord | undefined;
	}

	let { data, ingelogd_lid }: Props = $props();

	const form = superForm(data, {
		validators: zod(ProfielSchema),
		onUpdated(event) {
			goto('/', { invalidateAll: true });
		}
	});

	$effect(() => {
		if ($page.state.profiel) {
			$formData.voornaam = ingelogd_lid.voornaam ?? '';
			$formData.familienaam = ingelogd_lid?.familienaam ?? '';
			$formData.studierichting = ingelogd_lid?.studierichting ?? '';
			$formData.woonplaats = ingelogd_lid?.woonplaats ?? '';
			$formData.id = ingelogd_lid?.id;
		}
	});
	form.form.set({
		voornaam: ingelogd_lid?.voornaam,
		familienaam: ingelogd_lid?.familienaam,
		id: ingelogd_lid?.id,
		studierichting: ingelogd_lid?.studierichting,
		woonplaats: ingelogd_lid?.woonplaats
	});

	let avatar = fileProxy(form, 'avatar');
	let avatar_url: string | null = $state(null);

	const { form: formData, enhance, delayed, isTainted, tainted } = form;
</script>

<Dialog.Root
	onOpenChange={(open) => {
		if (open == false) {
			history.back();
		}
	}}
	open={true}
>
	<Dialog.Content class="overflow-y-auto max-h-[90vh]">
		<Dialog.Header>
			<Dialog.Title>Profiel bewerken</Dialog.Title>
		</Dialog.Header>
		<form
			method="POST"
			use:enhance
			enctype="multipart/form-data"
			action="/api/profiel"
			class="flex flex-col"
		>
			<Avatar.Root class="h-40 w-40 self-center">
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
				<Form.Control>
					{#snippet children({ props })}
						<input
    						{...props}
    						type="file"
    						accept="image/png, image/jpeg, image/jpg"
    						bind:files={$avatar}
    						oninput={(e) => {
        						avatar_url =
            						e.currentTarget.files?.item(0) != undefined
                						? URL.createObjectURL(e.currentTarget.files?.item(0))
                						: null;
    						}}
    						class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="id">
				<Form.Control>
					{#snippet children({ props })}
						<Input {...props} type="hidden" bind:value={$formData.id} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="voornaam">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Voornaam</Form.Label>
						<Input {...props} bind:value={$formData.voornaam} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="familienaam">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Familienaam</Form.Label>
						<Input {...props} bind:value={$formData.familienaam} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="studierichting">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Studierichting</Form.Label>
						<Input {...props} bind:value={$formData.studierichting} />
					{/snippet}
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="woonplaats">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Woonplaats</Form.Label>
						<Input {...props} bind:value={$formData.woonplaats} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="oud_wachtwoord">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Oud wachtwoord</Form.Label>
						<Input {...props} bind:value={$formData.oud_wachtwoord} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="nieuw_wachtwoord">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Nieuw wachtwoord</Form.Label>
						<Input {...props} bind:value={$formData.nieuw_wachtwoord} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

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
