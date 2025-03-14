<script lang="ts">
	import { run } from 'svelte/legacy';

	import { page } from '$app/stores';
	import * as Dialog from '$lib/components/ui/dialog';
	import { QRCode } from '@castlenine/svelte-qrcode';
	import { Plus } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import { v4 } from 'uuid';
	import { Button } from './ui/button';

	interface Props {
		modal_open?: boolean;
		verkiezing_id: any;
	}

	let { modal_open = $bindable(false), verkiezing_id }: Props = $props();

	let code: string | undefined = $state(undefined);
	
	const genereerNieuweCode = async () => {
		if (modal_open) {
			// Een nieuwe code genereren
			const uuid = v4();

			let form_data = new FormData();

			form_data.append('code', uuid);

			// De code proberen opladen naar de server
			const res = await fetch(`/api/verkiezingen/${verkiezing_id}/toegangsbeheer`, {
				method: 'post',
				body: form_data
			}).then(async (r) => await r.json());

			if (res.status == 200) {
				code = uuid;
			} else {
				code = undefined;
				alert('error!');
			}
		}
	};

	run(() => {
		modal_open ? genereerNieuweCode() : false;
	});
</script>

<Dialog.Root bind:open={modal_open}>
	<Dialog.Content class="flex flex-col">
		<Dialog.Header>
			<Dialog.Title>Stemgerechtigden toevoegen via QR-Code</Dialog.Title>
			<Dialog.Description>
				Scan deze QR-Code om toegang te krijgen tot het stemsysteem
			</Dialog.Description>
		</Dialog.Header>
		{#if code}
			{#key code}
				<div class="self-center" ondblclick={() => {navigator.clipboard.writeText(`http://www.${$page.url.host}/stem/${code}`); toast('URL gekopieërd naar klembord')}}>
					<QRCode waitForLogo data={`http://www.${$page.url.host}/stem/${code}`}/>
				</div>
			{/key}
		{/if}

		<Button
			class="self-center flex items-center gap-2"
			on:click={async () => {
				await genereerNieuweCode();
			}}> <Plus class="h-4 w-4"/>Nieuw</Button
		>
	</Dialog.Content>
</Dialog.Root>
