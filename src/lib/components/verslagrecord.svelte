<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Verslag } from '$lib/types';
	import { Edit, Trash, File } from 'lucide-svelte';
	import toast from 'svelte-french-toast';

	export let verslag: Verslag;
	export let dialog: HTMLDialogElement;
	export let geselecteerd_verslag: Verslag | null;
	let loading = false;
	const datum = new Date(verslag.created);

	const bewerk_verslag = () => {
		geselecteerd_verslag = verslag;
		dialog.showModal();
	};

	const verwijder_verslag = async () => {
		loading = true;

		const res = await fetch('/api/verslagen', {
			method: 'DELETE',
			body: JSON.stringify({ id: verslag.id })
		});

		switch (res.status) {
			case 200:
				toast.success('Verwijdering voltooid.', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
				break;
			case 403:
				toast.error('Verwijdering mislukt: geen toegang.', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
				break;
			case 500:
				toast.error('Verwijdering mislukt: serverfout.', {
					style: 'border-radius: 200px; background: #333; color: #fff;'
				});
				break;
		}

		loading = false;
	};
</script>

<tr>
	<td>
		<div class="flex flex-row gap-2">
			<button class="btn btn-square h-7 w-7" on:click={bewerk_verslag}>
				<Edit class="h-4 w-4" />
			</button>

			<button
				type="submit"
				on:click={verwijder_verslag}
				class={`btn btn-square btn-error h-7 w-7 ${loading ? 'loading-spinner loading' : ''}`}
			>
				<Trash class="h-4 w-4" />
			</button>
		</div>
	</td>
	<td>
		<div class="font-bold">{verslag.naam}</div>
	</td>
	<td>
		<a class="btn" href={verslag.bestand} target="_blank">
			<File class="h-4 w-4" />
		</a>
	</td>
	<td>
		{datum.toLocaleDateString()}
	</td>
</tr>
