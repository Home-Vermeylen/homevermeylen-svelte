<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import { LoaderCircle } from 'lucide-svelte';
	import { v4 } from 'uuid';
	import { qr } from '@svelte-put/qr/svg';
	interface Props {
		verkiezing_id: string;
	}

	let { verkiezing_id }: Props = $props();

	let code = $state(undefined);
	let request_status: 'OK' | 'ERROR' | 'WACHTEN' = $state('OK');

	const genereerNieuweCode = async () => {
		if ($page.state.qr) {
			// Een nieuwe code genereren
			const uuid = v4();

			let form_data = new FormData();

			form_data.append('code', uuid);

			request_status = 'WACHTEN';
			// De code proberen opladen naar de server
			const res = await fetch(`/api/verkiezingen/${verkiezing_id}/toegangsbeheer`, {
				method: 'post',
				body: form_data
			}).then(async (r) => await r.json());

			if (res.status == 200) {
				code = uuid;
				request_status = 'OK';
			} else {
				code = undefined;
				request_status = 'ERROR';
			}
		}
	};
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
			<Dialog.Title>Stemgerechtigde toevoegen via QR-code</Dialog.Title>
		</Dialog.Header>
		{#if code}<svg
				use:qr={{
					data: `https://www.${$page.url.host}/stem/${code}`,
					logo: `http://www.${$page.url.host}/logo.png`,
					shape: 'circle'
				}}
			/>
		{/if}
		{#if request_status == 'OK'}
			<Button onclick={() => genereerNieuweCode()}>Nieuwe code</Button>
		{:else if request_status == 'WACHTEN'}
			<Button disabled>
				<LoaderCircle class="animate-spin" />
				Even geduld
			</Button>
		{:else}
			<Button variant="destructive">Fout bij genereren code</Button>
		{/if}
	</Dialog.Content>
</Dialog.Root>
